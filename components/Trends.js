import styles from "../styles/Trends.module.css";
import Link from "next/link";

export default function Trends(props) {
  return (
    <div >
      <div className={styles.trendContainer}>
        <Link href="/hashtag"><span  className={styles.trendName}>{props.trendName}</span></Link>
        <span className={styles.trendCount}>{props.trendCount } Tweet{props.trendCount>1&& 's'}</span>
      </div>
    </div>
  );
}
