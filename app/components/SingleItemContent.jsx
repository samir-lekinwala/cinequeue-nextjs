/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { useState } from 'react'
import AddToLists from '../[contentType]/[contentId]/components/AddToLists'

function SingleItemContent({ content, classes, type, actorsPage, carousel }) {
  const [hoverState, setHoverState] = useState(false)
  const [charactersClick, setCharactersClick] = useState(false)

  function hoverStateChangeTrue() {
    setHoverState(!hoverState)
  }
  function hoverStateChangeFalse() {
    setHoverState(false)
  }

  function getYearOfContent(item) {
    const year = item.split('').splice(0, 4).join('')
    return year
  }

  return (
    <div
      // oncl={hoverStateChangeFalse}
      className={`flex flex-col ${
        carousel ? 'w-[200px] h-auto' : 'w-[200px]'
      } ${classes} overflow-hidden`}
    >
      {hoverState ? (
        <div
          className={`${
            carousel ? 'w-[200px] h-auto' : 'w-[200px] h-[300px]'
          } overflow-y-auto overflow-x-hidden absolute opacity-100 z-10 text-gray-400`}
        >
          <div className="w-full">
            <Link href={`/${type}/${content.id}`}>
              <button className="animate-gradient-animation-expand rounded-lg h-[1.5rem] absolute duration-500 bg-opacity-10 text-white right-0 left-0 top-0 hover:font-normal ease-in-out">
                View More
              </button>
            </Link>
          </div>
          <p
            onClick={hoverStateChangeFalse}
            className="pt-10 h-[300px] overflow-auto"
          >
            {content.overview}
          </p>
          {/* <div className="z-80"> */}
          {/* <AddToLists type={type} content={content} /> */}
          {/* </div> */}
        </div>
      ) : null}
      <div
        className={`${
          hoverState
            ? 'opacity-10 transition-all duration-200 scale-x-125 ease-in-out'
            : 'transition-all duration-500 scale-100 ease-in-out'
        } `}
      >
        {actorsPage ? (
          <span
            onClick={() => setCharactersClick(!charactersClick)}
            className={`text-white object-contain w-[200px] ${
              charactersClick ? 'line-clamp-none' : 'line-clamp-1'
            } `}
          >
            {content.character ? content.character : 'No Character Name Found'}
          </span>
        ) : null}

        {content.poster_path ? (
          <img
            onClick={hoverStateChangeTrue}
            className={`${
              carousel ? 'w-[200px] h-auto' : 'w-[200px] h-[300px]'
            }object-cover`}
            src={`https://image.tmdb.org/t/p/w${carousel ? '300' : '300'}/${
              content.poster_path
            }
              `}
            alt={`${content.title} poster`}
          />
        ) : (
          <div
            onClick={hoverStateChangeTrue}
            className="w-[200px] h-[300px] bg-gray-400 bg-opacity-50 flex justify-center items-center text-white"
          >
            <span>No Poster Available</span>
          </div>
        )}
      </div>
      <div key={content.id}>
        <p className=" text-center font-poppins text-gray-400">
          <Link href={`/${type}/${content.id}`}>
            {type == 'movie' ? content.title : content.name}
          </Link>
        </p>
        <p className=" text-center font-poppins text-gray-400 text-sm">
          {type == 'movie' ? content.release_date : content.first_air_date}
        </p>
        <p className=" text-center font-poppins text-gray-400 text-sm">
          ⭐{content.vote_average}
        </p>
      </div>
    </div>
  )
}

export default SingleItemContent
