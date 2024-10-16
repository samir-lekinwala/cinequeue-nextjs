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
  }

  return (
    <div>
      {data.id ? (
        <Link href={`${type}/${data.id}`}>
          <div>
            <p className="text-white">
              <span className=" font-semibold">{data.title}</span>{' '}
              <img
                src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
              />
              <span>{data.release_date}</span>
            </p>
          </div>
        </Link>
      ) : null}
    </div>
  )
}

export default SingleSearchItem
