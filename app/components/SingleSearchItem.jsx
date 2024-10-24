import Link from 'next/link'
import React from 'react'

function SingleSearchItem({ data: item, type }) {
  let data = {
    id: item.id,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    overview: item.overview,
  }

  if (type == 'movie') {
    data.title = item.title
    data.release_date = item.release_date
    data.type = 'Movie'
  } else if (type == 'tv') {
    data.title = item.name
    data.release_date = item.first_air_date
    data.type = 'TV Show'
  }
  return (
    <div className="w-full h-full p-2">
      {data.id ? (
        <Link href={`/${type}/${data.id}`}>
          <div className="flex items-center gap-2">
            {data.poster_path ? (
              <img
                className="w-[150px]"
                src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
              />
            ) : (
              <div className=" flex flex-col ">
                <span className="w-[150px] h-[225px] bg-gray-400 flex justify-center items-center">
                  No Poster Available
                </span>
              </div>
            )}

            <div className="flex flex-col justify-center">
              <span className="font-semibold">{data.title}</span>
              <span className="text-xs">⭐{data.vote_average}</span>
              <span className="text-xs text-gray-400">{data.type}</span>
              <span className="text-xs ">{data.release_date}</span>
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
