import axios from "axios";
import { getCookie } from "cookies-next";
//import { useEffect } from "react/cjs/react.production.min";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Post from "../globalComponents/Post";
import { Layout } from "../globalComponents/Layout";
import Navbar from "../globalComponents/Navbar";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [typeMsg, setTypeMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    const jwt = getCookie("token");
    if (jwt) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/`, {
          headers: {
            Authorization: `${jwt}`,
          },
        })
        .then((fetchedPosts) => {
          setPosts(fetchedPosts.data);
        })
        .catch((err) => {
          setTypeMsg("warning");
          setMsg("Service Temporarily Unavailable");
          setShowMsg(true);
        });
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <Layout />
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="mb-5 w-100 ">
            <Link href="/createPost" passHref>
              <button type="button" className="btn btn-primary float-end">
                Create Post
              </button>
            </Link>
          </div>
          <div
            hidden={!showMsg}
            className={"alert alert-" + typeMsg}
            role="alert"
          >
            {msg}
          </div>
          <div className="w-75 mx-auto">
            {posts.map((post, key) => (
              <Post key={key} post={post}></Post>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
