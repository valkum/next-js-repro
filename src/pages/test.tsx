import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

type Repo = {
  name: string
  stargazers_count: number
}

export async function getServerSideProps(): Promise<({ props: Repo })> {
  let repo = await fetch(' http://api.github.com/repos/vercel/next.js').then(res => res.json())

  return {
    props: 
      repo
  }
}


export default function Page({stargazers_count}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <div className={styles.container}>
     <a>{stargazers_count}</a>
    </div>
  )
}
