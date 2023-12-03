import { Chicle } from 'next/font/google'
import { Children } from 'react'
import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>ListPulse</title>
        <meta
          name="description"
          content="gerencie suas tarefas"
        />
      </Head>
      {children}
      
    </>
  )
}