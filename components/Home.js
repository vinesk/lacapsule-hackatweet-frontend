import styles from '../styles/Home.module.css';
import Tweet from './Tweet';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter} from '@fortawesome/free-brands-svg-icons';

import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTweetsToStorage,updateLikeTweet,deleteTweetToStorage} from '../reducers/tweets';
import { addHashtagsToStorage,updateHashtagsToStorage} from '../reducers/hashtags';


function Home() {
  const[fieldTweet,setFieldTweet]=useState("What's up?")
  //const[hashtags,setHashtags]=useState([])

  const hashtags=useSelector((state)=>state.hashtags.value)
  const tweets=useSelector((state)=>state.tweets.value)
  const dispatch=useDispatch();


  function handleTweetBtn(){

    let match=fieldTweet.match(/#\w*/ig)
    let newHashtag=[...new Set(match)]
    console.log(hashtags)
    let likes=[];
    let newTweet={
      _id:0,
      user:'Jules',
      message:fieldTweet,
      likes:likes,
      date:Date(),
      hashtags:newHashtag,
    }
    console.log('date',newTweet.date)
    dispatch(addTweetsToStorage(newTweet))
    if(newHashtag ){
      //setHashtags([...hashtags,...newHashtag])
      updateHashtagsToStorage([...hashtags,...newHashtag])
    }
    setFieldTweet('')
  }

  function updateLike(props){
    dispatch(updateLikeTweet(props));
  }

  function deleteTweet(props){
    dispatch(deleteTweetToStorage(props));
  }
  
  const listHashtags=[...new Set(hashtags)].map((h)=>{
    const nbH=hashtags.filter(x=> x==h).length;
    return <div>
      <Link href="/hashtag" className={styles.hashtagsLink}><span>{h}</span></Link>
      <div className={styles.grey}>{nbH } Tweet{nbH>1&& 's'}</div>
    </div>
    
  })
  const listTweets=tweets.map((tweet)=> {return <Tweet {...tweet} updateLike={updateLike} deleteTweet={deleteTweet}/> ;})
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <FontAwesomeIcon icon={faXTwitter} onClick={() => {}} className={styles.logo} style={{'color':'white'}}/>;
        </div>
        <div className={styles.centerContainer}>
          <h3 className={styles.title}>Home</h3>
          <div className={styles.center}>
            <textarea className={styles.textarea}  rows="4" cols="1" placeholder="What's up?" maxLength={280} value={fieldTweet} onChange={(e)=>setFieldTweet(e.target.value)}/>
          </div>
          <div className={styles.fieldData}>
            <p className={styles.white}>{fieldTweet.length}/280</p>
            <button  className={styles.tweetBtn} onClick={()=>handleTweetBtn()}>Tweet</button>
          </div>
          <div className={styles.tweetsContainer}> 
            {listTweets}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h3 className={styles.title}>Trends</h3>
          <div className={styles.center}>
            <div className={styles.HashtagsContainer}>
              {listHashtags}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
