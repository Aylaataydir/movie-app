
// istedigimiz ozellikteki filmleri getiren fonksiyon.

const API_KEY = process.env.TMDB_KEY
const BASE_URL = process.env.URL

export const getMoviesByType = async (type) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`);
    const { results } = await res.json()
    console.log(results)
    return results
}


// tiklanan filmin fragmanini youtube dan getirebilmek icin bir key e ihtiyacim var.

export const getMovieVideos = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
    if (!res.ok) throw new Error('Failed to fetch movie videos')
    const data = await res.json()
    return data.results
}

export const getMovieDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    if (!res.ok) throw new Error('Failed to fetch movie details')
    return res.json()
}

export const getSearch = async (query) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)

    const { results } = await res.json()

    return results
}

export const getGenres = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    if (!res.ok) throw new Error('Failed to fetch genres')
    const data = await res.json()
    return data.genres   // [{ id: 28, name: "Action" }, { id: 35, name: "Comedy" }, ...]
}

export const getMoviesByGenre = async (genreId, page = 1, year) => {
    const params = new URLSearchParams({
        api_key: API_KEY,
        sort_by: 'vote_average.desc',
        'vote_count.gte': '100',
        page,
    })
    if (genreId) params.set('with_genres', genreId)
    if (year) params.set('primary_release_year', year)

    const res = await fetch(`${BASE_URL}/discover/movie?${params.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch movies by genre')
    const data = await res.json()
    return { results: data.results, page: data.page, totalPages: data.total_pages }
}
