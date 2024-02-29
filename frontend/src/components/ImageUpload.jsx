import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ImageUpload = ({ onImageUpload, initialImage, imageUrl }) => {
  const [imagePreview, setImagePreview] = useState(initialImage || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    onImageUpload(formData);
  };

  return (
    <div>
      <Form.Group controlId='image' className='my-2'>
        <Form.Label>Add an Image</Form.Label>
        <Form.Control
          name='image.file'
          label='Choose File'
          type='file'
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt='Preview'
            style={{ width: "100%", height: "auto" }}
          />
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt='Uploaded'
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Form.Group>
    </div>
  );
};

export default ImageUpload;
