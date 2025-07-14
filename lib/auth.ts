import  bcrypt from 'bcryptjs';
import { NextAuthOptions } from "next-auth";
import { dbConnect } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";

export const authOptions:NextAuthOptions = {
    providers: [    
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"},
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email and password are required");
                }

                try{
                    await dbConnect();
                    const user = await User.findOne({ email: credentials?.email })

                    if(!user){
                        throw new Error("No user found with the given email");
                    }

                    const isPassMatch = await bcrypt.compare(
                        credentials?.password,
                        user.password
                    )

                    if(!isPassMatch){
                        throw new Error("Incorrect password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    }
                }
                catch(error){
                    console.error("Error in authorize:", error);
                    throw new Error("Internal Server Error");
                }
            }
        })
    ],
};

