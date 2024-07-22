import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faTrash,faUser} from '@fortawesome/free-solid-svg-icons';
const moment =require('moment')


function Tweet(props) { 

  function message(props){
    if(props.hachtags && props.hachtags.length>0){
      let tab=props.message.split('#'&&' ');
      console.log(tab);
      return props.message;
    }
    return props.message;
  }

function displayTime(props){
  return moment(props.date).utcOffset(props.date).format('HH:mm:ss');
}
const style= (props.likes.length>0)?{'color':'red'}:{'color':'white'}
  return (
    <div className={styles.tweetContainer}>
      <div className={styles.tweetInfos}>
        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
        <span className={styles.userFirstname}>{props.firstname}</span>
        <span className={styles.userUsername}>
          @{props.user} • {displayTime(props)}
        </span>
      </div>
      <p>{message(props)}</p>
      <div className={styles.tweetBtns}>
        <div className={styles.heartBtn} style={style}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faHeart}
            onClick={() => props.updateLike(props)}
          />
          <span>{props.likes.length}</span>
        </div>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTrash}
          onClick={() => props.deleteTweet(props)}
        />
      </div>
    </div>
    
  );
}

export default Tweet;