import styles from "../styles/Hashtag.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function Hashtag() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <FontAwesomeIcon
            icon={faXTwitter}
            onClick={() => {}}
            className={styles.logo}
            style={{ color: "white" }}
          />
          ;
        </div>
        <div className={styles.centerContainer}>
          <h3 className={styles.title}>Home</h3>

          <div className={styles.fieldData}></div>
          <div className={styles.tweetsContainer}></div>
        </div>
        <div className={styles.rightContainer}>
          <h3 className={styles.white}>Trends</h3>
          <div className={styles.center}>
            <div className={styles.HashtagsContainer}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hashtag;
