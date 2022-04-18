import Navbar from "../globalComponents/Navbar";
import { useState } from "react/cjs/react.development";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const submitRegister = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;

        localStorage.setItem("token", token);
      })
      .catch((err) => {
        setShowError(true);
        setErrorMsg(err.response.data);
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
          <div classNameName="form-group">
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
          <div classNameName="form-group">
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
      </div>
    </>
  );
};

export default Register;
