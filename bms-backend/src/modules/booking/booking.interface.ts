export interface IBooking {
  user: {
    name: string;
    email: string;
  };
  movie: string;
  theater: string;
  showDate: string;
  showTime: string;
  seats: string[]; // ["E2", "E4"]
  amount: number;
  createdAt?: Date;
}
