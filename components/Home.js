import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter} from '@fortawesome/free-brands-svg-icons';
import {useState} from 'react';
import Tweet from './Tweet';
import { addTweetsToStorage,updateLikeTweet } from '../reducers/tweets';
function Home() {
  const[fieldTweet,setFieldTweet]=useState("What's up?")
  const[isLiked,setIsliked]=useState(false)
  const tweets=useSelector((state)=>state.tweets.value)
  const dispatch=useDispatch();


  function handleTweetBtn(){

    let hashtags=fieldTweet.match(/#\w*/ig)
    console.log(hashtags)
    let likes=[];
    let newTweet={
      user:'Jules',
      message:fieldTweet,
      likes:likes,
      date:new Date(),
      hashtags:hashtags,
    }
    dispatch(addTweetsToStorage(newTweet))
    setFieldTweet('')
  }

  function updateLike(props){
    dispatch(updateLikeTweet(props));
    setIsliked(!isLiked);
  }
  
  const Hashtags=[<div className={styles.white}>#hashtag</div>]
  const listTweets=tweets.map((tweet)=> {return <Tweet {...tweet} updateLike={updateLike} isLiked={isLiked}/> ;})
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <FontAwesomeIcon icon={faXTwitter} onClick={() => {}} className={styles.logo} style={{'color':'white'}}/>;
        </div>
        <div className={styles.centerContainer}>
          <h3 className={styles.title}>Home</h3>
          <textarea className={styles.textarea}  rows="2" cols="1" placeholder="What's up?" value={fieldTweet} onChange={(e)=>setFieldTweet(e.target.value)}/>
          <div className={styles.fieldData}>
            <p className={styles.white}>{fieldTweet.length}<spna>/280</spna></p>
            <button  className={styles.tweetBtn} onClick={()=>handleTweetBtn()}>Tweet</button>
          </div>
          <div className={styles.tweetsContainer}> 
            {listTweets}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h3 className={styles.white}>Trends</h3>
          <div className={styles.center}>
            <div className={styles.HashtagsContainer}>
              {Hashtags}
              <p className={styles.grey}>{Hashtags.length} <span>Tweet{Hashtags.length>1&& 's'}</span></p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
