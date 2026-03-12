import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
        return new NextResponse("Missing url parameter", { status: 400 });
    }

    try {
        const response = await fetch(videoUrl);
        
        if (!response.ok) {
            return new NextResponse("Failed to fetch video", { status: response.status });
        }

        const headers = new Headers();
        headers.set("Content-Type", response.headers.get("Content-Type") || "video/mp4");
        // Caché agresiva: 1 año. Vercel Edge respetará esto.
        headers.set("Cache-Control", "public, s-maxage=31536000, max-age=31536000, immutable");

        return new NextResponse(response.body, { 
            headers,
            status: 200 
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
