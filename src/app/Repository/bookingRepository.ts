class BookingRepository {
  private Bookings: Booking[] = [];
  constructor() {}

  public async getbooking(bookingId: string): Promise<Booking> {
    try {
      const booking: Booking | undefined = this.Bookings.find(
        (booking: Booking) => booking.id === bookingId
      );
      if (booking) {
        return booking;
      }
      throw new Error("No Booking found");
    } catch (err) {
      throw err;
    }
  }

  public async createBooking(
    vehicleId: string,
    stationId: string,
    startTime: string,
    date: string,
    endTime: string,
    userId: string,
    vehicleChargePerHour: number
  ): Promise<Booking> {
    try {
      const newBooking: Booking = {
        id: generateId(),
        date,
        startTime,
        endTime,
        pickUpStationId: stationId,
        userId,
        vehicleId,
        invoiceAmt: generateInvoice(vehicleChargePerHour, endTime, startTime),
        status: true,
      };
      this.Bookings.push(newBooking);
      return newBooking;
    } catch (err) {
      throw err;
    }
  }

  public async endBooking(bookingId: string, stationId: string) {
    try {
      const bookingIdx: number = this.Bookings.findIndex(
        (booking: Booking) => booking.id === bookingId
      );
      if (bookingIdx >= 0) {
        this.Bookings[bookingIdx] = {
          ...this.Bookings[bookingIdx],
          status: false,
          dropStationId: stationId,
        };
      }
    } catch (err) {
      throw err;
    }
  }
}
