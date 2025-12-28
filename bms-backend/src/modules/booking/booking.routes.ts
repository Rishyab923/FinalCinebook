import { Router } from "express";
import { createBooking, getUserBookings } from "./booking.controller";

const router = Router();

router.post("/", createBooking);
router.get("/user/:email", getUserBookings);

export default router;
