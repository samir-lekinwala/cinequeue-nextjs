'use client'
import React, { useEffect, useState } from 'react'
import PostersSection from './PostersSection'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'

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
    <div>
      <PostersSection data={data} />
    </div>
  )
}

export default WatchlistPage
