import { Routes, Route, useMatch } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

import SeatLayout from "./pages/SeatLayout";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Hide Header & Footer on Seat Layout page
  const isSeatLayoutPage = useMatch(
    "/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout"
  );

  // Hide Header & Footer on Checkout page
  const isCheckoutPage = useMatch("/shows/:showId/:state/checkout");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {!isSeatLayoutPage && !isCheckoutPage && <Header />}

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/movies" element={<Movies />} />

          <Route
            path="/movies/:state/:movieName/:id/ticket"
            element={<MovieDetails />}
          />

          
          {/* Seat Layout */}
          <Route
            path="/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout"
            element={<SeatLayout />}
          />

          {/* Checkout */}
          <Route
            path="/shows/:showId/:state/checkout"
            element={<Checkout />}
          />

          {/* ✅ My Bookings */}
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isSeatLayoutPage && !isCheckoutPage && <Footer />}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
