class StationService {
  constructor(private stationRepository: StationRepository) {}

  public async onBoardStation(
    newStation: Omit<Station, "id">
  ): Promise<Station> {
    try {
      return await this.stationRepository.addStation(newStation);
    } catch (err) {
      throw err;
    }
  }

  public async addVehicle(vehicle: Vehicle, stationId: string) {
    try {
      await this.stationRepository.addVehicle(vehicle, stationId);
    } catch (err) {
      throw err;
    }
  }

  public async removeVehicle(vehicle: Vehicle, stationId: string) {
    try {
      await this.stationRepository.removeVehicle(vehicle, stationId);
    } catch (err) {
      throw err;
    }
  }

  public async unBoardStation(stationId: string) {
    try {
      await this.stationRepository.disableStation(stationId);
    } catch (err) {
      throw err;
    }
  }

  public async filterBasedOnLocation(
    userLatitude: number,
    userLongitutde: number
  ): Promise<Station[]> {
    try {
      return await this.stationRepository.getStations(
        userLatitude,
        userLongitutde
      );
    } catch (err) {
      throw err;
    }
  }

  public async getStation(stationId: string): Promise<Station> {
    try {
      return await this.stationRepository.getStation(stationId);
    } catch (err) {
      throw err;
    }
  }
}
