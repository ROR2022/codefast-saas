"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
//import './ButtonVote.css';

const ButtonVote = ({ postId, initialVoted, initialVotesCounter }) => {
  const localStorageKeyName = `codeFastSaas-vote-${postId}`;
  //const userHasVotedLocally = window.localStorage.getItem(localStorageKeyName);
  //initialVoted = userHasVotedLocally ? true : initialVoted;
  const [dataLocalStorage, setDataLocalStorage] = useState(null);
  const [voted, setVoted] = useState(initialVoted);
  const [loading, setLoading] = useState(false);
  const [votesCounter, setVotesCounter] = useState(initialVotesCounter);

  useEffect(() => { 
    setDataLocalStorage(window.localStorage);
  }, []);
  useEffect(() => {
    if (dataLocalStorage) {
        const userHasVotedLocally = dataLocalStorage.getItem(localStorageKeyName);
        if (userHasVotedLocally) {
            setVoted(true);
            } else {
            setVoted(false);
            }
    }
  }, [dataLocalStorage]);

  const handleVote = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = voted
        ? await axios.delete(`/api/vote?postId=${postId}`)
        : await axios.post(`/api/vote?postId=${postId}`);

      if (response.status === 200) {
        setVoted(!voted);
        setVotesCounter(voted ? votesCounter - 1 : votesCounter + 1);
        toast.success(voted ? "Vote removed" : "Vote added");
        if (!voted) {
          dataLocalStorage.setItem(localStorageKeyName, "true");
        } else {
          dataLocalStorage.removeItem(localStorageKeyName);
        }
      } else {
        toast.error(voted ? "Failed to remove vote" : "Failed to add vote");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
      toast.error("An unexpected error happened");
    } finally {
      setLoading(false);
    }
  };

  //`border px-4 py-2 rounded-xl text-lg ${voted ? "border-green-500" : "border-blue-500"}`

  return (
    <button
      onClick={handleVote}
      disabled={loading}
      className={`group border px-4 py-2 rounded-xl text-lg duration-300 ${
        voted
          ? "border-transparent bg-primary text-primary-content"
          : "bg-base-100 text-base-content hover:border-base-content/25"
      }`}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <>
          {voted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 group-hover:translate-y-0.5 duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 group-hover:-translate-y-0.5 duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
          <span>{votesCounter}</span>
        </>
      )}
    </button>
  );
};

export default ButtonVote;
