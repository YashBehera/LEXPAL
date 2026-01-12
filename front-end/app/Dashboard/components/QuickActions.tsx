import Link from "next/link";
import styles from "./QuickActions.module.css";

export default function QuickActions() {
    const actions = [
        {
            icon: "gavel", // Material Symbol
            label: "Find a Lawyer",
            href: "/Find-Lawyer",
            color: "#007AFF", // Blue
        },
        {
            icon: "description",
            label: "Review Doc",
            href: "/Doc-Review",
            color: "#FF9500", // Orange
        },
        {
            icon: "history_edu",
            label: "My Cases",
            href: "/my-cases",
            color: "#34C759", // Green
        },
        {
            icon: "settings",
            label: "Settings",
            href: "/settings",
            color: "#8E8E93", // Gray
        },
    ];

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Quick Actions</h3>
            <div className={styles.grid}>
                {actions.map((action, index) => (
                    <Link href={action.href} key={index} className={styles.actionBtn}>
                        <div
                            className={styles.iconCircle}
                            style={{ backgroundColor: `${action.color}15`, color: action.color }}
                        >
                            <span className="material-symbols-outlined">{action.icon}</span>
                        </div>
                        <span className={styles.label}>{action.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
