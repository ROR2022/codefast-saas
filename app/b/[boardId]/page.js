"use server";
//import React from "react";
import { redirect } from "next/navigation";
import connectDB from "@/libs/mongoose";
import Board from "@/models/Board";
//import { auth } from "@/auth";

const getBoard = async (boardId) => {
  try {
    await connectDB();
    const board = await Board.findById(boardId);
    return board;
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
};

const PublicFeedbackBoard = async ({ params }) => {
  const { boardId } = await params;

  const board = await getBoard(boardId);
  if (!board) {
    redirect("/");
  }
  console.log("FeedbackBoard: ", board);
  return <div>(Public)FeedbackBoard: {board.name}</div>;
};

export default PublicFeedbackBoard;
