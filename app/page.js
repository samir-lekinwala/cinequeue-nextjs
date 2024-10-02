'use client'
import { auth } from './firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import Hero from './components/Hero'
import MoviesCarousel from './components/MoviesCarousel'

export default function Home() {
  const [user] = useAuthState(auth)
  console.log(user)

  return (
    <main className="">
      <Hero type={'movie'} />
      <MoviesCarousel />
    </main>
  )
}
