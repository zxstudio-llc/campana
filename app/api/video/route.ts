import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
        return new NextResponse("Missing url parameter", { status: 400 });
    }

    try {
        // Capturar la cabecera Range del cliente (fundamental para iOS/Safari)
        const range = request.headers.get("range");
        const fetchHeaders: Record<string, string> = {};
        if (range) {
            fetchHeaders["Range"] = range;
        }

        const response = await fetch(videoUrl, {
            headers: fetchHeaders
        });

        if (!response.ok && response.status !== 206) {
            return new NextResponse("Failed to fetch video", { status: response.status });
        }

        const headers = new Headers();
        headers.set("Content-Type", response.headers.get("Content-Type") || "video/mp4");
        headers.set("Accept-Ranges", "bytes");

        // Copiar cabeceras críticas de rango si existen
        if (response.headers.has("Content-Range")) {
            headers.set("Content-Range", response.headers.get("Content-Range")!);
        }
        if (response.headers.has("Content-Length")) {
            headers.set("Content-Length", response.headers.get("Content-Length")!);
        }

        // Caché agresiva: 1 año. Vercel Edge respetará esto.
        headers.set("Cache-Control", "public, s-maxage=31536000, max-age=31536000, immutable");

        return new NextResponse(response.body, {
            headers,
            status: response.status
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
