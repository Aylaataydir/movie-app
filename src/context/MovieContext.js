"use client"

import { createContext, useEffect, useState } from "react";


export const MovieContext = createContext()

const MovieContextProvider = ({ children }) => {


    const [watched, setWatched] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [favorites, setFavorites] = useState([])
    const [theme, setTheme] = useState("dark")

    useEffect(() => {
        setWatched(JSON.parse(localStorage.getItem("watched")) || [])
        setWatchlist(JSON.parse(localStorage.getItem("watchlist")) || [])
        setFavorites(JSON.parse(localStorage.getItem("favorites")) || [])
    }, [])



    const toggleList = (movie, listName) => {

        switch (listName) {
            case "watched":
                if (watched.some(m => m.id === movie.id)) {
                    setWatched(watched.filter(m => m.id !== movie.id))
                } else {
                    setWatched([...watched, movie])
                };
                break;

            case "watchlist":
                if (watchlist.some(m => m.id === movie.id)) {
                    setWatchlist(watchlist.filter(m => m.id !== movie.id))
                } else {
                    setWatchlist([...watchlist, movie])
                };
                break;
            case "favorites":
                if (favorites.some(m => m.id === movie.id)) {
                    setFavorites(favorites.filter(m => m.id !== movie.id))
                } else {
                    setFavorites([...favorites, movie])
                };
                break;

            default:
                break;
        }

    }

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }, [watchlist])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched))
    }, [watched])

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])



    return (
        <MovieContext.Provider value={{watched, watchlist, favorites, toggleList, theme}}>
            {children}
        </MovieContext.Provider>
    )
}


export default MovieContextProvider