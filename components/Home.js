import Link from "next/link";
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTweetsToStorage,
  updateTweetsToStorage,
  updateLikeTweet,
  deleteTweetToStorage,
} from "../reducers/tweets";
import {updateHashtagsToStorage,addHashtagsToStorage} from "../reducers/hashtags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Tweet from "./Tweet";
import styles from "../styles/Home.module.css";
import Trends from "./Trends";


function Home() {
  const[fieldTweet,setFieldTweet]=useState("What's up?")
  const user=useSelector((state)=>state.user.value)
  const hashtags=useSelector((state)=>state.hashtags.value)
  const tweets=useSelector((state)=> state.tweets.value)
  const dispatch=useDispatch();
  

  useEffect(()=>{

    fetch('http://localhost:3000/tweets/')
    .then(response => response.json())
    .then((data)=>{
      if(data.data){
        console.log('displayTweetInBDD',data.data)
        const dataTweets=data.data.map((tweet)=> {return {
          id:tweet.id,
          user:tweet.username,
          message:tweet.message,
          date:tweet.date,
          likes:tweet.likes,
          hashtags:tweet.hashtags
        }})
        console.log('send',dataTweets)
        dispatch(updateTweetsToStorage(dataTweets))
      }
    })

  },[])

  useEffect(()=>{
    fetch('http://localhost:3000/trends/allTrends')
    .then(response => response.json())
    .then((data)=>{
      if(data.result){
        console.log('displayTrenInBDD')
        const dataHashtag=data.trends.map(trend=> {return trend.hashtag})
        dispatch(updateHashtagsToStorage(dataHashtag))
      }
    })
  },[])

  function handleTweetBtn(){
    if(user.token){

      const match=fieldTweet.match(/#\w+/ig)
      const newHashtag=[...new Set(match)]

      fetch('http://localhost:3000/tweets/add',
        {method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token:user.token,
            message: fieldTweet,
            hashtags: newHashtag,
          }),
        }
      ).then(response => response.json())
      .then(data => {
        dispatch(addTweetsToStorage({
          id:data.id._id,
          user:user.username,
          message:fieldTweet,
          date:data.id.date,
          likes:[],
          hashtags:data.id.hashtags
        }))
        if(newHashtag ){
          newHashtag.forEach((e)=> addTrend(e,data.id._id))
          dispatch(updateHashtagsToStorage([...hashtags,...newHashtag]))
          console.log('hashtag :',hashtags)
        }
      });
    }
    setFieldTweet("");
  };

  const addTrend = (hashtag,idTweet) => {
    fetch('http://localhost:3000/trends/addTrend',
      {method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hashtag,idTweet
        }),
      }
    ).then(response => response.json())
    .then(data => {
      if(data.result) console.log('new trend add')
    })
  }


  const updateLike = (props) => {
    console.log('like btn')
    if(user.token){
      fetch('http://localhost:3000/tweets/like',
        {method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token:user.token,
            id: props.id,
          }),
        }
      ).then(response => response.json())
      .then(data => {
        if(data.result){
          console.log('like added',data.result)
          dispatch(updateLikeTweet({
            tweet:{
              id:props.id,
              user:props.user,
              message:props.message,
              date:props.date,
              likes:data.likes,
              hashtags:props.hashtags
            },
            username:user.username
          }))
        }
      })
    }
  }

  function deleteTweet(props){
    if(props.user==user.username){
      fetch(`http://localhost:3000/tweets/${props.id}`,{
          method: 'DELETE'
      }).then(response => response.json())
      .then(()=>{
        dispatch(deleteTweetToStorage({
            id:props.id,
            user:props.user,
            message:props.message,
            date:props.date,
            likes:props.likes,
            hashtags:props.hashtags
          }));
      })
    }
  }
  
  const trends=[...new Set(hashtags)].map((hashtag,i)=>{
    const trendCount=hashtags.filter(e=> e==hashtag).length;
    return <Trends key={i} trendCount={trendCount} trendName={hashtag} />
  })

  const listTweets=tweets.map((tweet,i)=> {return <Tweet key={i} {...tweet} updateLike={updateLike} deleteTweet={deleteTweet}/> ;}).reverse();
  return (
    <div>
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
                  onClick={handleTweetBtn}
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
          <div className={styles.tweetsContainer}>
            {listTweets}
          </div>
        </div>

        <div className={styles.trendsContainer}>
          <h3 className={styles.title}>Trends</h3>
          <div className={styles.trendsContainer}>
            {trends}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;