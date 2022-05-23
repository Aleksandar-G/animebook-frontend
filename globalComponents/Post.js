import React from "react";
import Link from "next/link";

const Post = ({ post, key }) => {
  console.log(post);
  return (
    <div id={key} className="card mb-4 mx-auto w-50">
      <div className="card-body">
        <Link href={"/user/" + post.username} passHref>
          <h5 className="card-title">
            {"post by "}
            <a href="#">{post.username}</a>
          </h5>
        </Link>
        <p className="card-text">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
