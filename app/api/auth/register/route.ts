import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Connect to the database
        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Create a new user
        await User.create({
            email,
            password, // Password will be hashed in the User model's pre-save hook
        })

        // const newUser = new User({ email, password }); //another way to create a new user
        // await newUser.save();

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    }
    catch (error) {
        console.error("Error in register route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}