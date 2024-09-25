import React from 'react'

function HeroSlide({ content, classes }) {
  // console.log('heroslide content', content)
  // console.log('title length test', content.title.length, content.title)

  return (
    <img
      className={classes}
      src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`}
      alt={`${content.original_title} backdrop image`}
    />
  )
}

export default HeroSlide
