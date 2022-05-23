import Navbar from "../globalComponents/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCookies, getCookie } from "cookies-next";
import Link from "next/link";
import { Layout } from "../globalComponents/Layout";

const Register = () => {
  const [email, setEmail] = useState("");
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

  const submitRegister = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        setCookies("token", token);
        setTypeMsg("success");
        setShowMsg(true);
        setMsg("Registered");

        setTimeout(() => {
          window.location.href = "/";
        }, 300);
      })
      .catch((err) => {
        setTypeMsg("danger");
        setShowMsg(true);
        setMsg(err.response.data);
      });
  };

  return (
    <>
      <Layout />
      <Navbar />
      <div className="m-auto w-25 mt-5">
        <div
          hidden={!showMsg}
          className={"alert alert-" + typeMsg}
          role="alert"
        >
          {msg}
        </div>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Userame</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="usernameHelp"
              placeholder="Username"
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
              aria-describedby="passwordHelp"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mt-3 w-100"
            onClick={() => {
              submitRegister();
            }}
          >
            Submit
          </button>
        </form>
        <Link href="/login">
          <a className="text-primary" href="#">
            You already have a profile
          </a>
        </Link>
      </div>
    </>
  );
};

export default Register;
