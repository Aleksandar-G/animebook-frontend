import axios from "axios";
import { useState } from "react/cjs/react.development";
import Navbar from "../globalComponents/Navbar";
import { getCookie } from "cookies-next";

export const getServerSideProps = async ({ req, res }) => {
  const token = getCookie("token", { req, res });
  console.log(token);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};

const CeatePost = (props) => {
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [typeMsg, setTypeMsg] = useState("");

  const postSubmit = () => {
    const token = getCookie("token");
    console.log(token);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,
        {
          content: content,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setMsg("Created post");
        setTypeMsg("success");
        setShowMsg(true);
      })
      .catch((err) => {
        setMsg("Error when posting the post. Please try again later");
        setTypeMsg("danger");
        setShowMsg(true);
      });
  };
  return (
    <>
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
            <label>Content</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="Post Content"
              placeholder="Post Content"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mt-3 w-100"
            onClick={(r) => {
              postSubmit(r);
            }}
          >
            Create post
          </button>
        </form>
      </div>
    </>
  );
};

export default CeatePost;
