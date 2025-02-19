import { NextResponse } from "next/server";
import Board from "@/models/Board";
import User from "@/models/User";
import { auth } from "@/auth";
import connectDB from "@/libs/mongoose";

export async function POST(req) {
  const { name, userId } = await req.json();

  try {
    if (!name) {
      return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user?.id || userId || "");

    if(!user.hasAccess) {
      return NextResponse.json({ error: "Please subscribe first" }, { status: 403 });
    }

    const board = await Board.create({ name, userId: user._id });

    user.boards.push(board._id);
    await user.save();

    return NextResponse.json({ board });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error happened" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user?.id);

    if (!user.hasAccess) {
      return NextResponse.json({ error: "Please subscribe first" }, { status: 403 });
    }


    const resDelete = await Board.deleteOne({ 
        _id: boardId,
        userId: session.user?.id
    });

    if (!resDelete.deletedCount) {
      return NextResponse.json(
        { error: "Board not found or you don't have permission" },
        { status: 404 }
      );
    }

    
    user.boards = user.boards.filter((id) => id.toString() !== boardId);
    await user.save();

    return NextResponse.json({ message: "Board deleted" });

  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An unexpected error happened" },
      { status: 500 }
    );
  }
}
