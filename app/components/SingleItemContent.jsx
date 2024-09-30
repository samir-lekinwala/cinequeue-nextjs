/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { useState } from 'react'

function SingleItemContent({ content, classes, type }) {
  const [hoverState, setHoverState] = useState(false)

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
      onClick={hoverStateChangeTrue}
      // oncl={hoverStateChangeFalse}
      className={`flex flex-col w-[200px] ${classes} overflow-hidden`}
    >
      {hoverState ? (
        <div className="w-[200px] h-[300px] overflow-y-auto overflow-x-hidden absolute opacity-100 z-10 text-gray-400">
          <div className="w-full">
            <Link href={`/${type}/${content.id}`}>
              <button className="animate-gradient-animation-expand rounded-lg h-[1.5rem] duration-500 bg-opacity-10 text-white fixed right-0 left-0 top-0 hover:scale-105 hover:font-normal ease-in-out">
                View More
              </button>
            </Link>
          </div>
          <p className="pt-[1.5rem]">{content.overview}</p>
        </div>
      ) : null}
      <div
        className={`${
          hoverState
            ? 'opacity-10 transition-all duration-500 scale-125 ease-in-out'
            : 'transition-all duration-500 scale-100 ease-in-out'
        } `}
      >
        <img
          className={``}
          src={`https://image.tmdb.org/t/p/w300/${content.poster_path}
                `}
          alt={`${content.title} poster`}
        />
      </div>
      <div key={content.id}>
        <p className=" text-center font-poppins text-gray-400">
          <Link href={`/${type}/${content.id}`}>{content.title}</Link>
        </p>
        <p className=" text-center font-poppins text-gray-400 text-sm">
          {content.release_date}
        </p>
        <p className=" text-center font-poppins text-gray-400 text-sm">
          ⭐{content.vote_average}
        </p>
      </div>
    </div>
  )
}

export default SingleItemContent
