import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
//import Facebook from "next-auth/providers/facebook"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./libs/mongo";


const config = {
    providers: [
        Resend({
            apiKey: process.env.RESEND_KEY,
            from: "noreply@resend.codefastsaas.site",
            name: "Email",
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        
    ],
    adapter: MongoDBAdapter(clientPromise),
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
        