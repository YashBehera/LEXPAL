"use client";

import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useRouter, useParams } from "next/navigation";

interface Conversation {
    _id: string;
    title: string | null;
    description: string;
    timestamp: Date;
}

interface SidebarProps {
    onNewChat: () => void;
    className?: string;
}

export default function Sidebar({ onNewChat, className }: SidebarProps) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const router = useRouter();
    const params = useParams();
    const currentConvoId = params?.convoId as string;

    const server_url = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

    const fetchRecentConvos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${server_url}/api/AI/recent-conversation`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) return;

            const data = await res.json();
            setConversations(data.conversations);
        } catch (err) {
            console.error("Failed to fetch conversations", err);
        } finally {
            setLoading(false);
        }
    };

    const requestDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDeletingId(id);
    };

    const cancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeletingId(null);
    };

    const confirmDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDeletingId(null);

        // Optimistic UI update
        setConversations(prev => prev.filter(c => c._id !== id));

        try {
            await fetch(`${server_url}/api/AI/conversation/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            // If deleted current chat, redirect to new
            if (currentConvoId === id) {
                router.push("/Lex-AI/new");
            }
        } catch (err) {
            console.error("Failed to delete", err);
            // Re-fetch if failed?
            fetchRecentConvos();
        }
    };

    const deleteConversation = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Delete this chat?")) return;

        // Optimistic UI update
        setConversations(prev => prev.filter(c => c._id !== id));

        try {
            await fetch(`${server_url}/api/AI/conversation/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            // If deleted current chat, redirect to new
            if (currentConvoId === id) {
                router.push("/Lex-AI/new");
            }
        } catch (err) {
            console.error("Failed to delete", err);
            // Re-fetch if failed?
            fetchRecentConvos();
        }
    };

    useEffect(() => {
        fetchRecentConvos();
    }, []);

    return (
        <aside className={`${styles.sidebar} ${className || ''}`}>
            <div className={styles.header}>
                <button className={styles.newChatBtn} onClick={onNewChat} aria-label="New Chat">
                    <span className={styles.newChatContent}>
                        <img src="/lexpal-logo-small.png" alt="" className={styles.logoIcon} style={{ display: 'none' }} /* placeholder */ />
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                        <span>New Chat</span>
                    </span>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, opacity: 0.5 }}>edit_square</span>
                </button>
            </div>

            <div className={styles.list}>
                <div className={styles.dateGroup}>Recent</div>

                {loading && (
                    <div className={styles.loading}>
                        <span className={styles.spinner}></span>
                    </div>
                )}

                {!loading && conversations.length === 0 && (
                    <div className={styles.emptyState}>
                        <span className="material-symbols-outlined">chat_bubble_outline</span>
                        <p>No chat history</p>
                    </div>
                )}

                <div className={styles.scrollArea}>
                    {conversations.map((convo) => {
                        const isActive = currentConvoId === convo._id;
                        const isDeleting = deletingId === convo._id;

                        return (
                            <div key={convo._id} className={styles.itemWrapper}>
                                <button
                                    className={`${styles.item} ${isActive ? styles.active : ""}`}
                                    onClick={() => router.push(`/Lex-AI/${convo._id}`)}
                                >
                                    <div className={styles.itemTitle}>
                                        {isDeleting ? "Delete this chat?" : (convo.title || "Untitled Chat")}
                                    </div>
                                </button>

                                {isDeleting ? (
                                    <div className={styles.confirmActions}>
                                        <button
                                            className={styles.confirmBtn}
                                            onClick={(e) => confirmDelete(e, convo._id)}
                                            title="Confirm Delete"
                                        >
                                            <span className="material-symbols-outlined">check</span>
                                        </button>
                                        <button
                                            className={styles.cancelBtn}
                                            onClick={cancelDelete}
                                            title="Cancel"
                                        >
                                            <span className="material-symbols-outlined">close</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={(e) => requestDelete(e, convo._id)}
                                        title="Delete Chat"
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.footer}>
                <button className={styles.userProfileBtn}>
                    <div className={styles.avatarPlaceholder}>U</div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>User Account</span>
                        <span className={styles.userPlan}>Pro Plan</span>
                    </div>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, opacity: 0.5 }}>more_horiz</span>
                </button>
            </div>
        </aside>
    );
}
