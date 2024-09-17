import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
// import { auth } from '../firebaseConfig'

function SignOut() {
  const auth = getAuth()
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log('sign out successful')
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <div>
      <button className="border" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default SignOut
