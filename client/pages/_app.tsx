import React from 'react'
import '../styles/globals.css'
import AuthContextProvider from 'contexts/AuthContext'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
