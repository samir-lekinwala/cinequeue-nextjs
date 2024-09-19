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

import React from 'react'
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
} from '@heroicons/react/24/outline'
import Logo from './Logo'

function Nav() {
  const [open, setOpen] = React.useState(0)
  const [openAlert, setOpenAlert] = React.useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <div className="flex w-full justify-between items-center p-2 lg:px-10">
      <Logo classes={'text-2xl text-white font-poppins'} />

      {isDrawerOpen ? (
        <XMarkIcon className="h-8 w-8 stroke-2 p-4 top-0 right-0 z-20" />
      ) : (
        <CiMenuBurger
          // color="black"
          onClick={openDrawer}
          className="h-[2rem] w-[2rem] text-white"
        />
      )}

      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        placement={'right'}
        className="bg-black bg-opacity-30 shadow-2xl"
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="white">
              Sidebar
            </Typography>
          </div>
          <div className="p-2">
            <Input
              className=""
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List className="">
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="white" className="mr-auto font-normal">
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Analytics
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="white" className="mr-auto font-normal">
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem className="text-white">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
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
            </ListItem>
            <ListItem className="text-white">
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem className="text-white">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
          <Alert
            open={openAlert}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Upgrade to Material Tailwind PRO and get even more components,
              plugins, advanced features and premium.
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
                as="a"
                href="#"
                variant="small"
                className="font-medium"
              >
                Upgrade Now
              </Typography>
            </div>
          </Alert>
        </Card>
      </Drawer>
    </div>
  )
}

export default Nav
