'use client'
import React, { useEffect, useState } from 'react'
import { getData } from '../../../api/apiCalls'
import Trailer from './Trailer'
import PosterSection from './PosterSection'
import ActorsSection from './ActorsSection'
import HeroSlide from '../../../components/HeroSlide'

function ContentPage({ type, contentId }) {
  const [data, setData] = useState()
  const [videosKey, setVideosKey] = useState()
  const [credits, setCredits] = useState()

  useEffect(() => {
    getContentData()
  }, [])
  // console.log(type, contentId, 'test2')

  function getTrailer(array) {
    const result = array.find((element) => element.type == 'Trailer')
    // console.log('gettrailer', result)
    return result.key
  }

  async function getContentData() {
    const result = await getData(`${type}/${contentId}`)
    const videoResult = await getData(`${type}/${contentId}/videos`)
    const creditResults = await getData(`${type}/${contentId}/credits`)

    setData(result)
    setVideosKey(getTrailer(videoResult.results))
    console.log(creditResults)
    setCredits(creditResults.cast)
  }

  // console.log(data?.backdrop_path)
  console.log('credits', credits?.cast)

  return (
    <>
      {data ? (
        <div className={`flex flex-col justify-center relative gap-4`}>
          <HeroSlide
            content={data}
            classes={
              'object-cover h-[calc(100vh+1px)] w-full items-center bg-gradient-to-b to-black'
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black from-0% "></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black from-0% "></div>
          <div className={` absolute inset-0 w-full `}>
            <div className="">
              <div className="flex justify-center">
                <div className=" w-full md:top-4 relative">
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black from-0% "></div> */}
                  <Trailer
                    trailerLink={videosKey}
                    classes={'h-[70vh] w-full'}
                  />
                </div>
              </div>
              <div className="text-white w-full relative top-10">
                <PosterSection content={data} />

                <ActorsSection actors={credits} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ContentPage
