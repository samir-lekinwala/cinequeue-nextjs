import { ClockIcon, StarIcon } from '@heroicons/react/16/solid'
import RuntimeBreakdown from './RuntimeBreakdown'

import React, { useRef, useState } from 'react'

function RatingsAndRuntime({ content, runtime }) {
  //useState for runtime hours clicked
  const [runtimeClick, setRuntimeClick] = useState(false)

  //ref for runtime details
  const showEpisodeInfoRef = useRef(null)

  return (
    <div>
      {' '}
      <span className="relative">
        <div className="flex gap-2">
          <span className="flex gap-[2px] items-center">
            <StarIcon className="text-yellow-500 w-4 h-4" />{' '}
            {content.vote_average}
          </span>
          <span
            onClick={() => setRuntimeClick(!runtimeClick)}
            ref={showEpisodeInfoRef}
            className="flex items-center gap-[2px] animate-gradient-animation-text text-transparent cursor-pointer"
          >
            <ClockIcon className="text-white w-4 h-4" />
            {runtime < 0 ? 'No recorded runtime' : <p>{runtime} hours</p>}
          </span>
        </div>
        {runtimeClick ? (
          <RuntimeBreakdown
            content={content}
            showEpisodeInfoRef={showEpisodeInfoRef}
            runtimeClick={runtimeClick}
            setRuntimeClick={setRuntimeClick}
          />
        ) : null}
      </span>
    </div>
  )
}

export default RatingsAndRuntime
