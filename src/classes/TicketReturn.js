import PriceReturn from "./PriceReturn";

class TicketReturn {
  #seats = [];
  #travelers = [];
  #firstClass = 0;
  #cancellationProtection = 0;
  //#freeSeatsFraction;

  constructor(data) {
    Object.assign(this, data);
  }

  addSeatReservationReturn(journeyId, carriageId, seatId, seatNumber) {
    if (!this.journeyId === journeyId) {
      throw new Error("Internal booking system error.");
    } else {
      this.#seats.push({
        carriageId: carriageId,
        seat_id: seatId,
        seatNumber: seatNumber,
      });
    }
  }

  getSeatsReturn() {
    return this.#seats;
  }
  addTravelerReturn(travelerDataObject) {
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

  setCancellationProtectionReturn(boolValue) {
    if (boolValue === true) {
      this.#cancellationProtection = 1;
    } else {
      this.#cancellationProtection = 0;
    }
  }

  getPriceReturn(travelerCategoriesReturn) {
    this.price = PriceReturn.getPriceReturn(this, travelerCategoriesReturn);

    return this.price;
  }

  formatDepartureDateTime() {
    let dt = new Date(this.depFromFirstStationTime);

    return new Date(
      dt.setMinutes(dt.getMinutes() + this.startStationDeparture)
    ).toLocaleString("sv-SE");
  }

  getBookingData() {
    return {
      customerId: 2,
      journeyId: this.journeyId,
      cancellationProtection: this.#cancellationProtection,
      departureTime: this.formatDepartureDateTime(),

      startStationId: this.startStationId,
      endStationId: this.endStationId,
      travelers: this.#travelers,
    };
  }

  getTicketRenderInfoReturn() {
    let ticketInfo = [
      {
        description: "Från: ",
        value: this.startStation,
      },
      {
        description: "Till: ",
        value: this.endDestination,
      },
      {
        description: "Avgångstid: ",
        value: `${new Date(
          new Date(this.depFromFirstStationTime)
        ).toLocaleString("sv-SE")}`,
      },

      {
        description: "Beräknad restid: ",
        value: `${this.endStationArrival - this.startStationDeparture} minuter`,
      },
    ];
    return ticketInfo;
  }
}

export default TicketReturn;
