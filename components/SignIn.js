import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Modal } from "antd";
import { useRouter } from "next/router";
import styles from "../styles/SignIn.module.css";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSignIn = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, username: data.username }));
          setUsername("");
          setPassword("");
          setIsModalOpen(false);
          router.push("/");
        }
      });
  };

  return (
    <div>
      <button className="btnPrimary" onClick={showModal}>
        Sign in
      </button>
      <Modal
        className="modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <FontAwesomeIcon icon={faXTwitter} className={styles.logo} />
          <h2 className={styles.title}>Connect to Hackatweet</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btnWhite" onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      </Modal>
    </div>
  );
}
