import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ddd-node-typescript</title>
        <meta name="description" content="ddd-node-typescript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>DDD-Node.js-TypeScript</h1>
        <div className={styles.signContainer}>
          <button className={styles.createAccountButton}>Create Account</button>
          <button className={styles.loginButton}>Login</button>
        </div>
        <div id="loader">Loading...</div>
      </main>
    </div>
  )
}

export default Home
