import {
  CalendarDaysIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/16/solid'
import RuntimeBreakdown from './RuntimeBreakdown'

import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

function RatingsYearAndRuntime({ content, runtime, type }) {
  if (type == 'movie') {
    content.first_air_date = content.release_date
  }

  //useState for runtime hours clicked
  const [runtimeClick, setRuntimeClick] = useState(false)
  const [ratingClick, setRatingClick] = useState(false)
  const [yearClick, setYearClick] = useState(false)

  //refs for click for more detail areas
  const showEpisodeInfoRef = useRef(null)
  const ratingInfoRef = useRef(null)
  const yearClickRef = useRef(null)

  useEffect(() => {
    if (ratingClick) {
      const handleOutsideClick = (e) => {
        if (
          ratingInfoRef.current &&
          !ratingInfoRef.current.contains(e.target)
        ) {
          setRatingClick(!ratingClick)
        }
      }
      //add event listener
      document.addEventListener('mousedown', handleOutsideClick)
      //clean up event listener
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [ratingClick, ratingInfoRef])

  useEffect(() => {
    if (yearClick) {
      const handleOutsideClick = (e) => {
        if (yearClickRef.current && !yearClickRef.current.contains(e.target)) {
          setYearClick(!yearClick)
        }
      }
      //add event listener
      document.addEventListener('mousedown', handleOutsideClick)
      //clean up event listener
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [yearClick, yearClickRef])

  //ref for runtime details

  return (
    <div>
      <span className="relative">
        <div className="flex gap-2">
          {/* release date */}
          <div
            onClick={() => setYearClick(!yearClick)}
            ref={yearClickRef}
            className="flex gap-[2px] items-center"
          >
            <CalendarDaysIcon className="w-4 h-4" />
            {content.first_air_date ? content.first_air_date.slice(0, 4) : null}
          </div>
          {yearClick ? (
            <div
              onClick={() => setYearClick(false)}
              className=" absolute top-5  backdrop-blur-md border bg-black bg-opacity-30 border-black shadow-2xl w-fit text-nowrap rounded-lg p-4 translate-x-[-60px]"
            >
              <div className="flex flex-col items-end">
                <p>Release date: {content.first_air_date}</p>
                {content.last_air_date ? (
                  <p>Last air date: {content.last_air_date}</p>
                ) : null}
              </div>
            </div>
          ) : null}
          <span
            onClick={() => setRatingClick(!ratingClick)}
            ref={ratingInfoRef}
            className="flex gap-[2px] items-center relative"
          >
            <StarIcon className="text-yellow-500 w-4 h-4" />{' '}
            {content.vote_count < 5 ? (
              <>Not enough ratings</>
            ) : (
              content.vote_average
            )}
          </span>
          {ratingClick ? (
            <div
              onClick={() => setRatingClick(false)}
              className=" absolute top-5  backdrop-blur-md border bg-black bg-opacity-30 border-black shadow-2xl w-fit text-nowrap rounded-lg p-4 translate-x-[-60px]"
            >
              <div className="flex flex-col items-center">
                <p>Total number of votes: {content.vote_count}</p>
              </div>
            </div>
          ) : null}

          <span
            onClick={() => setRuntimeClick(!runtimeClick)}
            ref={showEpisodeInfoRef}
            className="flex items-center gap-[2px] animate-gradient-animation-text text-transparent cursor-pointer"
          >
            <ClockIcon className="text-white w-4 h-4" />
            {runtime <= 0 ? (
              'No recorded runtime'
            ) : (
              <p>
                {runtime ? (
                  type == 'tv' ? (
                    <> {runtime} hours</>
                  ) : (
                    <>{runtime} minutes</>
                  )
                ) : (
                  '...loading'
                )}
              </p>
            )}
          </span>
        </div>
        <div>
          {runtimeClick && type == 'tv' ? (
            <RuntimeBreakdown
              content={content}
              showEpisodeInfoRef={showEpisodeInfoRef}
              runtimeClick={runtimeClick}
              setRuntimeClick={setRuntimeClick}
            />
          ) : null}
        </div>
        {content.next_episode_to_air ? (
          <div className="">
            Next episode airing: {content.next_episode_to_air.air_date}
          </div>
        ) : null}
      </span>
    </div>
  )
}

export default RatingsYearAndRuntime
