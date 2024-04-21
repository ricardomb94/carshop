import mongoose from "mongoose";


// The capitalizeWords function
function capitalizeWords(string) {
  return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

console.log(capitalizeWords("hello world")); // Output: "Hello World"
console.log(capitalizeWords("this is a test")); // Output: "This Is A Test"

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
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
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const vehiculeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  images: [
    {
      original: {
        type: String,
        required: false,
      },
      thumbnail: {
        type: String,
        required: false,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
  },
  category: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: false,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  provenance: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
  vehiculeInspection: {
    type: String,
    required: false,
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
  numReviews: {
    type: Number,
    required: false,
  },
},{timestamps:true});

// Define pre-save middleware for vehiculeSchema
vehiculeSchema.pre('save', function(next) {
 // Capitalize the first letter of each word in the specified fields
  this.name = capitalizeWords(this.name);
  this.description = capitalizeWords(this.description);
  this.brand = capitalizeWords(this.brand);
  this.category = capitalizeWords(this.category);
  this.color = capitalizeWords(this.color);
  this.provenance = capitalizeWords(this.provenance);
  this.registration = capitalizeWords(this.registration);
  this.vehiculeInspection = this.vehiculeInspection && capitalizeWords(this.vehiculeInspection);
  this.originalOwner = capitalizeWords(this.originalOwner);
  this.odometerReading = capitalizeWords(this.odometerReading);
  this.energy = capitalizeWords(this.energy);
  this.transmission = capitalizeWords(this.transmission);
  this.upholstery = capitalizeWords(this.upholstery);
  
  // Continue with the save operation
  next();
});

const Vehicule = mongoose.model("Vehicule", vehiculeSchema);

export default Vehicule;
