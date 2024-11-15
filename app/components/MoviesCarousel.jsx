import React, { useEffect, useState } from 'react'
import { getData } from '../api/apiCalls'
import Carousel from './Carousel'
// import OwlCarousel from './OwlCarousel'
import dynamic from 'next/dynamic'

function MoviesCarousel() {
  const [moviesContent, setMoviesContent] = useState([])
  const OwlCarousel = dynamic(() => import('./OwlCarousel'), { ssr: false })

  // const movieCarouselContent = [
  //   {
  //     type: 'Top Rated',
  //     content: getData('movie/now_playing?language=en-US&page=1'),
  //   },
  // ]

  async function getMoviesContentData() {
    const inCinemas = await getData('movie/now_playing?language=en-US&page=1')
    // setMoviesContent(inCinemas.results)
    const popular = await getData('movie/popular?language=en-US&page=1')
    // setMoviesContent(popular.results)

    const lessThan90MinuteRuntime = await getData(
      'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_runtime.lte=90'
    )

    const dataCollection = [
      { contentType: 'movie', type: 'In Cinemas Now', data: inCinemas },
      { contentType: 'movie', type: 'Popular', data: popular },
      {
        contentType: 'movie',
        type: 'Less than 90 Minutes',
        data: lessThan90MinuteRuntime,
      },
    ]
    setMoviesContent(dataCollection)

    // const inCinemas = await getData('movie/now_playing?language=en-US&page=1')
    // setMoviesContent(inCinemas.results)
  }

  useEffect(() => {
    getMoviesContentData()
  }, [])

  console.log('movies content test', moviesContent)
  return (
    <div className="w-full">
      {/* Checks if moviesContent exists/data has loaded */}
      {!moviesContent
        ? null
        : moviesContent.map((carouselContent) => (
            // console.log('type from before owlcarousel map', carouselContent),
            <>
              {/* <p className="text-center text-2xl font-poppins text-gray-400 relative z-50">
              {carouselContent.type}
            </p> */}
              <OwlCarousel
                key={carouselContent}
                content={carouselContent}
                type={carouselContent.contentType}
              />
            </>
          ))}
    </div>
  )
}

export default MoviesCarousel
