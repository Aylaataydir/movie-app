'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaSpinner } from 'react-icons/fa'

const Search = ({ className = '' }) => {

    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        const trimmed = query.trim()

        if (!trimmed) {
            setResults([])
            setLoading(false)
            return
        }

        setLoading(true)

        const timeoutId = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`)
                const { results } = await res.json()
                setResults((results || []).slice(0, 6))
            } catch (error) {
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 400)

        return () => clearTimeout(timeoutId)
    }, [query])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = () => {
        setQuery('')
        setResults([])
        setOpen(false)
    }

    const showDropdown = open && query.trim().length > 0

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div className="flex items-center gap-2 rounded-full bg-base-content/5 px-3 py-1.5 ring-1 ring-base-content/10 transition-colors focus-within:ring-orange-500/60">
                <FaSearch className="h-3.5 w-3.5 shrink-0 text-base-content/50" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder="Search movies..."
                    className="w-full bg-transparent text-sm text-base-content placeholder:text-base-content/40 focus:outline-none"
                />
                {loading && <FaSpinner className="h-3.5 w-3.5 shrink-0 animate-spin text-base-content/50" />}
            </div>

            {showDropdown && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-base-content/10 bg-base-200 shadow-2xl">
                    {loading ? (
                        <p className="px-4 py-3 text-sm text-base-content/60">Searching...</p>
                    ) : results.length > 0 ? (
                        results.map(movie => (
                            <Link
                                key={movie.id}
                                href={`/movie/${movie.id}`}
                                onClick={handleSelect}
                                className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-base-content/5"
                            >
                                <div className="h-14 w-10 shrink-0 overflow-hidden rounded-md bg-base-300">
                                    {movie.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                            alt={movie.title}
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-base-content">{movie.title}</p>
                                    <p className="text-xs text-base-content/60">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : '—'}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="px-4 py-3 text-sm text-base-content/60">No results found.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Search
