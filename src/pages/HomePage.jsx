import React from 'react'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
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
    <>
      <div>HomePage</div>
      <div>
        {
          /* routes.map((x, id) => (
            <div key={id}>
              {x.stationName}
              {x.departure}
              {x.arrival}
            </div>
          )) */
        }
      </div>
      <div id='boldertext' className='bg-danger p-5 text-center'><h1>Tågmästarna</h1></div>
      <div className='justify-content-center text-center mt-5'>
        <Button id='searchResa' className='mt-5 ms-3 p-5' variant='primary'>Hej</Button>
      </div>
    </>
  )
}

export default HomePage