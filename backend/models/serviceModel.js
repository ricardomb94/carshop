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
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
    },
  ],
},{timestamps:true});

const Service = mongoose.model("Service", serviceSchema);

export default Service;

// import mongoose from "mongoose";

// const serviceSchema = new mongoose.Schema({
//     title: {
//       type: String,
//       required: false,
//     },
//     description: {
//       type: String,
//       required: false,
//     },
//     image: {
//       type: String,
//       required: false,
//     },
//   });
  
//   const Service = mongoose.model("Service", serviceSchema);
  
//   export default Service;
  