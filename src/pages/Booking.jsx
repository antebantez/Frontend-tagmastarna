import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Booking = () => {
  const location = useLocation();
  const [ticket, setTicket] = useState(location.state.ticket);
  const [travelerCategories, setTravelerCategories] = useState(
    { adult: 0, child: 0, senior: 0 }
  );
  const [makePayment, setMakePayment] = useState(false);

  const addTravelersDataToTicket = () => {
    let seatIds = [];
    for (let seat of ticket.getSeats()) {
      seatIds.push(seat.seat_id);
    }
    Object.keys(travelerCategories).forEach((k, v) => {
      for (let i = 0; i < travelerCategories[k]; i++) {
        ticket.addTraveler(
          { travelerName: '', travelerCategory: k, seatId: seatIds.pop() }
        );
      }
    });
    setMakePayment(true);
  }

  const finalizePayment = async () => {
    const postBookingResponse = await fetch(
      `/api/booking`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket.getBookingData())
      }
    )
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        }
      )
      .catch(err => {
        console.log(err);
      });
    console.log(postBookingResponse);
  }

  return (
    <>
      <h2>Slutför bokning</h2>
      {
        !makePayment ?
          <div>
            {
              ticket.getTicketRenderInfo().map((infoField, id) => {
                return (
                  <div key={id}>
                    {infoField.description}{infoField.value}
                  </div>
                )
              })
            }
            <div>Bokade platser</div>
            {
              ticket.getSeats().map((seat, id) => {
                return (
                  <div key={id}>
                    <div >
                      Plats: {seat.seat_id}
                    </div>
                    <div >
                      Vagn: {seat.carriageId}
                    </div>
                  </div>
                )
              })
            }
            <div>
              <h5>Resenärer</h5>
              <div>
                <div onClick={() => setTravelerCategories(previousState => ({ ...previousState, adult: previousState.adult + 1 }))}>+</div>
                Vuxen: {travelerCategories.adult}
                <div onClick={() => setTravelerCategories(previousState => ({ ...previousState, adult: previousState.adult - 1 }))}>-</div>
              </div>
              <div>
                <div onClick={() => setTravelerCategories(previousState => ({ ...previousState, child: previousState.child + 1 }))}>+</div>
                Barn: {travelerCategories.child}
                <div onClick={() => setTravelerCategories(previousState => ({ ...previousState, child: previousState.child - 1 }))}>-</div>
              </div>
              <div>
                <div onClick={() => setTravelerCategories(previousState => ({ ...previousState, senior: previousState.senior + 1 }))}>+</div>
                Pensionär: {travelerCategories.senior}
                <div onClick={() => setTravelerCategories(previousState => ({ ...previousState, senior: previousState.senior - 1 }))}>-</div>
              </div>
              <div>
                Att betala:
              </div>
              <Button onClick={() => addTravelersDataToTicket()}>Fortsätt</Button>
            </div>
          </div> :
          <div>
            BETALA
            {console.log(ticket.getBookingData())}
            <Button onClick={() => finalizePayment()}>Slutför betalning</Button>
          </div>
      }
    </>
  );
}

export default Booking;