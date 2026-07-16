'use client'

import { useContext } from 'react'
import { MovieContext } from '@/context/MovieContext'
import { FaBookmark, FaCheck, FaHeart } from 'react-icons/fa'

const MovieCardButtons = ({ movie }) => {
    const { toggleList, watched, watchlist, favorites } = useContext(MovieContext)

    const isWatched = watched.some(m => m.id === movie.id)
    const isInWatchList = watchlist.some(m => m.id === movie.id)
    const isInFavorites = favorites.some(m => m.id === movie.id)

    return (
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

            <button
                onClick={() => toggleList(movie, "watchlist")}
                className={`btn btn-circle btn-xs border-none text-white hover:bg-orange-500 tooltip tooltip-left ${isInWatchList ? "bg-orange-500" : "bg-black/60"}`}
                data-tip={`${isInWatchList ? "Remove" : "Watchlist"}`}>
                <FaBookmark className="h-4 w-4" />
            </button>

            <button
                onClick={() => toggleList(movie, "watched")}
                className={`btn btn-circle btn-xs border-none text-white hover:bg-green-500 tooltip tooltip-left ${isWatched ? "bg-green-500" : "bg-black/60"}`}
                data-tip={`${isWatched ? "Remove" : "Watched"}`}>
                <FaCheck className="h-4 w-4" />
            </button>

            <button
                onClick={() => toggleList(movie, "favorites")}
                className={`btn btn-circle btn-xs border-none text-white hover:bg-red-500 tooltip tooltip-left ${isInFavorites ? "bg-red-500" : "bg-black/60"}`}
                data-tip={`${isInFavorites ? "Remove" : "Favorite"}`}>
                <FaHeart className="h-4 w-4" />
            </button>
        </div>
    )
}

export default MovieCardButtons