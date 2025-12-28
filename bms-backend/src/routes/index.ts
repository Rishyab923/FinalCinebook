import { Router } from "express";
import movieRoutes from "../modules/movie/movie.route";
import showRoutes from "../modules/show/show.routes";
import theaterRoutes from "../modules/theater/theater.routes";
import bookingRoutes from "../modules/booking/booking.routes"; // ✅ default import

const router = Router();

router.use("/movies", movieRoutes);
router.use("/shows", showRoutes);
router.use("/theaters", theaterRoutes);
router.use("/bookings", bookingRoutes); // ✅ this works now

export default router;
