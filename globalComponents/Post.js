import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import axios from "axios";

const Post = ({ post, key, deletable, reload, setReload }) => {
  const router = useRouter();

  const deletePost = () => {
    const jwt = getCookie("token");
    if (jwt) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${post.id}`, {
          headers: {
            Authorization: `${jwt}`,
          },
        })
        .then(() => {
          router.reload(window.location.pathname);
        })
        .catch((err) => {
          console.log("could not delete post");
        });
    } else {
      window.location.href = "/login";
    }
  };
  return (
    <>
      <div id={key} className="card mb-4 mx-auto w-50">
        <div className="card-body">
          <div>
            <Link href={"/user/" + post.username} passHref>
              <h5 className="card-title d-inline w-50">
                {"post by "}
                <a href="#">{post.username}</a>
              </h5>
            </Link>
            <p className="d-inline float-end">
              {new Date(post.createdAt).toLocaleDateString("en")}
            </p>
          </div>
          <div>
            <p className="card-text">{post.content}</p>
          </div>
          <button
            hidden={!deletable}
            type="button"
            className="btn btn-danger float-end"
            onClick={() => {
              deletePost();
            }}
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
