import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
} as const;

export interface Transformations{
    height: number;
    width: number;
    quality?: number;
};

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls: boolean;
    transformations?: Transformations
}

