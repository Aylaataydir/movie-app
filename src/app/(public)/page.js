
import MovieList from '@/components/MovieList'
import Search from '@/components/Search'
import { getMoviesByType } from '@/services/movieApi'
import React from 'react'


const Home = async () => {

    const [popular, upcoming, topRated, nowPlaying] = await Promise.all([
        getMoviesByType('popular'),
        getMoviesByType('upcoming'),
        getMoviesByType('top_rated'),
        getMoviesByType('now_playing'),
    ])

    return (
        <div className='mt-5 '>
            <Search className="hidden w-48 lg:block xl:w-64 ml-auto me-10" />
            <div className='flex flex-col gap-8 px-4 pb-8 md:px-10'>
                <MovieList title="Popular" movies={popular} />
                <MovieList title="Upcoming" movies={upcoming} />
                <MovieList title="Top Rated" movies={topRated} />
                <MovieList title="Now Playing" movies={nowPlaying} />
            </div>
        </div>

    )
}

export default Home