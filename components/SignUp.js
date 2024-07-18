import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Modal } from "antd";
import { useRouter } from "next/router";
import styles from "../styles/SignUp.module.css";

export default function SignUp() {
  const router = useRouter();
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
          router.push("/");
        }
        console.log(data.result ? "Sign up successful" : data.error);
      });
  };

  return (
    <div>
      <button className="btnSecondary" onClick={showModal}>
        Sign up
      </button>
      <Modal
        className="modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.modalContent}>
          <FontAwesomeIcon icon={faXTwitter} className={styles.logo} />
          <h2 className={styles.title}>Create your Hackatweet account</h2>
          <input
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
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
          <button className="btnWhite" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </Modal>
    </div>
  );
}
