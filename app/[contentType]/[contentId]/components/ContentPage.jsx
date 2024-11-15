'use client'
import React, { useEffect, useState } from 'react'
import { getData } from '../../../api/apiCalls'
import Trailer from './Trailer'
import PosterSection from './PosterSection'
import ActorsSection from './ActorsSection'
import HeroSlide from '../../../components/HeroSlide'
import { Audio, FallingLines } from 'react-loader-spinner'
import useDocumentTitle from '../../../hooks/useDocumentTitle'

function ContentPage({ type, contentId }) {
  const [data, setData] = useState()
  const [videosKey, setVideosKey] = useState()
  const [credits, setCredits] = useState()
  const [trailerButtonClick, setTrailerButtonClick] = useState(false)

  useDocumentTitle(
    `${!data ? 'CineQueue' : data.title || data.name + ' - CineQueue'}`
  )

  useEffect(() => {
    async function getContentData() {
      if (type == 'movie') {
        const result = await getData(`${type}/${contentId}`)
        setData(result)
      } else if (type == 'tv') {
        const result = await getData(
          `${type}/${contentId}?append_to_response=season%2F1`
        )
        setData(result)
      }

      // '?append_to_response=season%2F1'
      const videoResult = await getData(`${type}/${contentId}/videos`)
      const creditResults = await getData(`${type}/${contentId}/credits`)

      setVideosKey(getTrailer(videoResult.results))
      setCredits(creditResults.cast)
    }

    getContentData()
  }, [contentId, type]) // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(type, contentId, 'test2')

  function getTrailer(array) {
    const result = array.find((element) => element.type == 'Trailer')

    if (!result) {
      const secondOption = array.find((element) => element.type == 'Featurette')
      if (!secondOption) {
        const thirdOption = array[0].key
        return thirdOption
      } else return secondOption.key
    } else return result.key
  }

  // console.log(data?.backdrop_path)
  // console.log('credits', credits?.cast)
  console.log('credits', credits)

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
                <div className=" w-full md:top-4 relative hidden md:visible">
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black from-0% "></div> */}

                  <Trailer
                    trailerLink={videosKey}
                    classes={'h-[70vh] w-full'}
                  />
                </div>
              </div>
              <div className="text-white w-full relative top-10 ">
                <PosterSection
                  type={type}
                  content={data}
                  trailerButtonClick={trailerButtonClick}
                  setTrailerButtonClick={setTrailerButtonClick}
                />
                {trailerButtonClick ? (
                  <div id="trailer-iframe" className="my-10">
                    <Trailer
                      trailerLink={videosKey}
                      classes={'aspect-video w-full'}
                    />
                  </div>
                ) : null}

                <ActorsSection actors={credits} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <FallingLines color="#ff7e5f" />
        </div>
      )}
    </>
  )
}

export default ContentPage
