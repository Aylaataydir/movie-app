
// istedigimiz ozellikteki filmleri getiren fonksiyon.

const API_KEY = process.env.TMDB_KEY

export const getMovies = async (type) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`);
    const { results } = await res.json()

    return results
}


// tiklanan filmin fragmanini youtube dan getirebilmek icin bir key e ihtiyacim var.

export const getYoutubeKey = async (movieId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`)
    const { results } = await res.json()

    return results[0].key
}


 export const getSearch = async (query) => {
    const res =  await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)

    const { data } = await res.json()
    
    console.log(data)

    return data.results
  }
