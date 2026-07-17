import { NextResponse } from "next/server"
import { getMoviesByGenre } from "@/services/movieApi"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const genreId = searchParams.get("genreId")
    const year = searchParams.get("year")
    const page = Number(searchParams.get("page")) || 1

    if (!genreId && !year) {
        return NextResponse.json({ results: [], page: 1, totalPages: 0 })
    }

    const data = await getMoviesByGenre(genreId, page, year)

    return NextResponse.json(data)
}
