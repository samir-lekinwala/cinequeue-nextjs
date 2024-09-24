/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

function SingleItemContent({ content, classes }) {
  const [hoverState, setHoverState] = useState(false)

  function hoverStateChangeTrue() {
    setHoverState(true)
    console.log('hover state true', hoverState)
  }
  function hoverStateChangeFalse() {
    setHoverState(false)
    console.log('hover state false', hoverState)
  }

  function getYearOfContent(item) {
    const year = item.split('').splice(0, 4).join('')
    return year
  }

  return (
    <div
      className={`flex flex-col w-[200px] ${classes} overflow-hidden`}
      onMouseEnter={hoverStateChangeTrue}
      onMouseLeave={hoverStateChangeFalse}
    >
      {hoverState ? (
        <div className="w-[200px] h-[300px] p-2 overflow-y-auto overflow-x-hidden absolute opacity-100 z-10 text-gray-400">
          {content.overview}
        </div>
      ) : null}
      <div
        className={`${
          hoverState
            ? 'opacity-10 transition-all duration-500 scale-125 '
            : null
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
          {content.title}
        </p>
        <p className=" text-center font-poppins text-gray-400 text-sm">
          {getYearOfContent(content.release_date)}
        </p>
        <p className=" text-center font-poppins text-gray-400 text-sm">
          ⭐{content.vote_average}
        </p>
      </div>
    </div>
  )
}

export default SingleItemContent
