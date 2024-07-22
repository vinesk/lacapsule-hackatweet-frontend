import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faTrash} from '@fortawesome/free-solid-svg-icons';
const moment =require('moment')


function Tweet(props) { 

  function message(props){
    if(props.hachtags && props.hachtags.length>0){
      let tab=props.message.split('#'&&' ')
      console.log('tab:',tab);
      return 'pass'
    }
    return props.message;
  }

function displayTime(props){
  return moment(props.date).utcOffset(props.date).format('HH:mm:ss');
}
const style= (props.likes!=undefined && props.likes.length>0)?{'color':'red'}:{'color':'white'}
  return (
    <div className={styles.tweetContainer}>
        <div className={styles.tweetInfos}>
          <p className={styles.userUsername}>{props.username}</p>
          <p className={styles.time}>{displayTime(props)}</p>
        </div>
        <p className={styles.message}style={{'color':'white'}}>{message(props)}</p>
        <div className={styles.tweetInfos}>
          <FontAwesomeIcon className={styles.heartBtn} icon={faHeart} onClick={() => props.updateLike(props)} style={style}/>
          <p>{props.likes.length}</p>
          <FontAwesomeIcon className={styles.trash} icon={faTrash} onClick={() => props.deleteTweet(props)} style={{'color':'white'}}/>
        </div>
    </div>
  );
}

export default Tweet;