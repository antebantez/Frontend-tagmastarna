class Ticket {

    seats = [];
    travelers = [];
    firstClass = 0;
    cancellationProtection = 0;

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

    setCancellationProtection(boolValue) {
        if (boolValue === true) {
            this.cancellationProtection = 1;
        }
        else {
            this.cancellationProtection = 0;
        }
    }

    calculatePrice() {
        // call static methods of Price class to calculate prices 
    }

    formatDepartureDateTime() {
        let dt = new Date(this.depFromFirstStationTime);
        return new Date(dt.setMinutes(dt.getMinutes() + this.startStationDeparture)).toLocaleString();
    }

    getBookingData() {
        return {
            customerId: 2,
            journeyId: this.journeyId,
            cancellationProtection: this.cancellationProtection,
            departureTime: this.formatDepartureDateTime(),
            startStationId: this.startStationId,
            endStationId: this.endStationId,
            travelers: this.travelers
        }
    }

    getTicketRenderInfo() {
        let dt = new Date(this.depFromFirstStationTime)
        dt.setMinutes(dt.getMinutes() + this.startStationDeparture);

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
                value: `${dt.toLocaleString()}`
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