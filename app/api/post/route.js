
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { auth } from "@/auth";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";
import { Filter } from "bad-words";

export async function POST(req) {
  const { title, description } = await req.json();
  const { searchParams } = req.nextUrl;
  const boardId = searchParams.get("boardId");
  const badWordsFilter = new Filter();

  try {
    if (!boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const sanitezedTitle = badWordsFilter.clean(title);
    const sanitezedDescription = badWordsFilter.clean(description || "");

    const session = await auth();
    await connectDB();
    const post = await Post.create({
      title: sanitezedTitle,
      description: sanitezedDescription,
      boardId,
      userId: session?.user?.id,
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "An unexpected error happened" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "post ID is required" },
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
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    //check if the user is the owner of the board
    //the user must have the boardId in their boards array
    const isOwner = user.boards.includes(post.boardId.toString());
    if (!isOwner) {
      return NextResponse.json(
        { error: "You don't have permission to delete this post" },
        { status: 403 }
      );
    }

    await post.deleteOne({ _id: postId });


    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An unexpected error happened" },
      { status: 500 }
    );
  }
}

