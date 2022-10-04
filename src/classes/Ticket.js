class Ticket {

    seats = [];
    travelers = [];
    firstClass = false;
    cancellationProtection = false;

    constructor(data) {
        Object.assign(this, data);
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

    addTraveler(travelerDataObject) {
        console.log(travelerDataObject);
        this.travelers.push(travelerDataObject);
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

    getBookingData() {
        return {
            customerId: 2,
            journeyId: this.journeyId,
            cancellationProtection: this.cancellationProtection,
            departureTime: '2022-10-05 09:23:00',
            startStationId: this.startStationId,
            endStationId: this.endStationId,
            travelers: this.travelers
        }
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
                value: `${this.depFromFirstStationTime} + ${this.startStationDeparture}`
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