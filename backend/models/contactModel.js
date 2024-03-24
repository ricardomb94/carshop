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
    enum: ['Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5'],
    default: 'Service 1',
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
