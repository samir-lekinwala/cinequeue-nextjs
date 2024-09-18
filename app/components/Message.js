import React from 'react'
import { auth } from '../firebaseConfig'
import Image from 'next/image'

function Message(message) {
  // const messageId = message.message.id
  const messageContents = message.message.message
  const currentUser = auth.currentUser.uid == message.message.uid
  const photoUrl = message.message.photoUrl
  console.log('photourl', photoUrl)

  return (
    <div className="">
      <div
        className={`${
          currentUser ? 'justify-end' : 'justify-start'
        } flex flex-row gap-2 m-2`}
      >
        <img src={photoUrl} className="w-10 h-10 rounded-lg" alt="userPhoto" />
        <p
          className={`${
            currentUser ? 'bg-lime-500' : 'bg-sky-900 text-white'
          } rounded-lg p-2 break-words overflow-auto`}
        >
          {messageContents}
        </p>
      </div>
    </div>
  )
}

export default Message
