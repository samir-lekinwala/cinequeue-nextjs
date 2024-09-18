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
  apiKey: 'AIzaSyD_CqnsdVYrz-txqj8JISujYiTl1-GDGsg',

  authDomain: 'cinequeue-e8c21.firebaseapp.com',

  databaseURL:
    'https://cinequeue-e8c21-default-rtdb.asia-southeast1.firebasedatabase.app',

  projectId: 'cinequeue-e8c21',

  storageBucket: 'cinequeue-e8c21.appspot.com',

  messagingSenderId: '462931202289',

  appId: '1:462931202289:web:bedd9ef1fd1772783ed950',

  measurementId: 'G-GH3YZG2KZQ',
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
