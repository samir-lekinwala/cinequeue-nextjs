import React, { useEffect, useState } from 'react'
import { getData } from '../api/apiCalls'
import Carousel from './Carousel'
// import OwlCarousel from './OwlCarousel'
import dynamic from 'next/dynamic'
import { FallingLines } from 'react-loader-spinner'

function TVCarousel() {
  const [tvContent, setTvContent] = useState([])
  const OwlCarousel = dynamic(() => import('./OwlCarousel'), { ssr: false })

  // const movieCarouselContent = [
  //   {
  //     type: 'Top Rated',
  //     content: getData('movie/now_playing?language=en-US&page=1'),
  //   },
  // ]

  async function getTvContentData() {
    const highlyRated = await getData(
      'discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_average.desc&vote_average.gte=8&vote_count.gte=1000&with_original_language=en'
    )
    // setMoviesContent(inCinemas.results)
    const popular = await getData(
      'discover/tv?first_air_date_year=2024&include_adult=false&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&vote_count.gte=40'
    )
    // setMoviesContent(popular.results)

    const topComedy = await getData(
      'discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc&vote_count.gte=1000&with_genres=35&with_original_language=en'
    )

    const dataCollection = [
      { contentType: 'tv', type: 'New and Popular', data: popular },
      { contentType: 'tv', type: 'Highly Rated Shows', data: highlyRated },
      {
        contentType: 'tv',
        type: 'Top Rated Comedies',
        data: topComedy,
      },
    ]
    setTvContent(dataCollection)

    // const inCinemas = await getData('movie/now_playing?language=en-US&page=1')
    // setMoviesContent(inCinemas.results)
  }

  useEffect(() => {
    getTvContentData()
  }, [])

  console.log('tv content test', tvContent)
  return (
    <div className="w-full">
      {/* Checks if moviesContent exists/data has loaded */}
      {!tvContent
        ? null
        : tvContent.map((carouselContent) => (
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

export default TVCarousel
