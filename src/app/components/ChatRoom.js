import React, { useEffect, useState } from 'react'
import SignOut from './SignOut'
import Messages from './Messages'
// import { useCollectionData } from 'react-firebase-hooks'

function ChatRoom() {
  return (
    <div>
      ChatRoom
      <Messages />
      <SignOut />
    </div>
  )
}

export default ChatRoom
