import React, { useState } from "react";

const CreateVehiculeForm = ({ createHandler }) => {
  const [formData, setFormData] = useState({
    user: "654722623f69c2fc934a77d7",
    name: "",
    images: [],
    description: "",
    brand: "",
    year: 0,
    category: "",
    color: "",
    countInStock: 0,
    price: 0,
    rating: 0,
    provenance: "",
    registration: "",
    vehiculeInspection: "",
    originalOwner: "",
    odometerReading: "",
    energy: "",
    transmission: "",
    upholstery: "",
    doors: 0,
    seats: 0,
    numReviews: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const updatedImages = [...formData.images];
    updatedImages[index][name] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleAddImage = () => {
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        { original: "", thumbnail: "" }, // Initial image object
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Creating a new vehicle...");
    console.log("New Vehicle Data:", formData);

    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const mutationResult = await createHandler(formData);
        console.log("Mutation Result:", mutationResult);

        if (mutationResult.error) {
          console.error("Error creating vehicle:", mutationResult.error);
          // Handle error
        } else if (mutationResult.data) {
          console.log("Vehicle created successfully!", mutationResult.data);
          // Handle success
        } else {
          console.warn("Unexpected mutation result:", mutationResult);
        }
      } catch (err) {
        console.error("Unhandled error:", err);
        // Handle error
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Create input fields for each property of the vehicle */}
      <label>Name:</label>
      <input
        type='text'
        name='name'
        value={formData.name}
        onChange={handleChange}
      />
      {/* Repeat this pattern for other properties */}

      {/* Images */}
      {formData.images.map((image, index) => (
        <div key={index}>
          <label>Original Image:</label>
          <input
            type='text'
            name='original'
            value={image.original}
            onChange={(e) => handleImageChange(e, index)}
          />
          <label>Thumbnail Image:</label>
          <input
            type='text'
            name='thumbnail'
            value={image.thumbnail}
            onChange={(e) => handleImageChange(e, index)}
          />
        </div>
      ))}
      <button type='button' onClick={handleAddImage}>
        Add Image
      </button>

      {/* Add more input fields for other properties */}

      <button type='submit'>Create Vehicle</button>
    </form>
  );
};

export default CreateVehiculeForm;
