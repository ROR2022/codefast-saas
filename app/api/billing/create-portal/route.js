import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req){
    try {
        const body = await req.json();
        //console.log("body: ", body);
        const { returnUrl } = body;

        if(!returnUrl){
            return NextResponse.json(
                { error: "returnUrl are required" },
                { status: 400 } 
            );
        }

        const session = await auth();

        if(!session){
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }


        await connectDB();
        const user = await User.findOne({ _id: session.user?.id || "" });

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const stripeCustomerPortal = await stripe.billingPortal.sessions.create({
            customer: user.customerId,
            return_url: returnUrl,
        });
        
        
        return NextResponse.json({ url: stripeCustomerPortal.url });

    } catch (error) {
        console.error("An unexpected error happened:", error);
        return NextResponse.json(
            { error: error.message || "An unexpected error happened" },
            { status: 500 }
        );
    }
}