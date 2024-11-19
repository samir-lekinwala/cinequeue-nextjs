import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebaseConfig'
// import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import signInWithGoogle from '../../../functions/signInWithGoogle'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'

function AddToLists({ type, content, contentRuntime }) {
  // console.log('contentruntime', contentRuntime, 'content', content)

  const [watchListed, setWatchListed] = useState()
  const [user, loading, error] = useAuthState(auth)
  // console.log(user)

  const [seenListed, setSeenListed] = useState()

  const movieOrTvShow = type
  // console.log(content)

  function checkRuntime() {
    if (content.runtime == undefined) {
      return contentRuntime
    } else return content.runtime
  }

  function getReleaseDate() {
    if (type == 'movie') {
      return content.release_date
    } else return content.first_air_date
  }

  async function addToDb(buttonType) {
    const newListRef = collection(db, buttonType)
    console.log('todatabase variable', toDatabase)
    try {
      await addDoc(newListRef, toDatabase).then((docRef) => {
        console.log('added Id', docRef.id)
        if (buttonType == 'watchlist') {
          setWatchListed(docRef.id)
        } else if (buttonType == 'seenlist') {
          setSeenListed(docRef.id)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function removeFromWatchList() {
    try {
      if (watchListed) {
        const watchlistDocRef = doc(db, 'watchlist', watchListed) // Reference the document by its ID
        await deleteDoc(watchlistDocRef) // Use deleteDoc to remove it
        setWatchListed() // Clear state after deletion
        console.log('Document successfully deleted!')
      } else {
        console.log('No watchListed document ID available')
      }
    } catch (error) {
      console.log('Error removing document: ', error)
    }
  }
  async function removeFromSeenList() {
    try {
      if (seenListed) {
        const seenlistDocRef = doc(db, 'seenlist', seenListed) // Reference the document by its ID
        await deleteDoc(seenlistDocRef) // Use deleteDoc to remove it
        setSeenListed() // Clear state after deletion
        console.log('Document successfully deleted!')
      } else {
        console.log('No seenListed document ID available')
      }
    } catch (error) {
      console.log('Error removing document: ', error)
    }
  }

  function checkData(docId, watchOrSeen) {
    if (watchOrSeen == 'watchlist') {
      setWatchListed(docId)
    } else if (watchOrSeen == 'seenlist') {
      setSeenListed(docId)
    }
  }

  useEffect(() => {
    if (user) {
      // Perform Firestore query only when the user is authenticated
      const fetchData = async () => {
        const watchlistRef = collection(db, 'watchlist')
        const q = query(
          watchlistRef,
          where('userUid', '==', user.uid),
          where('contentId', '==', content.id)
        )
        const snapshot = await getDocs(q)

        snapshot.forEach((doc) => {
          checkData(doc.id, 'watchlist')
        })
      }

      fetchData()
    }
  }, [user, content.id])

  useEffect(() => {
    if (user) {
      // Perform Firestore query only when the user is authenticated
      const fetchData = async () => {
        const seenlistRef = collection(db, 'seenlist')
        const q = query(
          seenlistRef,
          where('userUid', '==', user.uid),
          where('contentId', '==', content.id)
        )
        const snapshot = await getDocs(q)

        snapshot.forEach((doc) => {
          checkData(doc.id, 'seenlist')
        })
      }

      fetchData()
    }
  }, [user, content.id])

  function watchListButton() {
    addToDb('watchlist')
  }
  function seenListButton() {
    addToDb('seenlist')
  }

  const toDatabase = {
    createdAt: serverTimestamp(),
    userUid: user?.uid,
    type: movieOrTvShow,
    contentId: content.id,
    runtime: checkRuntime(),
    overview: content.overview,
    release_date: getReleaseDate(),
    title: type == 'movie' ? content.title : content.name,
    poster_path: content.poster_path,
  }

  // console.log('addto list component', toDatabase)
  return (
    <div className="flex items-end text-base py-4">
      {user ? (
        <>
          <div className="flex justify-between w-full items-center h-10 gap-4">
            <div
              className={`group w-fit hover:shadow-[0px_0px_20px_1px] ${
                watchListed ? ' hover:shadow-red-500' : ' hover:shadow-cyan-200'
              } p-2 transition-all duration-1000 bg-white bg-opacity-10 flex px-2 rounded-xl justify-center`}
            >
              {watchListed ? (
                <button
                  className="hover:text-red-500 w-full h-full relative transition-all duration-1000 text-center flex justify-center items-center"
                  onClick={removeFromWatchList}
                >
                  <span className="group-hover:opacity-0 group-hover:scale-90 transition-all duration-700 ease-in-out text-cyan-200">
                    Watch Listed
                  </span>
                  <span className="group-hover:opacity-100 opacity-0 absolute left-0 right-0 flex justify-center items-center scale-90 group-hover:scale-100 text-red-500">
                    X
                  </span>
                </button>
              ) : (
                <button onClick={watchListButton} className="">
                  Add to Watch List
                </button>
              )}
            </div>
            <div
              className={` w-fit group hover:shadow-[0px_0px_20px_1px] ${
                seenListed
                  ? ' hover:shadow-red-500'
                  : ' hover:shadow-light-green-300'
              } ease-in-out p-2 transition-all duration-1000 bg-white bg-opacity-10 flex px-2 rounded-xl justify-center`}
            >
              {seenListed ? (
                <button
                  className="hover:text-red-500 w-full h-full relative transition-all duration-1000 text-center flex justify-center items-center"
                  onClick={removeFromSeenList}
                >
                  <span className="group-hover:opacity-0 group-hover:scale-90 transition-all duration-700 ease-in-out text-light-green-300 ">
                    Seen Listed
                  </span>
                  <span className="group-hover:opacity-100 opacity-0 transition-all ease-in-out absolute left-0 right-0 flex justify-center items-center scale-90 group-hover:scale-100 text-red-500">
                    X
                  </span>
                </button>
              ) : (
                <button className="" onClick={seenListButton}>
                  Add to Seen List
                </button>
              )}
            </div>{' '}
          </div>
        </>
      ) : (
        <div className="w-full bg-white bg-opacity-10 flex px-2 rounded-xl justify-center">
          <button onClick={signInWithGoogle} className="opacity-100 text-white">
            Sign in to add content to your Watch and Seen Lists
          </button>
        </div>
      )}
    </div>
  )
}

export default AddToLists
