import React, { useEffect, useRef, useState } from 'react'
import AddToLists from '../components/AddToLists'
import RuntimeBreakdown from '../../../components/RuntimeBreakdown'
import { FallingLines } from 'react-loader-spinner'
import {
  // getAverageRuntimeFromSeason1,
  getTotalEpisodesRuntime,
} from '../../../functions/tvShowRuntime'
import { ClockIcon, StarIcon } from '@heroicons/react/24/solid'

function PosterSection({ content, type }) {
  //useState for runtime hours clicked
  const [runtimeClick, setRuntimeClick] = useState(false)

  //ref for runtime details
  const showEpisodeInfoRef = useRef(null)

  return (
    <>
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
                    <span
                      className="relative"
                      onClick={() => setRuntimeClick(!runtimeClick)}
                      ref={showEpisodeInfoRef}
                    >
                      <div className="flex gap-2">
                        <span className="flex gap-1 items-center">
                          <StarIcon className="text-yellow-500 w-4 h-4" />{' '}
                          {content.vote_average}
                        </span>
                        <span className="flex items-center gap-1 animate-gradient-animation-text text-transparent cursor-pointer">
                          <ClockIcon className="text-white w-4 h-4" />
                          {getTotalEpisodesRuntime(content, type)} hours
                        </span>
                      </div>
                      {runtimeClick ? (
                        <RuntimeBreakdown
                          content={content}
                          showEpisodeInfoRef={showEpisodeInfoRef}
                          runtimeClick={runtimeClick}
                          setRuntimeClick={setRuntimeClick}
                        />
                      ) : null}
                    </span>
                  </>
                )}
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
