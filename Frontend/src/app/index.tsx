import React from 'react'
import Hero from './Components/Hero'
import Features from './Components/Features'
import FAQ from './Components/FAQ'

type Props = {}

const Home = (props: Props) => {
  return (
    <>
    <Hero/>
    <Features/>
    <FAQ/>
    </>
  )
}

export default Home
