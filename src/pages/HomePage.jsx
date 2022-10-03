import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from '../components/Header'
import Footer from '../components/Footer';
import SearchJourney from '../components/SearchJourneyButton';

//import '../../scss/HomePage.scss'

const HomePage = () => {

  //const [routes, setRoutes] = useState([]);

  /* useEffect(() => {
    getRoutesData();
  }, []);

  const getRoutesData = async () => {
    const response = await (await fetch(`/api/searchJourney/stations/1`)).json();
    console.log(response.data);
    response.data.map(x => console.log(x.StartDest));
    setRoutes(response.data);
  } */

  return (
    <Container>
      <Header />
      <SearchJourney />
      <Footer />
    </Container>
  )
}

export default HomePage