import React, { useEffect, useState } from 'react'
import SignOut from './SignOut'
import Messages from './Messages'
import EnterMessage from './EnterMessage'
// import { useCollectionData } from 'react-firebase-hooks'

function ChatRoom() {
  return (
    <div className="w-full bg-slate-600 absolute">
      <SignOut />
      ChatRoom
      <section className="w-full overflow-auto">
        <Messages />
      </section>
      <section className="bottom-0 sticky">
        <EnterMessage />
      </section>
    </div>
  )
}

export default ChatRoom
