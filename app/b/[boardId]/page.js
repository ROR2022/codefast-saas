"use server";
//import React from "react";
import { redirect } from "next/navigation";
import connectDB from "@/libs/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
//import { auth } from "@/auth";
import FormAddPost from "@/components/FormAddPost";
import CardPost from "@/components/CardPost";
import Link from "next/link";

const getData = async (boardId) => {
  try {
    await connectDB();
    const board = await Board.findById(boardId);
    const posts = await Post.find({ boardId }).sort({ votesCounter: -1 });
    return { board, posts };
    //return board;
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
};

const PublicFeedbackBoard = async ({ params }) => {
  const { boardId } = await params;

  const { board, posts } = await getData(boardId);
  if (!board) {
    redirect("/");
  }
  console.log("FeedbackBoard: ", board);
  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto p-5">
        <h1 className="text-lg font-bold">
          {board.name}
          </h1>
      </section>
      <section className="max-w-5xl mx-auto px-5 flex flex-col items-start md:flex-row gap-8 pb-12 sticky top-8">
        <div className="flex flex-col">
        <FormAddPost boardId={`${boardId}`} />
        <Link 
        href={`/`}
        className="text-lg font-bold text-blue-500 hover:text-blue-700 text-center"
        >Go back home</Link>
        </div>
        <ul className="space-y-4 flex-grow">
          {posts.map((post) => (
            <CardPost key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default PublicFeedbackBoard;
