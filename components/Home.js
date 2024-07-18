import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
      <FontAwesomeIcon icon={faXTwitter} />
    </div>
  );
}

export default Home;
