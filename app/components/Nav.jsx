'use client'
// import React from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { auth } from '../firebaseConfig'
// import Link from 'next/link'
// import { signOut } from 'firebase/auth'
// import signInWithGoogle from '../functions/signInWithGoogle'
// import NavItem from './NavItem'
// import Logo from './Logo'

// function Nav() {
//   const [user] = useAuthState(auth)

//   function handleSignOut() {
//     signOut(auth)
//       .then(() => {
//         console.log('sign out successful')
//         // Sign-out successful.
//       })
//       .catch((error) => {
//         // An error happened.
//       })
//   }

//   const navSignedIn = [
//     { listItem: 'Movies', link: '/movies' },
//     { listItem: 'TV Shows', link: '/tvshows' },
//     { listItem: 'Chat', link: '/chat' },
//     { listItem: 'Watchlist', link: '/watchlist' },
//     { listItem: 'My Account', link: '/myaccount' },
//   ]
//   const navSignedOut = [
//     { listItem: 'Movies', link: '/movies' },
//     { listItem: 'TV Shows', link: '/tvshows' },
//   ]

//   return (
//     <div className="pb-10">
//       <nav className="flex justify-between px-5 h-[4rem] items-center max-w-[70%] mx-auto">
//         <Logo classes={'text-white text-3xl'} />
//         <ul className="flex gap-2 justify-end text-xl text-white">
//           {user
//             ? navSignedIn.map((item) => (
//                 <NavItem key={item.listItem} item={item} />
//               ))
//             : navSignedOut.map((item) => (
//                 <NavItem key={item.listItem} item={item} />
//               ))}
//           {user ? (
//             <li>
//               <button onClick={handleSignOut}>Sign Out</button>
//             </li>
//           ) : (
//             <li>
//               <button onClick={signInWithGoogle}>Sign In</button>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default Nav

import React, { useEffect, useRef, useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from '@material-tailwind/react'
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  EyeIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline'
import Logo from './Logo'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import signInWithGoogle from '../functions/signInWithGoogle'
import handleSignOut from '../functions/handleSignOut'
import Link from 'next/link'
import { set } from 'firebase/database'
import SearchBar from './SearchBar'
import { useRouter } from 'next/compat/router'

function Nav() {
  const [user] = useAuthState(auth)

  const [open, setOpen] = React.useState(0)
  const [openAlert, setOpenAlert] = React.useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [searchBarClick, setSearchBarClick] = useState(false)
  const router = useRouter()

  const refreshPage = () => {
    router.refresh()
  }

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  useEffect(() => {
    if (isDrawerOpen) {
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scrolling on the body
      document.body.style.overflow = ''
    }

    // Cleanup function to reset overflow when component unmounts or searchData changes
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  return (
    <div>
      <div className=" z-50 relative bg-black justify-between items-center flex w-full h-[48px]">
        <Link href={'/'} onClick={refreshPage}>
          <Logo
            classes={`${
              searchBarClick
                ? ''
                : 'z-50 relative text-2xl text-white font-poppins cursor-pointer px-2'
            } `}
          />{' '}
        </Link>
        <SearchBar
          searchBarClick={searchBarClick}
          setSearchBarClick={setSearchBarClick}
        />
        {isDrawerOpen ? null : (
          <>
            <div className="flex gap-4 items-center">
              {!user && !searchBarClick ? (
                <button
                  onClick={signInWithGoogle}
                  className="text-white bg-white bg-opacity-10 rounded-xl p-1 px-2 font-poppins relative z-20"
                >
                  Sign In
                </button>
              ) : null}
              <div className="px-2">
                <CiMenuBurger
                  // color="black"
                  onClick={openDrawer}
                  className={`${searchBarClick ? 'hidden' : ''}
              h-[2rem] w-[2rem] relative z-50 text-white 
                
              `}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        placement={'right'}
        className="bg-black bg-opacity-30 shadow-2xl"
      >
        <div className="flex justify-end p-2 z-40">
          <XMarkIcon
            onClick={closeDrawer}
            className="h-[2rem] w-[2rem] text-white "
          />
        </div>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            {/* <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            /> */}
            <Logo classes={'text-white text-2xl'} />
          </div>
          {/* <div className="p-2">
            <Input
              className=""
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div> */}
          <List className="">
            <hr className="my-2 border-blue-gray-50" />
            {/* <ListItem className="text-white">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Movies
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color=""
                  className="bg-white rounded-full"
                />
              </ListItemSuffix>
            </ListItem> */}
            {/* <ListItem className="text-white">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              TV Shows
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color=""
                  className="bg-white rounded-full"
                />
              </ListItemSuffix>
            </ListItem> */}
            {user ? (
              <>
                <Link href={'/watchlist'} onClick={closeDrawer}>
                  <ListItem className="text-white">
                    <ListItemPrefix>
                      <QueueListIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Watch List
                    <ListItemSuffix>
                      {/* <Chip
                        value="14"
                        size="sm"
                        variant="ghost"
                        color=""
                        className="bg-white rounded-full"
                      /> */}
                    </ListItemSuffix>
                  </ListItem>
                </Link>
                <Link href={'/seenlist'} onClick={closeDrawer}>
                  <ListItem className="text-white">
                    <ListItemPrefix>
                      <EyeIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Seen List
                    <ListItemSuffix>
                      {/* <Chip
                        value="14"
                        size="sm"
                        variant="ghost"
                        color=""
                        className="bg-white rounded-full"
                      /> */}
                    </ListItemSuffix>
                  </ListItem>
                </Link>
                {/* <ListItem className="text-white">
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Seen List
                  <ListItemSuffix>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color=""
                      className="bg-white rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
                <ListItem className="text-white">
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Profile
                </ListItem> */}

                <ListItem onClick={handleSignOut} className="text-white">
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Sign Out
                </ListItem>
              </>
            ) : (
              <>
                <ListItem onClick={signInWithGoogle} className="text-white">
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Sign In
                </ListItem>
                <Alert
                  open={openAlert}
                  className="mt-auto"
                  onClose={() => setOpenAlert(false)}
                >
                  <CubeTransparentIcon className="mb-4 h-8 w-10" />
                  <Typography variant="h6" className="mb-1">
                    Sign in to access members only features
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal opacity-80"
                  >
                    Sign in to save Movies and TV Shows to your Watch List and
                    calculate the total time watched or needed to watch through
                    all your content.
                  </Typography>
                  <div className="mt-4 flex gap-3">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      className="font-medium opacity-80"
                      onClick={() => setOpenAlert(false)}
                    >
                      Dismiss
                    </Typography>
                    <Typography
                      onClick={signInWithGoogle}
                      as="a"
                      href="#"
                      variant="small"
                      className="font-medium"
                    >
                      Sign Up Now
                    </Typography>
                  </div>
                </Alert>
              </>
            )}
          </List>
        </Card>
      </Drawer>
    </div>
  )
}

export default Nav
