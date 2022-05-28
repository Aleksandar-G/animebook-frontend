import React, { useState, useEffect } from "react";
import Post from "../globalComponents/Post";
import { Layout } from "../globalComponents/Layout";
import Navbar from "../globalComponents/Navbar";
import { getCookie } from "cookies-next";
import axios from "axios";
import styles from "../styles/Home.module.css";

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
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/profile`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        return {
          props: {
            posts: res.data,
          },
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          props: {},
        };
      });
  }
};

const Profile = ({ posts }) => {
  return (
    <>
      <Layout />
      <Navbar />
      <div className={styles.title}>Profile</div>
      <div className={styles.main}>
        {posts.map((post, key) => (
          <Post post={post} key={key} deletable={true}></Post>
        ))}
      </div>
    </>
  );
};

export default Profile;
