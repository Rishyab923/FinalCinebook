import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSeat } from "../context/SeatContext";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getShowById } from "../apis";
import Header from "../components/seat-layout/Header";
import Footer from "../components/seat-layout/Footer";
import screenImg from "../assets/screen.png";

/* ---------------- Seat Button ---------------- */
const Seat = ({
  seat,
  row,
  price,
  toggleSeat,
  selectedSeats,
  bookedSeats,
  showData,
}) => {
  const seatId = `${row}${seat.number}`;

  const isSelected = selectedSeats.some((s) => s.id === seatId);
  const isBooked = bookedSeats.includes(seatId);

  return (
    <button
      disabled={isBooked}
      onClick={() =>
        toggleSeat({
          id: seatId,
          row,
          number: seat.number,
          price,

          // ✅ REQUIRED DB IDs
          movieId: showData?.movie?._id,
          showId: showData?._id,
          theaterId: showData?.theater?._id,

          // UI / history info
          movieName: showData?.movie?.title,
          theater: showData?.theater?.name,
          date: showData?.date,
          time: showData?.startTime,
        })
      }
      className={`w-9 h-9 m-[2px] rounded-lg border text-sm transition
        ${
          isBooked
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "hover:bg-gray-100 cursor-pointer"
        }
        ${isSelected ? "bg-purple-600 text-white" : ""}
      `}
    >
      {isBooked ? "X" : seat.number}
    </button>
  );
};

/* ---------------- Seat Layout Page ---------------- */
const SeatLayout = () => {
  const { showId, state } = useParams();
  const navigate = useNavigate();
  const { selectedSeats, toggleSeat } = useSeat();

  const { data: showData, isLoading } = useQuery({
    queryKey: ["show", showId],
    queryFn: async () => (await getShowById(showId)).data,
    placeholderData: keepPreviousData,
    enabled: !!showId,
  });

  // ✅ IMPORTANT FIX: booked seats ONLY for THIS show
  const bookedSeats =
    JSON.parse(localStorage.getItem(`bookedSeats_${showId}`)) || [];

  if (isLoading) {
    return <div className="p-6">Loading seats...</div>;
  }

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Select at least one seat!");
      return;
    }
    navigate(`/shows/${showId}/${state}/checkout`);
  };

  return (
    <div className="h-screen overflow-hidden bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Header showData={showData} />
      </div>

      {/* Seat Layout */}
      <div className="max-w-7xl mx-auto mt-[210px] px-6 pb-4 h-[calc(100vh-320px)] overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col items-center">
          {showData?.seatLayout &&
            Object.entries(
              showData.seatLayout.reduce((acc, curr) => {
                if (!acc[curr.type]) {
                  acc[curr.type] = { price: curr.price, rows: [] };
                }
                acc[curr.type].rows.push(curr);
                return acc;
              }, {})
            ).map(([type, { price, rows }]) => (
              <div
                key={type}
                className="mb-12 w-full flex flex-col items-center"
              >
                <h2 className="font-semibold text-lg mb-4">
                  {type} : ₹{price}
                </h2>

                <div className="space-y-2">
                  {rows.map((rowObj) => (
                    <div key={rowObj.row} className="flex items-center">
                      <div className="w-6 mr-2 text-sm text-gray-600 text-right">
                        {rowObj.row}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {rowObj.seats.map((seat, i) => (
                          <Seat
                            key={i}
                            seat={seat}
                            row={rowObj.row}
                            price={price}
                            toggleSeat={toggleSeat}
                            selectedSeats={selectedSeats}
                            bookedSeats={bookedSeats}
                            showData={showData}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Screen */}
        <div className="flex justify-center mt-6">
          <img
            src={screenImg}
            alt="Screen"
            className="w-[300px] md:w-[400px] opacity-80"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[100px] bg-white border-t px-6 py-4 flex justify-between items-center z-10">
        <p className="font-medium text-gray-700">
          {selectedSeats.length} Selected
        </p>
        <button
          onClick={handleProceed}
          className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Proceed
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default SeatLayout;
