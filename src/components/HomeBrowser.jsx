'use client'

import { useEffect, useMemo, useState } from 'react'
import Search from './Search'
import FilterDropdown from './FilterDropdown'
import MovieList from './MovieList'
import MovieCard from './MovieCard'
import { FaCalendarAlt, FaFilter } from 'react-icons/fa'

const HomeBrowser = ({ popular, upcoming, topRated, nowPlaying, genres }) => {

    const [selectedGenre, setSelectedGenre] = useState(null)
    const [selectedYear, setSelectedYear] = useState(null)
    const [genreMovies, setGenreMovies] = useState([])
    const [genrePage, setGenrePage] = useState(1)
    const [genreTotalPages, setGenreTotalPages] = useState(1)
    const [genreLoading, setGenreLoading] = useState(false)

    const genreOptions = useMemo(
        () => [...(genres || [])]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(g => ({ id: g.id, label: g.name })),
        [genres]
    )

    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear()
        const years = []
        for (let y = currentYear + 1; y >= 1950; y--) {
            years.push({ id: y, label: String(y) })
        }
        return years
    }, [])

    const lists = useMemo(() => ([
        { title: 'Popular', movies: popular },
        { title: 'Upcoming', movies: upcoming },
        { title: 'Top Rated', movies: topRated },
        { title: 'Now Playing', movies: nowPlaying },
    ]), [popular, upcoming, topRated, nowPlaying])

    const hasActiveFilter = Boolean(selectedGenre || selectedYear)

    useEffect(() => {
        if (!hasActiveFilter) return

        let cancelled = false

        const timeoutId = setTimeout(async () => {
            setGenreLoading(true)
            try {
                const params = new URLSearchParams({ page: '1' })
                if (selectedGenre) params.set('genreId', selectedGenre)
                if (selectedYear) params.set('year', selectedYear)

                const res = await fetch(`/api/movies-by-genre?${params.toString()}`)
                const data = await res.json()
                if (cancelled) return
                setGenreMovies(data.results || [])
                setGenrePage(data.page || 1)
                setGenreTotalPages(data.totalPages || 1)
            } finally {
                if (!cancelled) setGenreLoading(false)
            }
        }, 0)

        return () => {
            cancelled = true
            clearTimeout(timeoutId)
        }
    }, [selectedGenre, selectedYear, hasActiveFilter])

    const goToPage = (page) => {
        if (!hasActiveFilter || page < 1 || page > genreTotalPages) return

        const params = new URLSearchParams({ page: String(page) })
        if (selectedGenre) params.set('genreId', selectedGenre)
        if (selectedYear) params.set('year', selectedYear)

        setGenreLoading(true)
        fetch(`/api/movies-by-genre?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setGenreMovies(data.results || [])
                setGenrePage(data.page || page)
                setGenreTotalPages(data.totalPages || 1)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })
            .finally(() => setGenreLoading(false))
    }

    const selectedGenreName = genreOptions.find(g => g.id === selectedGenre)?.label
    const heading = [selectedGenreName, selectedYear].filter(Boolean).join(' · ')

    return (
        <>
            <div className="mx-3 mb-6 flex flex-nowrap items-center gap-1.5 sm:mx-4 sm:gap-3 md:mx-10 lg:mb-0 lg:justify-end">
                <Search className="min-w-0 flex-1 lg:w-48 lg:flex-none xl:w-56" />
                <FilterDropdown
                    icon={FaFilter}
                    options={genreOptions}
                    selected={selectedGenre}
                    onSelect={setSelectedGenre}
                    placeholder="All Genres"
                    className="w-28 shrink-0 sm:w-40 md:w-44"
                />
                <FilterDropdown
                    icon={FaCalendarAlt}
                    options={yearOptions}
                    selected={selectedYear}
                    onSelect={setSelectedYear}
                    placeholder="All Years"
                    className="w-24 shrink-0 sm:w-32 md:w-36"
                />
            </div>

            {hasActiveFilter ? (
                <div className='px-3 pb-16 sm:px-4 sm:pb-24 md:px-10'>
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-5 w-1 rounded-full bg-orange-500" />
                        <h2 className="text-lg font-bold tracking-tight text-base-content md:text-xl">
                            {heading}
                        </h2>
                    </div>

                    {genreLoading ? (
                        <p className="py-10 text-center text-base-content/60">Loading...</p>
                    ) : genreMovies.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-y-15 xl:grid-cols-5">
                                {genreMovies.map(movie => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => goToPage(genrePage - 1)}
                                    disabled={genrePage <= 1}
                                    className="rounded-full bg-base-content/5 px-4 py-1.5 text-sm text-base-content ring-1 ring-base-content/10 transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-base-content/5"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-base-content/60">
                                    Page {genrePage} / {genreTotalPages}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => goToPage(genrePage + 1)}
                                    disabled={genrePage >= genreTotalPages}
                                    className="rounded-full bg-base-content/5 px-4 py-1.5 text-sm text-base-content ring-1 ring-base-content/10 transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-base-content/5"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="py-10 text-center text-base-content/60">No movies found for this filter.</p>
                    )}
                </div>
            ) : (
                <div className='flex flex-col gap-6 px-3 pb-16 sm:gap-8 sm:px-4 sm:pb-24 md:px-10'>
                    {lists.map(({ title, movies }) => (
                        <MovieList key={title} title={title} movies={movies} />
                    ))}
                </div>
            )}
        </>
    )
}

export default HomeBrowser
