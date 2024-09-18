import React, { useEffect, useRef, useState } from 'react'
import { collection, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import Message from './Message'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const postConverter = {
  toFirestore(post) {
    return {
      author: post.author,
      title: post.title,
    }
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return {
      ...data,
      id: snapshot.id, // include the document ID
    }
  },
}

function Messages() {
  const messagesRef = collection(db, 'messages').withConverter(postConverter)
  const q = query(messagesRef, orderBy('createdAt'))
  const dummy = useRef()

  const [messages, loading, error] = useCollectionData(q)
  if (loading) return <p>Loading messages...</p>
  if (error) return <p>Error loading messages: {error.message}</p>

  return (
    <div className="flex flex-col gap-3 justify-center w-full">
      {messages.map((message) => (
        <div key={message.id}>
          <Message message={message} />
        </div>
      ))}
      <div ref={dummy}> </div>
    </div>
  )
}

export default Messages
