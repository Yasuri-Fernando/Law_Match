import React from 'react'
import Header from '../components/Header'
import Specialitymenu from '../components/Specialitymenu';
import TopLawyers from '../components/TopLawyers';
import Banner from '../components/Banner';


const Home = () => {
  return (
    <div>
      <Header/>
      <Specialitymenu/>
      <TopLawyers/>
      <Banner/>
    </div>
  )
}

export default Home;
