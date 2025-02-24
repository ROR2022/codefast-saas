"use client";
import React from "react";
import toast from "react-hot-toast";

const CardBoardLink = ({ boardId }) => {
  const host =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://codefastsaas.site";

  const boardLink = `${host}/b/${boardId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(boardLink);
    toast.success("Board link copied to clipboard");
  };

  const goVisit = () => {
    window.open(boardLink, "_blank");
  };

  return (
    <>
      
      <div className="bg-base-100 rounded-3xl text-sm px-4 py-2.5 flex flex-col gap-2 items-center max-w-60 md:max-w-96 mt-0">
        <a
          href={boardLink}
          className="truncate hover:text-blue-500 hover:underline w-full"
          target="_blank"
          rel="noreferrer"
        >
          <p className="truncate w-full">{boardLink}</p>
        </a>
        <div className="flex gap-2">
        <button className="btn btn-neutral" onClick={copyToClipboard}>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            <p className="hidden md:block">Copy</p>
          </div>
        </button>
        <button className="btn btn-neutral" onClick={goVisit}>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            <p className="hidden md:block">Visit</p>
          </div>
        </button>
        </div>
      </div>
    </>
  );
};

export default CardBoardLink;
