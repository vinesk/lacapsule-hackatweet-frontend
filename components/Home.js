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
  //const[tweets,setTweets]=useState([])
  //const[hashtags,setHashtags]=useState([])

  const hashtags=useSelector((state)=>state.hashtags.value)
  const tweets=useSelector((state)=> state.tweets.value)
  const dispatch=useDispatch();
  
  const user={
    isConnected:'SAPL5I-YBSrJY2ceLNy1IvMod9xBdUFF',
    firstname:'Jules',
    username:'Jules',
    password: '$2b$10$60XKLTJ2w9IJrHh9xK9/TuyptjPKGQBvh2Wj4DeN5tGMU1x2PDulS',
  }

  //useEffect()

  function handleTweetBtn(){
    
    if(user.isConnected){
      let match=fieldTweet.match(/#\w*/ig)
      let newHashtag=[...new Set(match)]
      console.log(hashtags)
      //let likes=[];
      // let newTweet={
      //   _id:0,
      //   user:'Jules',
      //   message:fieldTweet,
      //   likes:likes,
      //   date:Date(),
      //   hashtags:newHashtag,
      // }

      fetch('http://localhost:3000/tweets/add',
        {method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token:user.isConnected,
            message: fieldTweet,
            hashtags: newHashtag,
          }),
        }
      ).then(response => response.json())
      .then(data => {
        console.log(data)
        dispatch(addTweetsToStorage({
          id:data.id._id,
          user:user.username,
          message:data.id.message,
          date:data.id.date,
          likes:data.id.likes,
          hashtags:data.id.hashtags
        }))
        if(newHashtag ){
          console.log('tweet',)
          //setHashtags([...hashtags,...newHashtag])
          dispatch(updateHashtagsToStorage([...hashtags,...newHashtag]))
        }
      });

    }

    //dispatch(addTweetsToStorage(newTweet))
    setFieldTweet('')
  }

  function updateLike(props){
    dispatch(updateLikeTweet(props));
  }

  function deleteTweet(props){
    // fetch(`http://localhost:3000/tweets/${props.id}`,{
    //     method: 'DELETE'
    // }).then(response => response.json())
    // .then((data) => {
      dispatch(deleteTweetToStorage(props));
    // })
  }
  
  const listHashtags=[...new Set(hashtags)].map((h)=>{
    const nbH=hashtags.filter(x=> x==h).length;
    return <div>
      <Link href="/hashtag"><span  className={styles.hashtagsLink}>{h}</span></Link>
      <div className={styles.grey}>{nbH } Tweet{nbH>1&& 's'}</div>
    </div>
    
  })
  const listTweets=tweets.map((tweet,i)=> {return <Tweet key={i} {...tweet} updateLike={updateLike} deleteTweet={deleteTweet}/> ;})
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
