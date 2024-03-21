import asyncHandler from '../middleware/asyncHandler.js';
import Contact from "../models/contactModel.js";
import nodemailer from "nodemailer";

// @desc    Fetch all contactMessages
// @route   GET /api/contact
// @access  Admin
// Fetch all contactMessages
const getContactMessages = asyncHandler(async (req, res) => {
  const contactMessages = await Contact.find({});
  res.json(contactMessages);
});

// @desc    Send contact messages
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  try {
    const { name, telephone, email, message, selectedService } = req.body;

    // Save the contact form data to the database
    const contact = new Contact({
      name,
      telephone,
      email,
      message,
      selectedService,
    });

    await contact.save();

    // Create a test email account using Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Create a Nodemailer transporter using the Ethereal credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'katherine.ohara@ethereal.email',
          pass: 'gN5xB6bH36VZwP1kHf'
      }
    });

    // Send email to the admin
    const info = await transporter.sendMail({
      from: "noreply@example.com",
      to: "progricdev@gmail.com", // Replace with the admin's email address
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nTelephone: ${telephone}\nService: ${selectedService}\n\nMessage:\n${message}`,
      // You can also use HTML for the email body if needed
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { getContactMessages, submitContactForm };