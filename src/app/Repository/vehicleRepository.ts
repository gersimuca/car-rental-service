class VehicleRepository {
  private Vehicles: Vehicle[] = [];
  constructor() {}

  public async addVehicle(vehicle: Vehicle): Promise<Vehicle> {
    try {
      const conflictingVehicles: number = this.Vehicles.filter(
        (currVehicle: Vehicle) =>
          currVehicle.numberPlate === vehicle.numberPlate
      ).length;
      if (conflictingVehicles === 0) {
        this.Vehicles.push(vehicle);
        return vehicle;
      } else {
        throw new Error("Vehicle already registered");
      }
    } catch (err) {
      throw err;
    }
  }

  public async getVehicle(vehicleId: string): Promise<Vehicle> {
    try {
      const vehicle: Vehicle | undefined = this.Vehicles.find(
        (vehicle: Vehicle) => vehicle.numberPlate === vehicleId
      );
      if (vehicle) {
        return vehicle;
      } else {
        throw new Error("No Vehicle found");
      }
    } catch (err) {
      throw err;
    }
  }

  public async removeVehicle(vehicleId: string) {
    try {
      this.Vehicles = this.Vehicles.filter(
        (vehicle: Vehicle) => vehicle.numberPlate !== vehicleId
      );
    } catch (err) {
      throw err;
    }
  }

  public async filterVehicles(vehicleType: VehicleType): Promise<Vehicle[]> {
    try {
      return this.Vehicles.filter(
        (vehicle: Vehicle) => vehicle.type === vehicleType
      );
    } catch (err) {
      throw err;
    }
  }
}

class VehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async getVehicle(vehicleNumberPlate: string): Promise<Vehicle> {
    try {
      return await this.vehicleRepository.getVehicle(vehicleNumberPlate);
    } catch (err) {
      throw err;
    }
  }

  public async addVehicle(vehicle: Vehicle) {
    try {
      await this.vehicleRepository.addVehicle(vehicle);
    } catch (err) {
      throw err;
    }
  }

  public async removeVehicle(vehicleId: string) {
    try {
      await this.vehicleRepository.removeVehicle(vehicleId);
    } catch (err) {
      throw err;
    }
  }

  public async filterVehicles(vehicleType: VehicleType): Promise<Vehicle[]> {
    try {
      return await this.vehicleRepository.filterVehicles(vehicleType);
    } catch (err) {
      throw err;
    }
  }
}
