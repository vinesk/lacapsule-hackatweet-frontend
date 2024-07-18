import Link from "next/link";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/hashtag">Hashtag</Link>
    </div>
  );
}

export default Home;
