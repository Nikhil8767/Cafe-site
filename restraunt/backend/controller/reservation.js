import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  // Validate if all required fields are provided
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please fill out the full reservation form!", 400));
  }

  try {
    // Create the reservation in the database
    const reservation = await Reservation.create({
      firstName,
      lastName,
      email,
      date,
      time,
      phone,
    });

    // Respond with a success message if reservation is created
    res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
      reservation, // Optionally send the reservation details back in the response
    });
  } catch (error) {
    // Check for Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400)); // Send validation error message
    }

    // For any other error, pass it to the error handler
    return next(error);
  }
};
