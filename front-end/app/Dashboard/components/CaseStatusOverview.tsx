import React from "react";
import styles from "./CaseStatusOverview.module.css";

interface CaseSummary {
    id: string;
    title: string;
    type: string;
    status: "Active" | "Pending" | "Closed";
    progress: number;
}

const MOCK_CASES: CaseSummary[] = [
    {
        id: "402-22",
        title: "Case #402-22",
        type: "Civil Litigation",
        status: "Active",
        progress: 65,
    },
    {
        id: "105-23",
        title: "Case #105-23",
        type: "Property Dispute",
        status: "Pending",
        progress: 15,
    },
    {
        id: "309-21",
        title: "Case #309-21",
        type: "Family Law",
        status: "Closed",
        progress: 100,
    },
];

const getStatusStyle = (status: string) => {
    switch (status) {
        case "Active": return styles.statusActive;
        case "Pending": return styles.statusPending;
        case "Closed": return styles.statusClosed;
        default: return "";
    }
};

const getProgressColor = (status: string) => {
    switch (status) {
        case "Active": return "#007aff";
        case "Pending": return "#ff9500";
        case "Closed": return "#34c759";
        default: return "#007aff";
    }
};

export default function CaseStatusOverview() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3 className={styles.title}>All Cases</h3>
            </header>

            <div className={styles.list}>
                {MOCK_CASES.map((item) => (
                    <div key={item.id} className={styles.caseItem}>
                        <div className={styles.itemHeader}>
                            <div>
                                <span className={styles.caseTitle}>{item.title}</span>
                                <span className={styles.caseType}>{item.type}</span>
                            </div>
                            <span className={`${styles.statusBadge} ${getStatusStyle(item.status)}`}>
                                {item.status}
                            </span>
                        </div>

                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${item.progress}%`, backgroundColor: getProgressColor(item.status) }}
                            />
                        </div>

                        <div className={styles.progressInfo}>
                            <span>Progress</span>
                            <span>{item.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
