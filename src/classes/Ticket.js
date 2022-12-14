import Price from './Price';

class Ticket {

    #seats = [];
    #travelers = [];
    #firstClass = 0;
    #cancellationProtection = 0;
    //#freeSeatsFraction;

    constructor(data) {
        Object.assign(this, data);
    }

    addSeatReservation(journeyId, carriageId, seatId, seatNumber) {
        if (!this.journeyId === journeyId) {
            throw new Error('Internal booking system error.');
        }
        else {
            this.#seats.push(
                {
                    carriageId: carriageId,
                    seat_id: seatId,
                    seatNumber: seatNumber,
                }
            );
        }
    }

    getSeats() {
        return this.#seats;
    }

    addTraveler(travelerDataObject) {
        this.#travelers.push(travelerDataObject);
    }

    getTravelers() {
        return this.#travelers;
    }

    getFirstClass() {
        return this.#firstClass;
    }

    setFirstClass(firstClass) {
        this.#firstClass = firstClass;
    }

    getCancellationProtection() {
        return this.#cancellationProtection;
    }

    setCancellationProtection(boolValue) {
        if (boolValue === true) {
            this.#cancellationProtection = 1;
        }
        else {
            this.#cancellationProtection = 0;
        }
    }

    getPrice(travelerCategories) {
        this.price = Price.getPrice(this, travelerCategories);
        return this.price;
    }

    formatDepartureDateTime() {
        let dt = new Date(this.depFromFirstStationTime);
        return new Date(dt.setMinutes(dt.getMinutes() + this.startStationDeparture)).toLocaleString("sv-SE");
    }

    getBookingData() {
        return {
            journeyId: this.journeyId,
            cancellationProtection: this.#cancellationProtection,
            departureTime: this.formatDepartureDateTime(),
            startStationId: this.startStationId,
            endStationId: this.endStationId,
            travelers: this.#travelers
        }
    }

    getTicketRenderInfo() {
        let dt = new Date(this.depFromFirstStationTime)
        dt.setMinutes(dt.getMinutes() + this.startStationDeparture);

        let ticketInfo = [
            {
                description: 'Fr??n: ',
                value: this.startStation
            },
            {
                description: 'Till: ',
                value: this.endDestination
            },
            {
                description: 'Avg??ngstid: ',
                value: `${dt.toLocaleString("sv-SE")}`
            },
            {
                description: 'Ber??knad restid: ',
                value: `${this.endStationArrival - this.startStationDeparture} minuter`
            },
            {
                description: 'Antal resande: ',
                value: this.#seats.length
            }
        ];
        return ticketInfo;
    }

}

export default Ticket;