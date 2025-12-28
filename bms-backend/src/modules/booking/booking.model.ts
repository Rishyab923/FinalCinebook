import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    movie: { type: String, required: true },
    theater: { type: String, required: true },
    showDate: { type: String, required: true },
    showTime: { type: String, required: true },
    seats: {
      type: [String], // ["E2","E4"]
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
