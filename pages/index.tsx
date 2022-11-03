import Head from 'next/head'
import type { NextPage } from 'next'
import { BowlingPage } from '@/components/BowlingPage'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='bowling scorecard' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='m-2'>
        <BowlingPage />
      </main>
    </div>
  )
}

export default Home
