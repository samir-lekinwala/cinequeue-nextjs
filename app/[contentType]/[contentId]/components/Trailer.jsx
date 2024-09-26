import React from 'react'

function Trailer({ trailerLink, classes }) {
  return (
    <div id="trailer">
      {' '}
      <iframe
        title=" "
        id="player"
        className={classes}
        frameBorder="0"
        allowFullScreen
        src={`https://www.youtube.com/embed/${trailerLink}?&controls=0&enablejsapi=1&origin=http://example.com`}
      ></iframe>
    </div>
  )
}

export default Trailer
