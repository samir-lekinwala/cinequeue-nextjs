import React, { useEffect } from 'react'
import { getAverageRuntimeFromSeason1 } from '../functions/tvShowRuntime'
import { lastEpisodeToAir } from '../functions/lastEpisodeToAir'

function RuntimeBreakdown({
  content,
  showEpisodeInfoRef,
  runtimeClick,
  setRuntimeClick,
}) {
  const lastEpisodeToAirData = lastEpisodeToAir(content)

  console.log('from poster section last episode', lastEpisodeToAirData)

  //useEffect that handles when outside of ref is clicked to close the runtime details
  useEffect(() => {
    if (runtimeClick) {
      const handleOutsideClick = (e) => {
        if (
          showEpisodeInfoRef.current &&
          !showEpisodeInfoRef.current.contains(e.target)
        ) {
          setRuntimeClick(!runtimeClick)
        }
      }
      //add event listener
      document.addEventListener('mousedown', handleOutsideClick)
      //clean up event listener
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [runtimeClick, showEpisodeInfoRef])

  return (
    <div className=" absolute  backdrop-blur-md border bg-black bg-opacity-30 border-black shadow-2xl w-fit text-nowrap rounded-lg p-4 translate-x-[-60px]">
      <div className="flex flex-col items-center">
        <p>Total number of episodes: {content.number_of_episodes}</p>
        {/* if the data shows number of episodes matches the nubmer of episodes aired then only total number of episodes will come up */}
        {content.number_of_episodes == lastEpisodeToAirData ? null : (
          <p>Episodes Aired: {lastEpisodeToAirData}</p>
        )}

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
