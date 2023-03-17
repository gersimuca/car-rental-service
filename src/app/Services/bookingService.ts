class BookingService {
  constructor(private bookingRepository: BookingRepository) {}

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
      return await this.bookingRepository.createBooking(
        vehicleId,
        stationId,
        startTime,
        date,
        endTime,
        userId,
        vehicleChargePerHour
      );
    } catch (err) {
      throw err;
    }
  }

  public async endBooking(bookingId: string, stationId: string) {
    try {
      this.bookingRepository.endBooking(bookingId, stationId);
    } catch (err) {
      throw err;
    }
  }
  public async getBooking(bookingId: string): Promise<Booking> {
    try {
      return await this.bookingRepository.getbooking(bookingId);
    } catch (err) {
      throw err;
    }
  }
}
