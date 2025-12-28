import axiosInstance from "./axiosWrapper";

/* =======================
   MOVIES
======================= */

export const getRecommendedMovies = () =>
  axiosInstance.get("/movies/recommended");

export const getAllMovies = () =>
  axiosInstance.get("/movies");

export const getMovieById = (id) =>
  axiosInstance.get(`/movies/${id}`);

/* =======================
   SHOWS
======================= */

export const getShowsByMovieAndLocation = (movieId, location, date) =>
  axiosInstance.get("/shows", {
    params: {
      movieId,
      location,
      date,
    },
  });

export const getShowById = (id) =>
  axiosInstance.get(`/shows/${id}`);

/* =======================
   BOOKINGS
======================= */

export const createBooking = (data) =>
  axiosInstance.post("/bookings", data);

export const getBookingsByEmail = (email) =>
  axiosInstance.get(`/bookings/user/${email}`);
