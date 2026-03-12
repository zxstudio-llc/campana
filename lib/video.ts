/**
 * Utility to manage video URLs with proxying and versioning.
 * Versioning is automatic: invalidates cache every 15 days.
 */
const FIFTEEN_DAYS_MS = 1000 * 60 * 60 * 24 * 15;
export const VIDEO_VERSION = `v-${Math.floor(Date.now() / FIFTEEN_DAYS_MS)}`;

/**
 * Transforms a Supabase/External URL into a proxied URL with versioning.
 * This ensures Vercel caches the video at the edge and updates when version changes.
 */
export function getVideoUrl(url: string | undefined | null): string {
    if (!url) return "";

    // If it's already a relative path or already proxied, just add version
    if (url.startsWith("/") && !url.startsWith("/api/video")) {
        return `${url}${url.includes("?") ? "&" : "?"}v=${VIDEO_VERSION}`;
    }

    // Proxy through our API to handle cache headers and Supabase limits
    const encodedUrl = encodeURIComponent(url);
    return `/api/video?url=${encodedUrl}&v=${VIDEO_VERSION}`;
}
