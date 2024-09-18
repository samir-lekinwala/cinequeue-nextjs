'use client'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import signInWithGoogle from '../functions/signInWithGoogle'
import NavItem from './NavItem'
import Logo from './Logo'

function Nav() {
  const [user] = useAuthState(auth)

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log('sign out successful')
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }

  const navSignedIn = [
    { listItem: 'Movies', link: '/movies' },
    { listItem: 'TV Shows', link: '/tvshows' },
    { listItem: 'Chat', link: '/chat' },
    { listItem: 'Watchlist', link: '/watchlist' },
    { listItem: 'My Account', link: '/myaccount' },
  ]
  const navSignedOut = [
    { listItem: 'Movies', link: '/movies' },
    { listItem: 'TV Shows', link: '/tvshows' },
  ]

  return (
    <div className="bg-black">
      <nav className="flex justify-between px-5 h-[4rem] items-center max-w-[70%] mx-auto">
        <Logo classes={'text-white text-3xl'} />
        <ul className="flex gap-2 justify-end text-xl text-white">
          {user
            ? navSignedIn.map((item) => (
                <NavItem key={item.listItem} item={item} />
              ))
            : navSignedOut.map((item) => (
                <NavItem key={item.listItem} item={item} />
              ))}
          {user ? (
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          ) : (
            <li>
              <button onClick={signInWithGoogle}>Sign In</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Nav
