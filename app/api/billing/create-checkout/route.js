import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req){
    try {
        const body = await req.json();
        //console.log("body: ", body);
        const { successUrl, cancelUrl } = body;

        if(!successUrl || !cancelUrl){
            return NextResponse.json(
                { error: "successUrl and cancelUrl are required" },
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

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: body.successUrl,
            cancel_url: body.cancelUrl,
            customer_email: user.email,
            client_reference_id: user._id.toString(),
        });
        //console.log("stripeCheckoutSession: ", stripeCheckoutSession);
        return NextResponse.json({ url: stripeCheckoutSession.url });

    } catch (error) {
        console.error("An unexpected error happened:", error);
        return NextResponse.json(
            { error: error.message || "An unexpected error happened" },
            { status: 500 }
        );
    }
}