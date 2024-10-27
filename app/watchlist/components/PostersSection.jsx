'use client'

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import SingleItemContent from '../components/SingleItemContent'

function PostersSection({ data, runtimeType }) {
  data.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.contentId}>
            <SingleItemContent
              content={item}
              classes={''}
              runtimeType={runtimeType}
            />
          </div>
        ))
      ) : (
        <p>Add items to your Watchlist and see them here.</p>
      )}
    </div>
  )
}

export default PostersSection
