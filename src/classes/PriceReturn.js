class PriceReturn {
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

  static getAdultPriceReturn(minutes) {
    return minutes * 2;
  }

  static getPriceReturn(ticketReturn, travelerCategoriesReturn) {
    let totalPrice = 0;
    let baseTicketPrice = 0;

    const minutes =
      ticketReturn.endStationArrival - ticketReturn.startStationDeparture;
    baseTicketPrice =
      minutes * this.seatClassMultiplier[ticketReturn.getFirstClass()];

    baseTicketPrice = baseTicketPrice * (1.5 - ticketReturn.freeSeatsFraction);

    Object.keys(travelerCategoriesReturn).forEach((k, v) => {
      totalPrice +=
        baseTicketPrice *
        this.categoryMultipliers[k] *
        travelerCategoriesReturn[k];
    });
    if (ticketReturn.getCancellationProtection()) {
      totalPrice *= this.cancellationProcetionMultiplier;
    }

    return Math.round(totalPrice);
  }
}
export default PriceReturn;
