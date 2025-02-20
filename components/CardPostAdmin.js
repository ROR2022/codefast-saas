import React from "react";
import ButtonDeletePost from "./ButtonDeletePost";

const CardPostAdmin = ({ post }) => {
  return (
    <li className="bg-base-100 p-4 rounded-lg shadow-lg flex justify-between items-center">
      <div>
        <h3 className="font-bold mb-1">{post.title}</h3>
        <p className="opacity-80 leading-relaxed max-h-32 overflow-scroll">
          {post.description}
        </p>
      </div>
      {/* <button className="btn flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
            className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span className="hidden md:block">Delete</span>
      </button> */}
      <ButtonDeletePost postId={`${post._id}`} />
    </li>
  );
};

export default CardPostAdmin;
