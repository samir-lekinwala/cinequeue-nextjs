'use client'
import React, { useState } from 'react'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usersArray, setUsersArray] = useState([])

  function handleSubmitForm(e) {
    e.preventDefault() // Prevent the page from refreshing
    addToDatabase()
    // console.log('Submitted', email, password, confirmPassword)

    // Clear the form fields after submission
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="w-48">
      {' '}
      <h1>Sign up</h1>
      <form
        className=" flex flex-col gap-4"
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <label>
          Email:
          <input
            className="border-blue-950 border-2"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            value={password}
            className="border-blue-950 border-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password
          <input
            value={confirmPassword}
            className="border-blue-950 border-2"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="flex flex-col gap-3 justify-start">
        {usersArray.map((data) => (
          <div key={data.id} className="border">
            <p>id:{data.id}</p>
            <p>email:{data.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SignUp
