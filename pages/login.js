import axios from "axios";
import { useState } from "react/cjs/react.development";
import Navbar from "../globalComponents/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const loginSubmit = () => {
    setShowError(false);
    setErrorMsg("");
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;

        localStorage.setItem("token", token);
      })
      .catch((err) => {
        setShowError(true);
        if (err.response.status === 401) {
          setErrorMsg(err.response.data);
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="m-auto w-25 mt-5">
        <div hidden={!showError} className="alert alert-danger" role="alert">
          {errormsg}
        </div>
        <form>
          <div className="form-group">
            <label>Email address</label>
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
            className="btn btn-primary mt-3 w-100"
            onClick={(r) => {
              loginSubmit(r);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
