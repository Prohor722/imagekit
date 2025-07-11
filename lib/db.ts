import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI! || "";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export async function dbConnect() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };
        mongoose
        .connect(MONGODB_URI, opts)
        .then(()=>mongoose.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null; // Reset the promise on error
        cached.conn = null; // Reset the connection on error
        console.error("Failed to connect to MongoDB:", error);  
    }

    return cached.conn;
}