import { useState, useEffect } from 'react'
import AuthProvider from '../context/AuthContext'
import '../styles/tailwind.css'

import Loader from '../componets/Loader'


function MyApp({ Component, pageProps }) {
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  return mount ? (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  ) : (<div className="container mx-auto flex flex-col justify-center items-center min-h-screen">
    <Loader />
  </div>) 
}

export default MyApp
