import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userEmail: {
      type: String
    },
    recycleItem: {
        type: String,
        required:true,
    },
    recycleItemPrice: {
        type: Number,
        required:true,
    },
    facility : {
        type: String,
        ref: "Facility",
    },
    pickupDate:{
        type: Date,
        required:true,
    },
    pickupTime:{
        type: String,
        required:true,
    },

    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },

    bookStatus: {
      type: String,
      default: "pending",
    },
    bookStatusAt: {
      type: Date,
    },
    bookStatusBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
