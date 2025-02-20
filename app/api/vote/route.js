import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Post from "@/models/Post";

export async function POST(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  try {
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    post.votesCounter += 1;

    const lenTitle = post.title.length;
    const lenDescription = post.description.length;
    if (lenTitle > 100) {
      post.title = post.title.slice(0, 100);
    }
    if (lenDescription > 1000) {
      post.description = post.description.slice(0, 1000);
    }

    await post.save();

    return NextResponse.json({ message: "Vote added" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error happened" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  try {
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    post.votesCounter -= 1;

    const lenTitle = post.title.length;
    const lenDescription = post.description.length;
    if (lenTitle > 100) {
      post.title = post.title.slice(0, 100);
    }
    if (lenDescription > 1000) {
      post.description = post.description.slice(0, 1000);
    }

    await post.save();

    return NextResponse.json({ message: "Vote removed" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error happened" },
      { status: 500 }
    );
  }
}
