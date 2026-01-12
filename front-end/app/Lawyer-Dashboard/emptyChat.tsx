import styles from "./emptyChat.module.css";

export default function EmptyChatState() {
  return (
    <div className={styles.wrapper}>
      {/* Divider */}
      <div className={styles.dividerWrapper}>
        <div className={styles.divider} />
      </div>

      {/* Content */}
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <span
              className={`material-symbols-outlined ${styles.icon}`}
              style={{
                fontVariationSettings:
                  "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
              }}
            >
              question_answer
            </span>
          </div>

          <p className={styles.text}>
            No conversations yet. Your recent chats will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}