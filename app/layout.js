import localFont from 'next/font/local'
import './globals.css'
import Nav from './components/Nav'
import Transition from './transition'
// import ToastProvider from './lib/ToastProvider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = {
  title: 'CineQueue',
  description:
    'Find your favourite Movies & TV Shows and see how long it takes to watch them',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <ToastContainer />
        <Transition>{children}</Transition>
      </body>
    </html>
  )
}
