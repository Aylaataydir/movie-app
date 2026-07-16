"use client"

import { toastError } from "@/helpers/ToastNotify";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";


export const MovieContext = createContext()

const MovieContextProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext)

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

        if (!currentUser) {
            const messages = {
                watchlist: "Please log in to add movies to your watchlist",
                watched: "Please log in to mark movies as watched",
                favorites: "Please log in to add movies to your favorites",
            }

              toastError(messages[listName] || "Please log in to continue")

            return
        }

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
        <MovieContext.Provider value={{ watched, watchlist, favorites, toggleList, theme }}>
            {children}
        </MovieContext.Provider>
    )
}


export default MovieContextProvider