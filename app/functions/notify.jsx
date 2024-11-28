import { toast } from 'react-toastify'

import React from 'react'

export function notify(message, props) {
  return toast(message, props)
}

export default notify
