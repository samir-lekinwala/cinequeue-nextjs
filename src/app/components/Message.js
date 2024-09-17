import React from 'react'

function Message(message) {
  // const messageId = message.message.id
  const messageContents = message.message.message
  console.log('single message', message.message)

  return (
    <div>
      <p>{messageContents}</p>
    </div>
  )
}

export default Message
