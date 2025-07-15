import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db"
import Video, { IVideo, VIDEO_DIMENSIONS } from "@/models/Video"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest){
    try {
        const session = await getServerSession(authOptions);

        if(!session?.user){
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, {status: 401})
        }

        await dbConnect();
        const body:IVideo = await request.json();

        if(
            !body.title || 
            !body.description || 
            !body.videoUrl || 
            !body.thumbnailUrl ||
            !body.controls
            ){
                return NextResponse.json({
                    success: false,
                    message: "All fields are required"
                }, {status: 400})
        }

        const videoData = {
            ...body,
            controls: body.controls || true, 
            transformations: {
                height: VIDEO_DIMENSIONS.height,
                width: VIDEO_DIMENSIONS.width,
                quality: body.transformations?.quality || 100
            },
            userId: session.user.id
        };
        const newVideo = await Video.create(videoData);

        return NextResponse.json({
            success: true,
            message: "Video created successfully",
            video: newVideo
        }, {status: 201})
    } 
    catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error creating video"
        }, {status: 500})
    }
}