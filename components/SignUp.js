import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Button, Modal } from "antd";
import styles from "../styles/SignUp.module.css";

export default function SignUp() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
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

  const handleSignUp = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, username: data.username }));
          setFirstname("");
          setUsername("");
          setPassword("");
          setIsModalOpen(false);
        }
        console.log(data.result ? "Sign up successful" : data.error);
      });
  };

  return (
    <div>
      <Button className={styles.button} onClick={showModal}>
        Sign up
      </Button>
      <Modal
        className={styles.modal}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.signUpContainer}>
          <FontAwesomeIcon icon={faXTwitter} className={styles.logo} />
          <h2>Create your Hackatweet account</h2>
          <div>
            <input
              type="text"
              placeholder="Firstname"
              className={styles.input}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
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
            <Button className={styles.button} onClick={handleSignUp}>
              Sign up
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
