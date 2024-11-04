import React, { useEffect, useRef, useState } from 'react'
import AddToLists from '../components/AddToLists'
import { FallingLines } from 'react-loader-spinner'
import {
  getAverageRuntimeFromSeason1,
  getTotalEpisodesRuntime,
} from '../../../functions/tvShowRuntime'

function PosterSection({ content, type }) {
  const [runtimeClick, setRuntimeClick] = useState(false)

  const showEpisodeInfoRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showEpisodeInfoRef.current &&
        !showEpisodeInfoRef.current.contains(e.target)
      ) {
        setRuntimeClick(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showEpisodeInfoRef])

  const handleRuntimeClick = () => {
    setRuntimeClick(!runtimeClick)
  }
  console.log(content)
  return (
    <>
      {' '}
      {!content ? (
        <div className="flex justify-center items-center">
          <FallingLines color="#ff7e5f" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:w-1/2 w-full items-center justify-center gap-6 mx-auto pb-4">
          <img
            className="w-[300px]"
            alt={`${type == 'movie' ? content.title : content.name} poster`}
            src={`https://image.tmdb.org/t/p/w300/${content.poster_path}
    `}
          ></img>
          <div className="shrink px-2 relative flex flex-col justify-center items-center max-w-[450px] md:min-w-96 md:h-[450px]">
            <div
              className={`md:h-[368px] z-40 text-center sm:text-pretty ${
                type == 'movie'
                  ? content.title.length > 20
                    ? 'text-xl sm:text-2xl'
                    : 'text-2xl sm:text-3xl md:text-4xl'
                  : content.name.length > 20
                  ? 'text-lg sm:text-xl'
                  : content.name.length > 30
                  ? 'text-base sm:text-xl'
                  : 'text-2xl sm:text-3xl md:text-4xl'
              } `}
            >
              {/* If original language is not english 'title' in api call is used as opposed to original title */}
              {type == 'movie' ? content.title : content.name}
              <div className="text-sm pb-2 text-zinc-400 mx-auto w-fit relative">
                {/* If slide is in view then it displays the run time - done to reduce api calls per second */}
                {type == 'movie' ? (
                  <>{content.runtime} minutes</>
                ) : (
                  <>
                    <span className="relative" onClick={handleRuntimeClick}>
                      <span className="animate-gradient-animation-text text-transparent cursor-pointer">
                        {getTotalEpisodesRuntime(content, type)} hours
                      </span>
                      {runtimeClick ? (
                        <div
                          ref={showEpisodeInfoRef}
                          className=" absolute  backdrop-blur-md border bg-black bg-opacity-30 border-black shadow-2xl w-fit text-nowrap rounded-lg p-4 translate-x-[-60px]"
                        >
                          <div className="flex flex-col items-center">
                            <p>
                              Total number of episodes:{' '}
                              {content.number_of_episodes}
                            </p>
                            <p>Seasons: {content.number_of_seasons}</p>
                            <p>
                              Episode average runtime:{' '}
                              {getAverageRuntimeFromSeason1(
                                content['season/1']
                              )}{' '}
                              minutes
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </span>
                  </>
                )}{' '}
                ⭐ {content.vote_average}
              </div>
              <div className=" text-base text-pretty text-ellipsis overflow-auto min-h-0">
                {/* Cuts off the overview if it exceeds 40 words and adds read more onto the end */}
                {/* {reduceOverviewSize(item.overview)} */}
                {content.overview}
              </div>
            </div>
            <AddToLists
              type={type}
              content={content}
              contentRuntime={getTotalEpisodesRuntime(content, type) * 60}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PosterSection
