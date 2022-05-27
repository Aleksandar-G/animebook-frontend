import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { setCookies, getCookie } from "cookies-next";
import Link from "next/link";
import { Layout } from "../globalComponents/Layout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [typeMsg, setTypeMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    if (getCookie("token")) {
      window.location.href = "/";
    }
  }, []);

  const loginSubmit = () => {
    setShowMsg(false);
    setMsg("");
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        setCookies("token", token);
        setTypeMsg("success");
        setMsg("Succsesfull");
        setShowMsg(true);

        setTimeout(() => {
          window.location.href = "/";
        }, 300);

        //localStorage.setItem("token", token);
      })
      .catch((err) => {
        setTypeMsg("danger");
        setShowMsg(true);
        if (err.response.status === 401) {
          setMsg(err.response.data);
        }
      });
  };

  return (
    <>
      <Layout />
      <div className="m-auto w-25 mt-5">
        <div
          hidden={!showMsg}
          className={"alert alert-" + typeMsg}
          role="alert"
        >
          {msg}
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="username"
                className="form-control"
                aria-describedby="Username"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="button"
              className="btn btn-danger mt-3 w-100"
              onClick={(r) => {
                loginSubmit(r);
              }}
            >
              Submit
            </button>
          </form>
          <Link href="/register">
            <a className="text-primary">You dont have an account</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
