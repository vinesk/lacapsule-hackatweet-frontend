import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Button, Modal } from "antd";
import styles from "../styles/SignIn.module.css";

export default function SignIn() {
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
        }
        console.log(data.result ? "Sign in successful" : data.error);
      });
  };

  return (
    <div>
      <Button className={styles.button} onClick={showModal}>
        Sign in
      </Button>
      <Modal
        className={styles.modal}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.signInContainer}>
          <FontAwesomeIcon icon={faXTwitter} className={styles.logo} />
          <h2>Create your Hackatweet account</h2>
          <div>
            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className={styles.button} onClick={handleSignIn}>
              Sign in
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
