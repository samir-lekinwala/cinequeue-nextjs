'use client'
import { auth } from './firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import Hero from './components/Hero'
import HomePage from './components/HomePage'

export default function Home() {
  const [user] = useAuthState(auth)
  console.log(user)

  return (
    <main className="">
      <HomePage />
    </main>
  )
}
