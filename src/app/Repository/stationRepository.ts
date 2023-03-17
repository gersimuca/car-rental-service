class StationRepository {
  private Stations: Station[] = [];
  constructor() {}

  public async addStation(newStation: Omit<Station, "id">): Promise<Station> {
    try {
      const conflictingStations: number = this.Stations.filter(
        (station: Station) =>
          station.latitude === newStation.latitude &&
          station.longitude === newStation.longitude
      ).length;
      if (conflictingStations === 0) {
        const stationEntity = { ...newStation, id: generateId() };
        this.Stations.push(stationEntity);
        return stationEntity;
      } else {
        throw new Error("Station already exists");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  public async disableStation(stationId: string) {
    try {
      this.Stations = this.Stations.reduce(
        (stationsSoFar: Station[], currStations: Station) => {
          if (currStations.id !== stationId) {
            stationsSoFar.push(currStations);
          } else {
            stationsSoFar.push({ ...currStations, active: false });
          }
          return stationsSoFar;
        },
        [] as Station[]
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getStations(
    latitude: number,
    longitude: number
  ): Promise<Station[]> {
    try {
      return this.Stations.sort((a, b) => {
        if (
          distanceBetween(latitude, longitude, a.latitude, a.longitude) >
          distanceBetween(latitude, longitude, b.latitude, b.longitude)
        ) {
          return 1;
        }
        return -1;
      });
    } catch (err) {
      throw err;
    }
  }

  public async addVehicle(Vehicle: Vehicle, StationId: string) {
    try {
      const StationIdx: number = this.Stations.findIndex(
        (station) => station.id === StationId
      );
      if (StationIdx >= 0) {
        this.Stations[StationIdx].vehicles.push(Vehicle);
      }
    } catch (err) {
      throw err;
    }
  }

  public async removeVehicle(Vehicle: Vehicle, StationId: string) {
    try {
      const StationIdx: number = this.Stations.findIndex(
        (station) => station.id === StationId
      );
      if (StationIdx >= 0) {
        this.Stations[StationIdx].vehicles = this.Stations[
          StationIdx
        ].vehicles.filter(
          (vehicle: Vehicle) => vehicle.numberPlate !== Vehicle.numberPlate
        );
      }
    } catch (err) {
      throw err;
    }
  }

  public async getStation(stationId: string): Promise<Station> {
    try {
      const station: Station | undefined = this.Stations.find(
        (station: Station) => station.id === stationId
      );
      if (station && station.active) {
        return station;
      } else {
        throw new Error("No station registered");
      }
    } catch (err) {
      throw err;
    }
  }
}

