'use client'
import React, { useEffect, useState } from 'react'
import PostersSection from './PostersSection'
import TotalWatchListTime from './TotalWatchListTime'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FallingLines } from 'react-loader-spinner'

function WatchlistPage() {
  const [data, setData] = useState()

  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      // Perform Firestore query only when the user is authenticated
      const fetchData = async () => {
        const watchlistRef = collection(db, 'watchlist')
        const q = query(watchlistRef, where('userUid', '==', user.uid))
        const snapshot = await getDocs(q)

        const tempData = []

        snapshot.forEach((doc) => {
          tempData.push({ id: doc.data(), ...doc.data() })
        })

        setData(tempData)
      }

      fetchData()
    }
  }, [user])

  return (
    <>
      {!data ? (
        <div className="flex justify-center items-center">
          <FallingLines color="#ff7e5f" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="">
            <TotalWatchListTime data={data} />
          </div>
          <PostersSection data={data} />
        </div>
      )}
    </>
  )
}

export default WatchlistPage
