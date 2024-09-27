/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Timestamp, toDate } from 'firebase/firestore'
import Link from 'next/link'

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

  const date = new Timestamp(
    content.createdAt.seconds,
    content.createdAt.nanoseconds
  )
    .toDate()
    .toDateString()
  // console.log('date', date.toDateString())

  // const dates = content.createdAt.Timestamp.fromDate(new Date())
  // const date = dates.toDate()

  return (
    <div
      onMouseEnter={hoverStateChangeTrue}
      onMouseLeave={hoverStateChangeFalse}
      className={`flex flex-col w-[100px] sm:w-[200px] ${classes} overflow-hidden `}
    >
      {hoverState ? (
        <Link href={`/${content.type}/${content.contentId}`}>
          <div className="w-[100px] sm:w-[200px] h-[150px] sm:h-[300px] p-2 overflow-y-auto overflow-x-hidden absolute opacity-100 z-10 text-gray-400">
            {content.overview}
          </div>
        </Link>
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
      <div className="z-20">
        {/* <Link href={`/${content.type}/${content.contentId}`}> */}
        <p className=" text-center font-poppins text-gray-400">
          {content.title}
        </p>
        {/* </Link> */}
        <p className=" text-center font-poppins text-gray-400 text-sm">
          {getYearOfContent(content.release_date)}
        </p>
        <p className=" text-center font-poppins text-gray-400 text-sm">
          Added on {date}
        </p>
        <p className=" text-center font-poppins text-gray-400 text-sm">
          {content.runtime} Minutes
        </p>
      </div>
    </div>
  )
}

export default SingleItemContent
