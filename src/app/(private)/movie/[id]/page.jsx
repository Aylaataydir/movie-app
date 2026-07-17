
import { FaCalendarAlt, FaStar } from "react-icons/fa"
import { getMovieDetails, getMovieVideos } from "@/services/movieApi"


const MovieDetails = async ({ params }) => {

  const { id } = await params


  const movie = await getMovieDetails(id)
  const videos = await getMovieVideos(id)
  const trailer = videos.find(v => v.type === "Trailer") || videos[0]


  return (
    <div className='space-y-8 mt-8 w-full max-w-4xl mx-auto px-4 sm:mt-12 sm:space-y-10 md:px-6 lg:w-3/4 lg:px-0'>
      <div className='flex flex-col gap-6 border-b border-base-content/20 pb-8 md:flex-row'>
        <img
          className='w-full max-w-xs mx-auto rounded-lg md:mx-0 md:w-100 md:shrink-0'
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div>
          <h3 className='font-bold mb-3 text-xl text-orange-400'>{movie.title}</h3>
          <div className='mb-4 flex flex-wrap items-center gap-2 text-sm text-base-content/70'>
            <span className='flex items-center gap-1 rounded-full bg-base-content/5 px-2.5 py-1 ring-1 ring-base-content/10'>
              <FaCalendarAlt className='h-3 w-3 text-base-content/50' />
              {movie.release_date ? new Date(movie.release_date).getFullYear() : "—"}
            </span>
            <span className='flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 font-semibold text-white'>
              <FaStar className='h-3 w-3 text-orange-400' />
              {movie.vote_average?.toFixed(1) || "0.0"}
            </span>
            {movie.genres?.map(genre => (
              <span
                key={genre.id}
                className='rounded-full bg-base-content/5 px-2.5 py-1 ring-1 ring-base-content/10'
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p>{movie.overview}</p>
        </div>
      </div>

      {trailer && (
        <div className='text-center my-6 sm:my-10'>
          <div className='w-full md:w-3/4 mx-auto'>
            <iframe
              className='w-full aspect-video rounded-xl shadow-2xl'
              src={`https://www.youtube.com/embed/${trailer.key}`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetails