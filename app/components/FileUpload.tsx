"use client";

import {
  // ImageKitAbortError,
  // ImageKitInvalidRequestError,
  // ImageKitServerError,
  // ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res:UploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please select a video file");
      }

      if (file.size > 100 * 1024 * 1024) {
        setError("File size must be less than 100MB");
        return false;
      }
      return true;
    }
  };

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
        const auth = await fetch("/api/auth/imagekit-auth", {
            method: "POST",
            body: JSON.stringify({file}),
        }).then(res => res.json());

        const res =await upload({
            file,
            fileName: file.name,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            signature: auth.signature,
            expire: auth.expire,
            token: auth.token,
            onProgress: (event) => {
                if(event.lengthComputable && onProgress) {
                    const percent = Math.round((event.loaded * 100) / event.total);
                    onProgress(percent);
                }
            },
        });

        onSuccess(res);
    }
    catch(err) {
        console.error(err);
        setError("Failed to upload file");
    }
    finally {
        setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept={fileType === "image" ? "image/*" : "video/*"}
        onChange={handleFileChange}
      />
      {uploading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}

    </>
  );
};

export default FileUpload;
