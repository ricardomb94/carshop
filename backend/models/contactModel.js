import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  selectedService: {
    type: String,
    enum: [
      "Moteur",
      "Transmission",
      "Roues",
      "Suspension",
      "Embrayage",
       "Diagnostique",
      "Entretien",
  ],
    default: '',
    required : true 
},
isRead:{
  type:Boolean,
  default:false
},
},{timestamps:true}
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
