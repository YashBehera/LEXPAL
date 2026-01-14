"use client";

import { useState, useEffect } from "react";
import styles from "./ContextPicker.module.css";
import { fetchChatList, ChatListItem } from "../../Dashboard/components/chatList.api";

export type ContextItem = {
    id: string;
    type: "chat" | "file";
    name: string;
    info?: string; // date or size
};

interface ContextPickerProps {
    onSelect: (item: ContextItem) => void;
    onClose: () => void;
}

// Mock Files Data
const MOCK_FILES: ContextItem[] = [
    { id: "f1", type: "file", name: "NDA_Template_v2.docx", info: "24 KB" },
    { id: "f2", type: "file", name: "Smith_vs_Jones_Brief.pdf", info: "1.2 MB" },
    { id: "f3", type: "file", name: "Corporate_Bylaws_2024.pdf", info: "450 KB" },
    { id: "f4", type: "file", name: "Employment_Agreement.docx", info: "32 KB" },
    { id: "f5", type: "file", name: "M&A_Strategy_Deck.pptx", info: "5.4 MB" },
];

export default function ContextPicker({ onSelect, onClose }: ContextPickerProps) {
    const [activeTab, setActiveTab] = useState<"chats" | "files">("chats");
    const [chats, setChats] = useState<ContextItem[]>([]);
    const [loadingChats, setLoadingChats] = useState(false);

    useEffect(() => {
        if (activeTab === "chats" && chats.length === 0) {
            setLoadingChats(true);
            fetchChatList()
                .then((data) => {
                    const formatted: ContextItem[] = data.map((c) => ({
                        id: c.userId,
                        type: "chat",
                        name: `${c.first_name} ${c.last_name}`,
                        info: new Date(c.lastMessageAt).toLocaleDateString(),
                    }));
                    setChats(formatted);
                })
                .catch((err) => console.error(err))
                .finally(() => setLoadingChats(false));
        }
    }, [activeTab]);

    const items = activeTab === "chats" ? chats : MOCK_FILES;

    return (
        <div className={styles.popover}>
            <div className={styles.header}>
                <span className={styles.title}>Attach Context</span>
                <button className={styles.closeBtn} onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'chats' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('chats')}
                >
                    Chats
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'files' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('files')}
                >
                    Files
                </button>
            </div>

            <div className={styles.list}>
                {loadingChats && activeTab === 'chats' && (
                    <div className={styles.loading}>Loading chats...</div>
                )}

                {!loadingChats && items.map((item) => (
                    <button
                        key={item.id}
                        className={styles.item}
                        onClick={() => onSelect(item)}
                    >
                        <div className={styles.iconWrap}>
                            <span className="material-symbols-outlined">
                                {item.type === 'chat' ? 'chat' : 'description'}
                            </span>
                        </div>
                        <div className={styles.itemMeta}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemInfo}>{item.info}</span>
                        </div>
                        <span className="material-symbols-outlined addIcon">add_circle</span>
                    </button>
                ))}

                {activeTab === 'files' && (
                    <div className={styles.uploadArea}>
                        <span className="material-symbols-outlined">upload_file</span>
                        <span>Upload new file</span>
                    </div>
                )}
            </div>
        </div>
    );
}
