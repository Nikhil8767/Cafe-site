import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [3, "First name should contain at least 3 characters"],
    maxLength: [30, "First name cannot have more than 30 characters"],
  },
  lastName: { // Changed from "lastname" to "lastName" for consistency
    type: String,
    required: [true, "Last name is required"],
    minLength: [3, "Last name should contain at least 3 characters"],
    maxLength: [30, "Last name cannot have more than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: validator.isEmail,
      message: "Provide a valid email",
    },
  },
  phone: {
    type: String, // Changed to String for better validation and handling leading zeros
    required: [true, "Phone number is required"],
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value); // Ensures exactly 10 digits
      },
      message: "Phone number should contain exactly 10 digits",
    },
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
