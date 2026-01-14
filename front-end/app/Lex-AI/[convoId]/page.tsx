"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import { ContextItem } from "../components/ContextPicker";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";
import ReactMarkdown from 'react-markdown';

type ChatMessage = {
  sender: "AI" | "User";
  content: string;
  createdAt?: string;
  attachedContext?: ContextItem[]; // New field to store visual context
};

const MainChatPage = () => {

  const server_url = process.env.NEXT_PUBLIC_DEV_SERVER_URL;
  const router = useRouter();
  const params = useParams();

  const convoIdFromParams =
    typeof params.convoId === "string"
      ? params.convoId === "null"
        ? null
        : params.convoId
      : null;

  // Initialize directly to avoid double-render and sync mismatch
  const [currentConvoId, setCurrentConvoId] = useState<string | null>(convoIdFromParams);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [socketReady, setSocketReady] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [socketVersion, setSocketVersion] = useState(0);

  /* ─────────────────────────────────────────────
     SYNC URL PARAM → STATE
     ───────────────────────────────────────────── */
  useEffect(() => {
    setCurrentConvoId(convoIdFromParams);
  }, [convoIdFromParams]);

  /* ─────────────────────────────────────────────
     HELPER: PARSE CONTEXT FROM RAW MESSAGE
     ───────────────────────────────────────────── */
  const parseMessageWithContext = (msg: any): ChatMessage => {
    if (msg.sender === 'AI') {
      return { sender: 'AI', content: msg.content, createdAt: msg.createdAt };
    }
    const contextRegex = /--- Context Attached ---\n([\s\S]*?)\n--- End Context ---\n\n/g;
    const match = contextRegex.exec(msg.content);

    if (match) {
      const contextBlock = match[1];
      const realContent = msg.content.replace(match[0], '');
      const reconstructedContext: ContextItem[] = [];
      const lines = contextBlock.split('\n');
      lines.forEach(line => {
        if (line.startsWith('Context Type:')) {
          let name = 'Unknown';
          let type: 'chat' | 'file' = 'chat';
          if (line.includes('Chat History with')) {
            name = line.split('Chat History with')[1]?.trim() || 'Chat';
            type = 'chat';
          } else if (line.includes('File Metadata -')) {
            name = line.split('File Metadata -')[1]?.split('(')[0]?.trim() || 'File';
            type = 'file';
          }
          if (name) {
            reconstructedContext.push({ type, id: 'recovered-id', name: name, info: '' });
          }
        }
      });
      return {
        sender: 'User',
        content: realContent,
        createdAt: msg.createdAt,
        attachedContext: reconstructedContext.length > 0 ? reconstructedContext : undefined
      };
    }
    return { sender: 'User', content: msg.content, createdAt: msg.createdAt };
  };

  /* ─────────────────────────────────────────────
     EFFECT 1: HISTORY LOADING (Runs on Convo Change)
     ───────────────────────────────────────────── */
  useEffect(() => {
    // Reset state on convo switch
    setMessages([]);
    setCursor(null);
    setHasMore(true);
    setIsFetching(false);

    // We don't reset socketReady here, as the socket effect handles connection state

    let isMounted = true;

    const loadInitialHistory = async () => {
      if (!currentConvoId || currentConvoId == "new") return;

      setIsFetching(true);
      try {
        const res = await fetch(
          `${server_url}/api/AI/convo-history/${currentConvoId}`,
          { credentials: "include" }
        );

        if (!res.ok || !isMounted) {
          setIsFetching(false);
          return;
        }

        const data = await res.json();
        if (isMounted) {
          const parsedMessages = data.messages.map(parseMessageWithContext);
          setMessages(parsedMessages);
          setCursor(data.nextCursor);
          setHasMore(data.hasMore);
          setIsFetching(false);
        }
      } catch (error) {
        console.log("Failed to load history:", error);
        if (isMounted) setIsFetching(false);
      }
    };

    if (currentConvoId) {
      loadInitialHistory();
    }

    return () => { isMounted = false; };
  }, [currentConvoId, server_url]);

  /* ─────────────────────────────────────────────
     EFFECT 2: SOCKET CONNECTION (Runs on Convo Change + Version Update)
     ───────────────────────────────────────────── */
  useEffect(() => {
    setSocketReady(false);
    setConnectionError(null);

    let isMounted = true;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }

      const serverHost = server_url?.replace(/^https?:\/\//, '') || 'localhost:5001';
      const wsProtocol = server_url?.startsWith('https://') ? 'wss://' : 'ws://';
      const wsUrl = currentConvoId === null
        ? `${wsProtocol}${serverHost}/ws/ai-chat`
        : `${wsProtocol}${serverHost}/ws/ai-chat?convo_id=${currentConvoId}`;

      console.log('Connecting to WebSocket:', wsUrl);
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connection established');
        if (!isMounted) {
          socket.close();
          return;
        }
        setSocketReady(true);
        setConnectionError(null);
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === "ai_message") {
            setMessages((prev) => [...prev, { sender: "AI", content: payload.content }]);
            setIsProcessing(false);
          }
        } catch (error) {
          console.log('Error parsing WebSocket message:', error);
        }
      };

      socket.onerror = (error) => {
        console.log('WebSocket error:', error);
        if (isMounted) {
          setConnectionError('Connection error.');
          setSocketReady(false);
        }
      };

      socket.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        if (!isMounted) return;
        setSocketReady(false);
        // Auto-reconnect if not 1000 (Normal Closure) OR if it was closed via handleStop (we manually re-triggered version update so this might not be needed? 
        // Actually if handleStop closes it, event code is 1000 usually unless specified otherwise.
        // If we triggered version update, this effect re-runs anyway.
        // So this logic handles unexpected disconnects.
        if (isMounted && event.code !== 1000) {
          reconnectTimeout = setTimeout(() => {
            if (isMounted) connectWebSocket();
          }, 3000);
        }
      };
    };

    connectWebSocket();

    return () => {
      isMounted = false;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socketRef.current) {
        socketRef.current.close(1000, "Component unmounting or Effect re-run");
        socketRef.current = null;
      }
    };
  }, [currentConvoId, server_url, socketVersion]);

  /* ─────────────────────────────────────────────
     AUTO SCROLL
     ───────────────────────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ─────────────────────────────────────────────
     PAGINATION
     ───────────────────────────────────────────── */
  const handleScroll = async () => {
    if (
      !chatAreaRef.current ||
      isFetching ||
      !hasMore ||
      !cursor ||
      !currentConvoId ||
      chatAreaRef.current.scrollTop > 50
    )
      return;

    setIsFetching(true);

    try {
      const res = await fetch(
        `${server_url}/api/AI/convo-history/${currentConvoId}?cursor=${cursor}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        setIsFetching(false);
        return;
      }

      const data = await res.json();

      const parsedMessages = data.messages.map(parseMessageWithContext);
      setMessages((prev) => [...parsedMessages, ...prev]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
      setIsFetching(false);
    } catch (error) {
      console.log('Error loading more messages:', error);
      setIsFetching(false);
    }
  };

  /* ─────────────────────────────────────────────
     SEND MESSAGE
     ───────────────────────────────────────────── */
  /* ─────────────────────────────────────────────
     SEND MESSAGE
     ───────────────────────────────────────────── */
  const sendMessage = async (text: string, context: ContextItem[]) => {
    if (
      !text.trim() ||
      !socketRef.current ||
      !socketReady ||
      isProcessing
    )
      return;

    try {
      let finalContent = text;

      // Append context meta-data if attached
      if (context.length > 0) {
        setIsProcessing(true); // Start processing early to show UI "Thinking"

        const contextPromises = context.map(async (c) => {
          if (c.type === 'chat') {
            // Fetch real chat history
            try {
              const res = await fetch(
                `${server_url}/api/user/chat/history/${c.id}`,
                { credentials: "include" }
              );
              if (res.ok) {
                const data = await res.json();
                const messages = data.messages || []; // Assume API returns { messages: [...] }
                // Format last 10 messages
                const recentMsgs = messages.slice(0, 10).map((m: any) =>
                  `[${m.sender_id === c.id ? c.name : 'Me'}]: ${m.content}`
                ).join("\n");

                return `Context Type: Chat History with ${c.name}\n${recentMsgs}`;
              }
            } catch (e) {
              console.error("Failed to fetch chat context", e);
              return `Context Type: Chat metadata (Fetch failed) - ${c.name}`;
            }
          } else if (c.type === 'file') {
            // For now, mock file content or just pass metadata
            return `Context Type: File Metadata - ${c.name} (${c.info})`;
          }
          return "";
        });

        const contextResults = await Promise.all(contextPromises);
        const contextStr = contextResults.filter(Boolean).join("\n\n");

        // We prepend context as a "system note" equivalent for the AI to see
        finalContent = `--- Context Attached ---\n${contextStr}\n--- End Context ---\n\n${text}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "User",
          content: text,
          attachedContext: context.length > 0 ? context : undefined // Save context for display
        },
      ]);

      if (!isProcessing) setIsProcessing(true); // Ensure processing state if not set above
      socketRef.current.send(JSON.stringify({ content: finalContent }));

    } catch (error) {
      console.log('Error sending message:', error);
      setIsProcessing(false);
    }
  };

  const handleStop = () => {
    // Close socket to stop receiving chunks
    if (socketRef.current) {
      socketRef.current.close(1000, "User stopped generation");
    }
    setIsProcessing(false);

    // Trigger immediate reconnect so the input becomes ready again without waiting
    setSocketVersion(v => v + 1);
  };

  /* ─────────────────────────────────────────────
     COPY BUTTON COMPONENT
     ───────────────────────────────────────────── */
  const CopyButton = ({ text }: { text: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      if (!text) return;
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };

    return (
      <button onClick={handleCopy} title="Copy" className={styles.actionBtn}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
          {isCopied ? "check" : "content_copy"}
        </span>
      </button>
    );
  };

  const handleNewChat = () => {
    router.push("/Lex-AI/new");
  };

  return (

    <div className={styles.root}>
      {/* 
         SIDEBAR: Replaces HistoryDrawer
         Hidden on mobile by default (to be implemented), showing on desktop.
      */}
      <Sidebar
        onNewChat={handleNewChat}
        className={styles.sidebar} // Need to ensure it's hidden on mobile if needed, or add responsiveness
      />

      <main className={styles.main}>
        <section className={styles.chatInterface}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              {/* Mobile Menu Button - TODO: Implement basic state to toggle sidebar on mobile */}
              {/* For now keeping back button */}
              <button
                className={styles.iconButton}
                onClick={() => router.back()}
                suppressHydrationWarning
                title="Back to Dashboard"
              >
                <span className="material-symbols-outlined">first_page</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 className={styles.title}>Lexpal AI</h1>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Legal Assistant
              </span>
            </div>

            {/* Spacer for centering */}
            <div style={{ width: 36 }}></div>
          </div>

          <div
            className={styles.chatArea}
            ref={chatAreaRef}
            onScroll={handleScroll}
          >
            <div className={styles.messageWrapper}>
              {connectionError && (
                <div className={styles.errorMessage}>
                  {connectionError}
                </div>
              )}

              {hasMore && isFetching && (
                <div className={styles.loading}>Loading older messages…</div>
              )}

              {messages.length === 0 && !isFetching && (
                <div className={styles.aiMessage} style={{ alignSelf: 'center', textAlign: 'center', background: 'transparent', color: 'var(--text-secondary)', boxShadow: 'none' }}>
                  <div style={{ marginBottom: 16 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.2 }}>auto_awesome</span>
                  </div>
                  <p>Hello! I am Lexpal AI.</p>
                  <p style={{ fontSize: '0.9em', opacity: 0.8 }}>Select context or start typing to begin.</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.sender === "User"
                      ? styles.userMessage
                      : styles.aiMessage
                  }
                >
                  {/* Logic for showing attached context if present */}
                  {msg.attachedContext && msg.attachedContext.length > 0 && (
                    <div className={styles.attachedContextDisplay}>
                      {msg.attachedContext.map((c, idx) => (
                        <div key={idx} className={styles.contextChipStatic}>
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                            {c.type === 'chat' ? 'chat_bubble' : 'description'}
                          </span>
                          <span>{c.type === 'chat' ? 'Chat' : 'File'}: {c.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.sender === "AI" ? (
                    <div className={styles.markdownContent}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                      <div className={styles.msgActions}>
                        <CopyButton text={msg.content} />
                        {/* Regenerate logic would go here if we tracked last prompt */}
                      </div>
                    </div>
                  ) : (
                    /* Simple render for user message */
                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                  )}
                </div>
              ))}

              {isProcessing && (
                <div className={styles.aiMessage}>
                  <TextShimmer
                    className="text-sm opacity-70"
                    duration={1}
                  >
                    Thinking…
                  </TextShimmer>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          <div className={styles.inputArea}>
            <ChatInput
              onSendMessage={sendMessage}
              onStop={handleStop}
              isProcessing={isProcessing}
              disabled={!socketReady && !isProcessing}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainChatPage;