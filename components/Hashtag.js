import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Tweet from "./Tweet";
import Link from "next/link";
import styles from "../styles/Hashtag.module.css";
import Trends from "./Trends";

export default function Hashtag() {
  const user = useSelector((state) => state.user.value);
  const hashtags = useSelector((state) => state.hashtags.value);
  const tweets = useSelector((state) => state.tweets.value);
  const dispatch = useDispatch();

  const trends=[...new Set(hashtags)].map((hashtag,i)=>{
    const trendCount=hashtags.filter(e=> e==hashtag).length;
    return <Trends key={i} trendCount={trendCount} trendName={hashtag} />
  })
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <Link href="/home">
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
          <div className={styles.formContainer}>
            <h3 className={styles.title}>Hashtag</h3>
            <div className={styles.form}>
              <input
                className={styles.input}
                type="text"
                name="hashtag"
                id="hashtag"
              />
            </div>
          </div>
          <div className={styles.tweetsContainer}>

          </div>
        </div>

        <div className={styles.rightContainer}>
          <h3 className={styles.title}>Trends</h3>
          {trends}
        </div>
      </div>
    </div>
  );
}
