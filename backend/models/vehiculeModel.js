import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const vehiculeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    provenance: {
      type: String,
      required: true,
    },

    registration: {
      type: String,
      required: true,
    },
    vehicleInspection: {
      type: String,
      required: true,
    },
    originalOwner: {
      type: String,
      required: true,
    },
    odometerReading: {
      type: String,
      required: true,
    },
    energy: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    upholstery: {
      type: String,
      required: true,
    },
    doors: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicule = mongoose.model("Vehicule", vehiculeSchema);

export default Vehicule;
