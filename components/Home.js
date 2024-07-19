import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Home() {
  const user = useSelector((state) => state.user.value);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Link href="/">
          <FontAwesomeIcon icon={faXTwitter} className={styles.logo} />
        </Link>
        <div className={styles.userContainer}>
          <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
          <div className={styles.userInfos}>
            <p className={styles.userFirstname}>{user.firstname}</p>
            <p className={styles.userUsername}>@{user.username}</p>
          </div>
        </div>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.middleTop}>
          <h1 className={styles.title}>Home</h1>
        </div>
        <div className={styles.middleMiddle}>Middle</div>
        <div className={styles.middleBottom}>Bottom</div>
      </div>
      <div className={styles.rightContainer}>Right</div>
    </div>
  );
}

export default Home;
