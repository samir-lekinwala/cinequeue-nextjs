'use client'

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import SingleItemContent from '../components/SingleItemContent'

function PostersSection({ data }) {
  console.log(data)

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {data?.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <SingleItemContent content={item} classes={''} />
          </div>
        ))
      ) : (
        <p>Add items to your Watchlist and see them here.</p>
      )}
    </div>
  )
}

export default PostersSection
