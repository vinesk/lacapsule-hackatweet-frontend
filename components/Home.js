import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTweetsToStorage,
  updateLikeTweet,
  deleteTweetToStorage,
} from "../reducers/tweets";
import {
  addHashtagsToStorage,
  updateHashtagsToStorage,
} from "../reducers/hashtags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Tweet from "./Tweet";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const user = useSelector((state) => state.user.value);
  const hashtags = useSelector((state) => state.hashtags.value);
  const tweets = useSelector((state) => state.tweets.value);
  const dispatch = useDispatch();

  const [fieldTweet, setFieldTweet] = useState("");

  const handleTweetBtn = () => {
    const match = fieldTweet.match(/#\w*/gi);
    const newHashtag = [...new Set(match)];
    // console.log(hashtags);
    const likes = [];
    const newTweet = {
      _id: 0,
      user: "Jules",
      message: fieldTweet,
      likes: likes,
      date: Date(),
      hashtags: newHashtag,
    };
    dispatch(addTweetsToStorage(newTweet));
    if (newHashtag) {
      updateHashtagsToStorage([...hashtags, ...newHashtag]);
    }
    setFieldTweet("");
  };

  const updateLike = (props) => {
    dispatch(updateLikeTweet(props));
  };

  const deleteTweet = (props) => {
    dispatch(deleteTweetToStorage(props));
  };

  const listHashtags = [...new Set(hashtags)].map((h) => {
    const nbH = hashtags.filter((x) => x === h).length;
    return (
      <div>
        <Link href="/hashtag" className={styles.hashtagsLink}>
          <span>{h}</span>
        </Link>
        <div className={styles.grey}>
          {nbH} Tweet{nbH > 1 && "s"}
        </div>
      </div>
    );
  });

  const listTweets = tweets.map((tweet) => (
    <Tweet {...tweet} updateLike={updateLike} deleteTweet={deleteTweet} />
  ));

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <Link href="/login">
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
            <h3 className={styles.title}>Home</h3>
            <div className={styles.form}>
              <textarea
                placeholder="What's up?"
                maxLength={280}
                value={fieldTweet}
                onChange={(e) => setFieldTweet(e.target.value)}
              />
              <div className={styles.formSubmit}>
                <span className={styles.textareaLength}>
                  {fieldTweet.length}/280
                </span>
                <button
                  className={`btnSecondary ${styles.submitBtn}`}
                  onClick={() => handleTweetBtn()}
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
          {/* <div className={styles.tweetsContainer}>{listTweets}</div> */}
        </div>

        <div className={styles.rightContainer}>
          <h3 className={styles.title}>Trends</h3>
          <div className={styles.HashtagsContainer}>{listHashtags}</div>
        </div>
      </div>
    </div>
  );
}
