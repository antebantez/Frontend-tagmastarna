import React from 'react';
import Carriage from './Carriage';

const Train = ({ trainData }) => {
  //console.log(trainData);

  return (
    <>
      <div>
        {
          trainData.map(carriage => {
            return (
              <Carriage key={carriage.carriageId} carriageData={carriage} />
            )
          })
        }
      </div>
    </>
  )
}

export default Train;