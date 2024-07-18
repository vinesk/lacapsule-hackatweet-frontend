import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Login.module.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <FontAwesomeIcon icon={faXTwitter} className={styles.logo} />
      </div>
      <div className={styles.textContainer}>
        <FontAwesomeIcon icon={faXTwitter} className={styles.icon} />
        <h1 className={styles.title}>
          See what's <br />
          happening
        </h1>
        <h2 className={styles.subtitle}>Join Hackatweet today.</h2>
        <SignUp />
        <p className={styles.paragraph}>Already have an account?</p>
        <SignIn />
      </div>
    </div>
  );
}
