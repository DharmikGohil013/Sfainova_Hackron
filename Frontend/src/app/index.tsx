import React from 'react'

import Hero from './Components/Hero'
import Features from './Components/Features'
import FAQ from './Components/FAQ'

// >>>>>>> 7cca34bc09e9e6ee05353884ffd08411526a10b8:Frontend/src/app/index.tsx
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
