import React from 'react'
import { auth } from '../../../firebaseConfig'
// import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import signInWithGoogle from '../../../functions/signInWithGoogle'

function AddToLists({ type, content }) {
  const movieOrTvShow = type

  const [user] = useAuthState(auth)

  console.log('user add to list component', user)

  const toDatabase = {
    type: movieOrTvShow,
    contentId: content.id,
    runtime: content.runtime,
  }

  console.log('addto list component', toDatabase)
  return (
    <div className="flex justify-between items-end text-base">
      {user ? (
        <>
          <div>
            <button className="">Add to Watch List</button>
          </div>
          <div>
            <button>Add to Seen List</button>
          </div>{' '}
        </>
      ) : (
        <div className="w-full bg-white bg-opacity-10 flex px-2 rounded-xl justify-center">
          <button
            onClick={signInWithGoogle}
            className="opacity-100 text-white z-10"
          >
            Sign in to add content to your Watch and Seen Lists
          </button>
        </div>
      )}
    </div>
  )
}

export default AddToLists
