import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const [ticket, setTicket] = useState(location.state.ticket);
  console.log(location.state.ticket.seats);

  return (
    <>
      <h2>Slutför bokning</h2>
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
      </div>
    </>
  );
}

export default Booking;