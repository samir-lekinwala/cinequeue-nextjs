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
  const [runtimeType, setRuntimeType] = useState('minutes')

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
          <span className="text-transparent text-2xl font-poppins animate-gradient-animation-text">
            Watch List
          </span>
          <div className="">
            <TotalWatchListTime
              data={data}
              setRuntimeTypeMain={setRuntimeType}
            />
          </div>
          <PostersSection data={data} runtimeType={runtimeType} />
        </div>
      )}
    </>
  )
}

export default WatchlistPage
