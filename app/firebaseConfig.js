// Import the functions you need from the SDKs you need
'use client'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,

  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,

  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,

  projectId: process.env.NEXT_PUBLIC_PROJECTID,

  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,

  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,

  appId: process.env.NEXT_PUBLIC_APPID,

  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const db = getFirestore(app)

//from firestore website
// import { doc, getDoc } from 'firebase/firestore'

// const docRef = doc(db, 'messages')
// const docSnap = await getDoc(docRef)

// if (docSnap.exists()) {
//   console.log('Document data:', docSnap.data())
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log('No such document!')
// }
