import { Button, Form } from "react-bootstrap";
import {
  useCreateServiceMutation,
  useUploadServiceImageMutation,
} from "../../slices/servicesApiSlice";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";

const ServiceCreateScreen = () => {
  const [
    createService,
    { isLoading: loadingCreate, error: errorCreate },
  ] = useCreateServiceMutation();

  const [
    uploadServiceImage,
    // { loading: loadingUpload, error: errorUpload },
  ] = useUploadServiceImageMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image" && e.target.files[0]) {
      // Update the state for file uploads
      setImage(e.target.files[0]);
    } else {
      // Update the state for text inputs
      if (name === "title") {
        setTitle(value);
      } else if (name === "description") {
        setDescription(value);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check for missing required fields
    if (!title || !description || !image) {
      toast.error("Title, description, and image are required");
      return;
    }

    // Create a FormData object for the image upload
    const formDataForImage = new FormData();
    formDataForImage.append("image", image);

    try {
      const responseImage = await uploadServiceImage(formDataForImage).unwrap();
      console.log("RESPONSE IN UPLOAD SERVICE IMAGE:", responseImage);

      // Check if the upload was successful
      if (responseImage.error) {
        toast.error(
          responseImage.error?.data?.message || "Image upload failed"
        );
        return;
      }

      // Proceed to create the service after the image is successfully uploaded
      const formDataForService = new FormData();
      formDataForService.append("title", title);
      formDataForService.append("description", description);
      formDataForService.append("image", responseImage.data.imagePath);

      try {
        const response = await createService(formDataForService).unwrap();
        console.log("RESPONSE IN CREATE FORM SERVICE:", response);

        if (response.error) {
          // Handle validation errors specifically
          if (response.error?.data?.message) {
            toast.error(response.error.data.message);
          } else {
            console.error("Error creating service:", response.error);
            toast.error(response.error.error || "An error occurred");
          }
        } else if (response.data) {
          console.log("Service created successfully!", response.data);
          toast.success("Service created successfully!");
        } else {
          console.warn("Unexpected response:", response);
        }
      } catch (err) {
        console.error("Unhandled error:", err);
        toast.error(err?.data?.message || err.error || "An error occurred");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error(
        err?.data?.message || "An error occurred during image upload"
      );
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    // Update the state
    setImage(file);

    toast.success("Image uploaded successfully");
  };

  return (
    <FormContainer>
      <h1>Create a new service</h1>
      {loadingCreate && <ScaleLoader />}
      {errorCreate && (
        <Message variant='danger'>{errorCreate.toString()}</Message>
      )}
      <Form
        onSubmit={submitHandler}
        autoComplete='off'
        encType='multipart/form-data'
      >
        {/* Form fields for title and description */}
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={handleChange}
            name='title'
          />
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={handleChange}
            name='description'
          />
        </Form.Group>

        {/* Form field for image upload */}
        <Form.Group
          controlId='image'
          className='my-2'
          accept='image/*'
          required
        >
          <Form.Label>Ajoutez une image </Form.Label>
          <Form.Control
            name='image'
            label='Choose a file'
            type='file'
            onChange={uploadFileHandler}
          />
        </Form.Group>

        {/* Submit button */}
        <Button type='submit' variant='primary' style={{ marginTop: "1rem" }}>
          Create Service
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ServiceCreateScreen;
