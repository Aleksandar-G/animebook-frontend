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
