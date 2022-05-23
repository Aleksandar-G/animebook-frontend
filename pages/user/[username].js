import React from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import axios from "axios";
import Post from "../../globalComponents/Post";
import styles from "../../styles/Home.module.css";

export const getServerSideProps = async ({ req, res, params }) => {
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
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${params.username}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log("opaaaaa");
        console.log(res.data);
        return {
          props: {
            posts: res.data,
          },
        };
      })
      .catch((err) => {
        return {
          props: {},
        };
      });
  }
};

const UserProfile = ({ posts }) => {
  const router = useRouter();
  const { username } = router.query;
  return (
    <>
      <div className={styles.title}>{username}</div>
      <div className={styles.main}>
        {posts.map((post, key) => (
          <Post key={key} post={post}></Post>
        ))}
      </div>
    </>
  );
};

export default UserProfile;
