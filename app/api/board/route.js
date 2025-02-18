import { NextResponse } from "next/server";
import Board from "@/models/Board";
import User from "@/models/User";
import { auth } from "@/auth";
import connectDB from "@/libs/mongoose";

export async function POST(req) {
    const { name, userId } = await req.json();
    
    try {
        if(!name) {
            return NextResponse.json({ error: "Board name is required" }, { status: 400 });
        }

        const session = await auth();
        if(!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(session.user?.id || userId || "");

        const board = await Board.create({ name, userId: user._id });

        user.boards.push(board._id);
        await user.save();
    
        return NextResponse.json({ board });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An unexpected error happened" }, { status: 500 });
    }
    }