class CarRentalService {
  constructor(
    private stationService: StationService,
    private bookingService: BookingService,
    private vehicleService: VehicleService
  ) {}

  public async addStation(newStation: Omit<Station, "id">): Promise<Station> {
    try {
      newStation.vehicles.forEach(
        async (vehicle: Vehicle) =>
          await this.vehicleService.addVehicle(vehicle)
      );
      return await this.stationService.onBoardStation(newStation);
    } catch (err) {
      throw err;
    }
  }

  public async removeStation(stationId: string) {
    try {
      const station: Station = await this.stationService.getStation(stationId);
      station.vehicles.forEach(
        async (vehicle: Vehicle) =>
          await this.vehicleService.removeVehicle(vehicle.numberPlate)
      );
      await this.stationService.unBoardStation(stationId);
    } catch (err) {
      throw err;
    }
  }

  public async bookVehicle(
    vehicleId: string,
    stationId: string,
    startTime: string,
    endTime: string,
    date: string,
    userId: string
  ): Promise<Booking> {
    try {
      const station: Station = await this.stationService.getStation(stationId);
      const stationedVehicle: Vehicle | undefined = station.vehicles.find(
        (vehicle: Vehicle) => vehicle.numberPlate === vehicleId
      );
      if (!stationedVehicle) {
        throw new Error("Requested vehicleId and stationId are incorrect");
      }
      const booking: Booking = await this.bookingService.createBooking(
        vehicleId,
        stationId,
        startTime,
        date,
        endTime,
        userId,
        stationedVehicle.price
      );
      await this.stationService.removeVehicle(stationedVehicle, stationId);
      return booking;
    } catch (err) {
      throw err;
    }
  }

  public async endBooking(bookingId: string, stationId: string) {
    try {
      const booking: Booking = await this.bookingService.getBooking(bookingId);
      const vehicle: Vehicle = await this.vehicleService.getVehicle(
        booking.vehicleId
      );
      await this.bookingService.endBooking(bookingId, stationId);
      await this.stationService.addVehicle(vehicle, stationId);
    } catch (err) {
      throw err;
    }
  }

  public async searchVehicle(
    vehicleType: VehicleType,
    userLatitude: number,
    userLongitutde: number
  ): Promise<Station[]> {
    try {
      const stationsBasedOnLocation: Station[] =
        await this.stationService.filterBasedOnLocation(
          userLatitude,
          userLongitutde
        );

      let vehicles: Vehicle[] = await this.vehicleService.filterVehicles(
        vehicleType
      );
      if (vehicles.length > 0) {
        vehicles = vehicles.sort((a, b) => {
          if (a.price - b.price === 0) {
            if (
              distanceBetween(
                userLatitude,
                userLongitutde,
                a.latitude,
                a.longitude
              ) >
              distanceBetween(
                userLatitude,
                userLongitutde,
                b.latitude,
                b.longitude
              )
            ) {
              return 1;
            }
            return -1;
          }
          return a.price - b.price;
        });
      } else {
        throw new Error("No vehicles found of this type");
      }

      return stationsBasedOnLocation;
    } catch (err) {
      throw err;
    }
  }
}
