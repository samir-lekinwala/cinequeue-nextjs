import React, { useEffect, useState } from 'react'
import { getData } from '../api/apiCalls'
import Carousel from './Carousel'
import GlideSlider from './GlideSlider'
import OwlTest from './OwlTest'

function MoviesCarousel() {
  const [moviesContent, setMoviesContent] = useState([])

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
      { type: 'In Cinemas Now', data: inCinemas },
      { type: 'Popular', data: popular },
      { type: 'Less than 90 Minutes', data: lessThan90MinuteRuntime },
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
    <div className="text-green-500 w-full">
      {/* Checks if moviesContent exists/data has loaded */}
      {!moviesContent ? (
        <p>Movies loading...</p>
      ) : (
        moviesContent.map((type) => (
          <>
            <p className="text-center text-2xl font-poppins text-gray-400">
              {type.type}
            </p>
            <OwlTest key={type} content={type} />
            {/* <GlideSlider content={type} /> */}
            {/* <Carousel data={type} /> */}
          </>
        ))
      )}
    </div>
  )
}

export default MoviesCarousel
