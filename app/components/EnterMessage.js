import React, { useState } from 'react'
import { auth, db } from '../firebaseConfig'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'

function EnterMessage() {
  const [text, setText] = useState('')

  function handleSubmitButton(e) {
    e.preventDefault()
    addMessageToDb()
    console.log(text)
    setText('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  // const timestamp = firestore.FieldValue.serverTimestamp()

  async function addMessageToDb() {
    const newMessageRef = collection(db, 'messages')
    try {
      await addDoc(newMessageRef, {
        message: text,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
        photoUrl: auth.currentUser.photoURL,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // async function addMessageToDb(text) {
  //   try {
  //     // Add a new document with a generated ID
  //     const newMessageRef = await setDoc(collection(db, 'messages'), {
  //       message: text,
  //       createdAt: serverTimestamp(), // Add a timestamp with the server time
  //     })
  //     console.log('Document written with ID: ', newMessageRef.id)
  //   } catch (e) {
  //     console.error('Error adding document: ', e)
  //   }
  // }

  return (
    <div className="w-full ">
      <form className="flex flex-row" onSubmit={handleSubmitButton}>
        <input
          className="w-full h-20"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input className="bg-lime-500" type="Submit" defaultValue={'Submit'} />
      </form>
    </div>
  )
}

export default EnterMessage
