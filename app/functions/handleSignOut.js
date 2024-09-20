import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()
function handleSignOut() {
  signOut(auth)
    .then(() => {
      console.log('sign out successful')
      // Sign-out successful.
    })
    .catch((error) => {
      console.error(error)
      // An error happened.
    })
}

export default handleSignOut
