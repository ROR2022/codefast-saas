import React from "react";
import Link from "next/link"
import { redirect } from "next/navigation";
//import ButtonLink from "@/components/ButtonLink";
import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonPortal from "@/components/ButtonPortal";
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
  if(!user) {
    redirect("/");
    //return null
  }
  //console.log("User", user);
  return (
    <main className="bg-base-200 min-h-screen">
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto flex gap-4 px-5 py-3 justify-between">
          {/* <ButtonLink linkTo="home" /> */}
          {user?.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
          <div>
          <ButtonLogout />
          <Link href={'/'} className="btn btn-ghost">Home</Link>
          </div>
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
                
                  <Link 
                  href={`/dashboard/b/${board._id}`} 
                  className="block bg-base-100 p-6 rounded-3xl shadow-lg cursor-pointer hover:bg-neutral hover:text-neutral-content duration-200"
                  >
                  {board.name}
                  </Link>
                  
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
