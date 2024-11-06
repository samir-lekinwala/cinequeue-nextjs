import React from 'react'
import { getAverageRuntimeFromSeason1 } from '../functions/tvShowRuntime'

function RuntimeBreakdown({ content, showEpisodeInfoRef }) {
  return (
    <div
      // ref={showEpisodeInfoRef}
      className=" absolute  backdrop-blur-md border bg-black bg-opacity-30 border-black shadow-2xl w-fit text-nowrap rounded-lg p-4 translate-x-[-60px]"
    >
      <div className="flex flex-col items-center">
        <p>Total number of episodes: {content.number_of_episodes}</p>
        <p>Seasons: {content.number_of_seasons}</p>
        <p>
          Episode average runtime:{' '}
          {getAverageRuntimeFromSeason1(content['season/1'])} minutes
        </p>
      </div>
    </div>
  )
}

export default RuntimeBreakdown
