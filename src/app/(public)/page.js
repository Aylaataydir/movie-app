
import HomeBrowser from '@/components/HomeBrowser'
import { getMoviesByType, getGenres } from '@/services/movieApi'

const Home = async () => {

    const [popular, upcoming, topRated, nowPlaying, genres] = await Promise.all([
        getMoviesByType('popular'),
        getMoviesByType('upcoming'),
        getMoviesByType('top_rated'),
        getMoviesByType('now_playing'),
        getGenres(),
    ])

    return (
        <div className='mt-5 '>
            <HomeBrowser
                popular={popular}
                upcoming={upcoming}
                topRated={topRated}
                nowPlaying={nowPlaying}
                genres={genres}
            />
        </div>

    )
}

export default Home
