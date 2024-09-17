'use client'
import { useEffect, useState } from 'react'
import { get, push, ref, set } from 'firebase/database'
import { auth, database, db } from './firebaseConfig'
import ChatRoom from './components/ChatRoom'
import { useAuthState } from 'react-firebase-hooks/auth'
import SignIn from './components/SignIn'

export default function Home() {
  const [user] = useAuthState(auth)
  console.log(user)
  // async function addToDatabase() {
  //   const newUserRef = push(ref(db, 'users'))
  //   await set(newUserRef, { email: email, password: password })
  // }

  // async function readFromDatabase() {
  //   const usersRef = ref(db, 'users')
  //   const snapshot = await get(usersRef)

  //   if (snapshot.exists()) {
  //     const myData = snapshot.val()
  //     const temporaryArray = Object.keys(myData).map((myFireId) => {
  //       return { ...myData[myFireId], id: myFireId }
  //     })
  //     setUsersArray(temporaryArray)
  //     console.log('temp array', temporaryArray)
  //   }
  // }

  // useEffect(() => {
  //   readFromDatabase()
  // }, [])

  return (
    <main>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </main>
  )
}
