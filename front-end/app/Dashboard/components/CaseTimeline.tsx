import React from "react";
import styles from "./CaseTimeline.module.css";

interface TimelineStep {
    id: number;
    title: string;
    date?: string;
    description?: string;
    status: "completed" | "current" | "upcoming";
}

interface CaseTimelineProps {
    caseTitle?: string;
    steps?: TimelineStep[];
}

const MOCK_STEPS: TimelineStep[] = [
    {
        id: 1,
        title: "Case Initialized",
        date: "Oct 24, 2024",
        description: "Your case has been successfully registered in our system.",
        status: "completed",
    },
    {
        id: 2,
        title: "Documents Verified",
        date: "Oct 26, 2024",
        description: "All submitted documents have been reviewed and approved.",
        status: "completed",
    },
    {
        id: 3,
        title: "Lawyer Assigned",
        date: "Oct 28, 2024",
        description: "Advocate Sarah Jenkins has been assigned to your case.",
        status: "completed",
    },
    {
        id: 4,
        title: "Court Filing",
        date: "Today",
        description: "Preparing final petition for court submission.",
        status: "current",
    },
    {
        id: 5,
        title: "Hearing Scheduled",
        description: "Waiting for court validation to assign a hearing date.",
        status: "upcoming",
    },
    {
        id: 6,
        title: "Final Verdict",
        status: "upcoming",
    },
];

const CheckIcon = () => (
    <svg className={styles.checkIcon} viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
);

export default function CaseTimeline({ caseTitle = "Case #402-22", steps = MOCK_STEPS }: CaseTimelineProps) {
    return (
        <div className={styles.timelineContainer}>
            <header className={styles.header}>
                <h3 className={styles.title}>{caseTitle}</h3>
                <span className={styles.badge}>In Progress</span>
            </header>

            <div className={styles.timelineContent}>
                {steps.map((step) => (
                    <div key={step.id} className={`${styles.step} ${styles[step.status]}`}>
                        <div className={styles.iconWrapper}>
                            {step.status === "completed" && <CheckIcon />}
                            {step.status === "current" && <div className={styles.currentDot} />}
                            {/* Upcoming has empty circle or gray dot, handled by CSS borders */}
                        </div>
                        <div className={styles.stepContent}>
                            <div className={styles.stepTitle}>{step.title}</div>
                            {step.date && <div className={styles.stepDate}>{step.date}</div>}
                            {step.description && <div className={styles.stepDescription}>{step.description}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
