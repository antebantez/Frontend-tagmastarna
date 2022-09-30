import React from 'react'
import Button from 'react-bootstrap/Button'
//import '../../scss/HomePage.scss'

const HomePage = () => {
  return (
    <>
    <div id='boldertext' className='bg-danger p-5 text-center'><h1>Tågmästarna</h1></div>
      <div className='justify-content-center text-center mt-5'>
        <Button id='searchResa' className='mt-5 ms-3 p-5' variant='primary'>Hej</Button>
      </div>
      </>
  )
}

export default HomePage