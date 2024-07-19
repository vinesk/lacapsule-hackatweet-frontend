import styles from "../styles/Trends.module.css";

export default function Trends() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.trendContainer}>
        <span className={styles.trendName}>#trendName</span>
        <span className={styles.trendCount}>2 Tweets</span>
      </div>
      <div className={styles.trendContainer}>
        <span className={styles.trendName}>#trendName</span>
        <span className={styles.trendCount}>2 Tweets</span>
      </div>
      <div className={styles.trendContainer}>
        <span className={styles.trendName}>#trendName</span>
        <span className={styles.trendCount}>2 Tweets</span>
      </div>
    </div>
  );
}
