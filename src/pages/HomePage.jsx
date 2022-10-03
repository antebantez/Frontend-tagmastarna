import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from '../components/Header'
import Footer from '../components/Footer';
import SearchJourney from '../components/SearchJourneyButton';


//import '../../scss/HomePage.scss'

const HomePage = () => {

  

  return (
    <Container>
      <Header/>
      <SearchJourney/>
      <Footer/>
      </Container>
  )
}

export default HomePage