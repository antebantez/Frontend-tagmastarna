class Ticket {

    seats = [];
    travelers = [];
    firstClass = false;

    constructor(
        data
        //arrivalDatetime, departureDatetime,
        //startStationId, startStation, startStationDeparture,
        //endStationId, endDestination, endStationArrival
    ) {
        console.log(data);
        Object.assign(this, data);
        /* this.arrivalDatetime = arrivalDatetime;
        this.departureDatetime = departureDatetime;
        this.startStationId = startStationId;
        this.startStation = startStation;
        this.startStationDeparture = startStationDeparture;
        this.endStationId = endStationId;
        this.endDestination = endDestination;
        this.endStationArrival = endStationArrival */
    }

    addSeatReservation(journeyId, carriageId, seatId, seatNumber) {
        if (!this.journeyId === journeyId) {
            throw new Error('Internal booking system error.');
        }
        else {
            this.seats.push(
                {
                    carriageId: carriageId,
                    seat_id: seatId,
                    seatNumber: seatNumber
                }
            );
        }
    }

    getTravelers() {
        return this.travelers;
    }

    getSeats() {
        return this.seats;
    }

    setFirstClass(firstClass) {
        this.firstClass = firstClass;
    }

    calculatePrice() {
        // call static methods of Price class to calculate prices 
    }

    getTicketRenderInfo() {
        let ticketInfo = [
            {
                description: 'Från: ',
                value: this.startStation
            },
            {
                description: 'Till: ',
                value: this.endDestination
            },
            {
                description: 'Avgångstid: ',
                value: `${this.depFromFirstStation} + ${this.startStationDeparture}`
            },
            {
                description: 'Beräknad restid: ',
                value: `${this.endStationArrival - this.startStationDeparture} minuter`
            },
            {
                description: 'Antal resande: ',
                value: this.seats.length
            }
        ];
        return ticketInfo;
    }

}

export default Ticket;