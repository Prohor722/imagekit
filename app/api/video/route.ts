import { dbConnect } from "@/lib/db"
import Video from "@/models/Video"
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect()
        const videos = await Video.find({}).sort({createdAt:-1}).lean();

        if(!videos || videos.length === 0){
            return NextResponse.json({
                success: false,
                message: "No videos found"
            }, {status: 404})
        }

        return NextResponse.json({
            success: true,
            videos
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error fetching videos"
        }, {status: 500})
    }
}