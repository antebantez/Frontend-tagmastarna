import React from 'react';

const Seat = ({ seatData }) => {

    return (
        <>
            <div onClick={() => { console.log('jajaja'); }}>{seatData.seatId}</div>
        </>
    )
}

export default Seat;