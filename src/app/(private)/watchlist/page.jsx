"use client"

import React, { useContext } from 'react'
import MovieCard from '@/components/MovieCard'
import { MovieContext } from '@/context/MovieContext'

const Watchlist = () => {

    const { watchlist } = useContext(MovieContext)
    console.log(watchlist)

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-10 w-4/5 mx-auto border border-white/10 p-10 rounded-lg'>
            {watchlist.map(movie => (
                <div key={movie.id}>
                    <MovieCard movie={movie} />
                </div>
            ))}

        </div>
    )
}

export default Watchlist