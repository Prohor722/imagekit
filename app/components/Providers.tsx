import { ImageKitProvider } from "@imagekit/next"
import { SessionProvider } from "next-auth/react"

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;


export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider refetchInterval={5*60}> {/* 5 minutes */}
            <ImageKitProvider  urlEndpoint={urlEndpoint}>
                {children}
            </ImageKitProvider>
        </SessionProvider>
    )
}
