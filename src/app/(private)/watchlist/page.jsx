"use client"

import React, { useContext } from 'react'
import MovieCard from '@/components/MovieCard'
import { MovieContext } from '@/context/MovieContext'

const Watchlist = () => {

    const { watchlist } = useContext(MovieContext)
    console.log(watchlist)

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6 gap-3 mx-3 sm:mx-auto sm:w-11/12 md:w-4/5 border border-base-content/10 p-4 sm:p-6 md:p-10 rounded-lg sm:gap-6 md:mt-10 md:gap-10'>
            {watchlist.map(movie => (
                <div key={movie.id}>
                    <MovieCard movie={movie} />
                </div>
            ))}

        </div>
    )
}

export default Watchlist