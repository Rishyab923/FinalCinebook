import { Request, Response, NextFunction } from "express";
import * as BookingService from "./booking.service";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      user,
      movie,
      theater,
      showDate,
      showTime,
      seats,
      amount,
    } = req.body;

    if (
      !user?.name ||
      !user?.email ||
      !movie ||
      !theater ||
      !showDate ||
      !showTime ||
      !seats?.length ||
      !amount
    ) {
      res.status(400).json({
        success: false,
        message: "Missing required booking details",
      });
      return;
    }

    const formattedSeats: string[] = seats.map((seat: any) =>
      typeof seat === "string" ? seat : `${seat.row}${seat.number}`
    );

    const bookingPayload = {
      user: {
        name: user.name,
        email: user.email,
      },
      movie,
      theater,
      showDate,
      showTime,
      seats: formattedSeats,
      amount,
    };

    const booking = await BookingService.createBooking(bookingPayload);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error?.message,
    });
  }
};

export const getUserBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.params;

    const bookings = await BookingService.getBookingsByEmail(email);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};
