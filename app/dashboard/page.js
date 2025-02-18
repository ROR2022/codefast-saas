import React from "react";
//import Link from "next/link"
import ButtonLink from "@/components/ButtonLink";
import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";
//eslint-disable-next-line
//import Board from "@/models/Board";

async function getUser() {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }

    await connectDB();
    return await User.findById(session.user?.id).populate("boards");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function page() {
  const user = await getUser();
  //console.log("User", user);
  return (
    <main className="bg-base-200 min-h-screen">
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto flex gap-4 px-5 py-3 justify-end">
          <ButtonLink linkTo="home" />
          <ButtonLogout />
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <FormNewBoard />
        <div className="space-y-4 mt-4">
          <h1 className="font-extrabold text-xl">
            {user.boards.length} Boards
          </h1>

          <ul className="space-y-4 mt-4">
            {user.boards.map((board) => (
              <li 
              key={board._id}>
                <h2
                className="bg-base-100 p-6 rounded-3xl shadow-lg"
                >{board.name}</h2>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
