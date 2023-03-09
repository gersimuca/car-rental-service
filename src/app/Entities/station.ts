type Station = {
  id: string; // uuid
  active: boolean;
  latitude: number;
  longitude: number;
  vehicles: Vehicle[];
};
