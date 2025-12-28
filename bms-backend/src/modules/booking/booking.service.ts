import Booking from "./booking.model";
import { IBooking } from "./booking.interface";

export const createBooking = async (data: IBooking) => {
  return await Booking.create(data);
};

export const getBookingsByEmail = async (email: string) => {
  return await Booking.find({ "user.email": email }).sort({ createdAt: -1 });
};
