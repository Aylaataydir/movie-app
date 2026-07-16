import { NextResponse } from "next/server"
import { getSearch } from "@/services/movieApi"

export async function GET(request) {
    const query = new URL(request.url).searchParams.get("q")?.trim()

    if (!query) {
        return NextResponse.json({ results: [] })
    }

    const results = await getSearch(query)

    return NextResponse.json({ results: results || [] })
}
