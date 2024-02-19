import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  });
  
  const Service = mongoose.model("Service", serviceSchema);
  
  export default Service;
  