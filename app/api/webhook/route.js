import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
    try {
        const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        const body = await req.text();
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const sig = (await headers()).get("stripe-signature");
        const event = stripe.webhooks.constructEvent(body, sig, webHookSecret);

        const { type, data } = event;

        //console.log("event: ", event);
        //console.log("data: ", data);

        if(type === "checkout.session.completed"){
            //console.log("Checkout session completed: ", data);
            await connectDB();
            const user = await User
            .findOne({ _id: data.object.client_reference_id });
            user.hasAccess = true;
            user.customerId = data.object.customer;
            await user.save();
        } else if(type === "customer.subscription.deleted"){
            //console.log("Subscription deleted: ", data);
            await connectDB();
            const user = await User
            .findOne({ customerId: data.object.customer })
            user.hasAccess = false;
            await user.save();
        }
        
    } catch (error) {
        console.error("An unexpected error happened:", error);
        return NextResponse.json(
            { error: error.message || "An unexpected error happened" },
            { status: 500 }
        );
        
    }

    return NextResponse.json({ message: "Webhook received" });
}