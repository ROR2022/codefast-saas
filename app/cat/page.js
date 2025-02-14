"use client";
import React, { useState } from "react";
import Image from "next/image";

const initImageUrl = "https://cdn2.thecatapi.com/images/b5f.gif";

const RandomCatImage = () => {
  const [status, setStatus] = useState("idle");
  const [imageUrl, setImageUrl] = useState(
    initImageUrl
  );

  const fetchNewCat = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data = await response.json();
      const newImageUrl = data[0].url;
      return newImageUrl;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getNewCat = async () => {
    // 1. Set status to loading
    // 2. Fetch new cat image
    // 3. Set status to success or error
    // 4. if success, set imageUrl
    //    if error, set imageUrl to a default image
    try {
      setStatus("loading");
      const newImageUrl = await fetchNewCat();
      setImageUrl(newImageUrl);
      if (newImageUrl) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

    const handleClearError = () => {
    setStatus("idle");
    setImageUrl(initImageUrl);
    };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-lg font-bold">Async/Await Demo</h1>
      <div>STATUS: {status}</div>
      <button onClick={getNewCat} className="btn btn-primary">
        Fetch Cat Image
      </button>
      {status === "loading" && (
        <span className="loading loading-spinner loading-lg block"></span>
      )}
      {status === "error" && (
        <div role="alert" className="alert alert-error">
        <button className="btn btn-ghost btn-circle" onClick={handleClearError}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </button>
        <span>Error! Something went wrong.</span>
      </div>
      )}
      {imageUrl && status !== "error" && (
        <Image
          src={imageUrl}
          alt="Random Cat"
          width={300}
          height={300}
          className="rounded-lg"
        />
      )}
    </div>
  );
};

export default RandomCatImage;
