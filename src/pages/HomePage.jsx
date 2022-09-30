import React from 'react'
import { useEffect, useState } from 'react';

const HomePage = () => {

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getRoutesData();
  }, []);

  const getRoutesData = async () => {
    const response = await (await fetch(`/api/searchJourney/stations/1`)).json();
    console.log(response.data);
    response.data.map(x => console.log(x.StartDest));
    setRoutes(response.data);
  }

  return (
    <main>
      <div>HomePage</div>
      <div>
        {
          routes.map((x, id) => (
            <div key={id}>
              {x.stationName}
              {x.departure}
              {x.arrival}
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default HomePage