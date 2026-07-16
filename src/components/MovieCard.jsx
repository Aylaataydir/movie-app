import Link from 'next/link'
import { FaFilm, FaStar } from 'react-icons/fa'
import MovieCardButtons from './MovieCardButtons'

const MovieCard = ({ movie }) => {

    const { title, poster_path, backdrop_path, release_date, vote_average } = movie
    const year = release_date ? new Date(release_date).getFullYear() : "—"
    const posterPath = poster_path || backdrop_path

    return (
        <div className="group relative w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-900/30 hover:ring-orange-500/50">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-800">
                {posterPath ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-600">
                        <FaFilm className="h-10 w-10" />
                    </div>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/95 to-transparent" />

                <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <FaStar className="h-3 w-3 text-orange-400" />
                    {vote_average?.toFixed(1) || "0.0"}
                </div>

                <Link
                    href={`/movie-detail/${movie.id}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
                >
                    <span className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-orange-400">
                        View Details
                    </span>
                </Link>

                <MovieCardButtons movie={movie} />
            </div>

            <div className="px-3 py-2">
                <h2 className="line-clamp-1 text-sm font-semibold text-white">{title}</h2>
                <span className="text-xs text-neutral-400">{year}</span>
            </div>
        </div>
    )
}

export default MovieCard
