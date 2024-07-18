import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';



function Tweet(props) { 
const style= props.likes.length>0?{'color':'red'}:{'color':'white'}
  return (
    <div className={styles.tweet}>
        <p style={{'color':'white'}}>{props.message}</p>
        <div>
        <FontAwesomeIcon className={styles.heart} icon={faHeart} onClick={() => props.updateLike(props)} style={style}/>
        <p>{props.likes.length}</p>
        </div>
    </div>
  );
}

export default Tweet;