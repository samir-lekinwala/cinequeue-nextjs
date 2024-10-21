import Link from 'next/link'
import React from 'react'

function SingleSearchItem({ data: item, type }) {
  let data = {}

  if (type == 'movie') {
    data.id = item.id
    data.title = item.title
    data.poster_path = item.poster_path
    data.vote_average = item.vote_average
    data.release_date = item.release_date
    data.overview = item.overview
  }
  return (
    <div className="w-full h-full p-2">
      {data.id ? (
        <Link href={`/${type}/${data.id}`}>
          <div className="flex items-center gap-2">
            <div className="">
              <img
                className="w-[150px]"
                src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
              />
            </div>
            <div className="flex flex-col w-2/3">
              <span className="font-semibold">{data.title}</span>
              <span>{data.release_date}</span>
              <div className="h-40 overflow-auto">
                <div className="text-gray-400">{data.overview}</div>
              </div>
            </div>
          </div>
        </Link>
      ) : null}
    </div>
  )
}

export default SingleSearchItem
