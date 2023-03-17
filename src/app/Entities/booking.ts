type Booking = {
  id: string; // uuid
  date: string;
  startTime: string;
  endTime: string;
  pickUpStationId: string;
  dropStationId?: string;
  userId: string;
  invoiceAmt?: number;
  vehicleId: string;
  status: boolean;
};
