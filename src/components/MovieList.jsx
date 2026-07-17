
'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {

    const [swiperRef, setSwiperRef] = useState(null);

    return (
        <section>
            {title && (
                <div className="mb-4 flex items-center gap-3">
                    <span className="h-5 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-lg font-bold tracking-tight text-base-content md:text-xl">
                        {title}
                    </h2>
                </div>
            )}
            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView="auto"
                slidesPerGroup={2}
                loop={false}
                centeredSlides={false}
                spaceBetween={12}
                breakpoints={{
                    640: { spaceBetween: 16 },
                    768: { spaceBetween: 20 },
                    1024: { spaceBetween: 30 },
                }}
                navigation={true}
                speed={2000}
                modules={[Navigation]}
                className="mySwiper"
            >

                {movies?.map(movie => (
                    <SwiperSlide key={movie.id} className="!w-32 sm:!w-36 md:!w-44 lg:!w-48 !py-3">
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}


            </Swiper>

        </section>
    )
}

export default MovieList