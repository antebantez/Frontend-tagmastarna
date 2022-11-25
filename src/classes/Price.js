class Price {
  static seatClassMultiplier = {
    // 0 = second class
    0: 2.0,
    // 1 = first class
    1: 3.0,
  };
  static categoryMultipliers = {
    adult: 1.0,
    senior: 0.9,
    student: 0.85,
    youth: 0.85,
    child: 0.5,
  };
  static cancellationProcetionMultiplier = 1.2;

  static getAdultPrice(minutes) {
    return minutes * 2;
  }

  static getPrice(ticket, travelerCategories) {
    let totalPrice = 0;
    let baseTicketPrice = 0;

    const minutes = ticket.endStationArrival - ticket.startStationDeparture;
    baseTicketPrice =
      minutes * this.seatClassMultiplier[ticket.getFirstClass()];
    baseTicketPrice = baseTicketPrice * (1.5 - ticket.freeSeatsFraction);
    Object.keys(travelerCategories).forEach((k, v) => {
      totalPrice +=
        baseTicketPrice * this.categoryMultipliers[k] * travelerCategories[k];
    });
    if (ticket.getCancellationProtection()) {
      totalPrice *= this.cancellationProcetionMultiplier;
    }

    return Math.round(totalPrice);
  }
}

export default Price;
