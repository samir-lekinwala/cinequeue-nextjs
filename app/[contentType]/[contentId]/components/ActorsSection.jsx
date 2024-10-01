/* eslint-disable @next/next/no-img-element */
import { set } from 'firebase/database'
import React, { useState } from 'react'
import { FallingLines } from 'react-loader-spinner'

function ActorsSection({ actors }) {
  const [moreCastButton, setMoreCastButton] = useState(false)
  console.log('actors', actors)

  function revealAllCast() {
    setMoreCastButton(true)
  }
  function hideExtraCast() {
    setMoreCastButton(false)
  }

  //based on mapped array and the index the number of actors get shown.
  // If view more button is not clicked only the first 10 get shown. Click more reveals the rest of the cast.
  //based on if the index is less than 10 or more.

  return (
    <div className="text-base flex flex-wrap gap-4 justify-center lg:max-w-[70vw] mx-auto transition-all delay-500">
      {!actors ? (
        <div className="flex justify-center items-center">
          <FallingLines color="#ff7e5f" />
        </div>
      ) : (
        actors.map((actor, index) => (
          <>
            <div
              className={`${
                index >= 10 && !moreCastButton
                  ? 'hidden'
                  : 'flex flex-col justify-center text-center items-center '
              }`}
              key={actor.id}
            >
              <p className="">{actor.name}</p>
              {actor.profile_path == null ? (
                <div className="w-40 h-40 border border-gray-400 rounded-full">
                  {' '}
                </div>
              ) : (
                <img
                  alt={actor.name}
                  className="w-40 h-40 rounded-full object-cover"
                  src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                ></img>
              )}

              <p className="text-gray-400 w-[180px] h-[3rem] overflow-auto">
                {actor.character}
              </p>
            </div>
            {index == 11 && !moreCastButton ? (
              (console.log('index over 11'),
              (
                <div className="group relative flex justify-center items-center">
                  <div className="w-40 h-40 border-deep-orange-800 ease-in transition-all duration-400 border rounded-full text-center content-center animate-gradient-animation">
                    <button
                      onClick={revealAllCast}
                      className="group-hover:scale-125 transition-all"
                    >
                      View more
                    </button>
                  </div>
                </div>
              ))
            ) : index == actors.length - 1 && moreCastButton ? (
              <div className="group relative flex justify-center items-center">
                <div className="w-40 h-40 border-deep-orange-800 ease-in transition-all duration-400 border rounded-full text-center content-center animate-gradient-animation-close">
                  <button
                    onClick={hideExtraCast}
                    className="group-hover:scale-125 transition-all"
                  >
                    View less
                  </button>
                </div>
              </div>
            ) : null}
          </>
        ))
      )}
    </div>
  )
}

export default ActorsSection
