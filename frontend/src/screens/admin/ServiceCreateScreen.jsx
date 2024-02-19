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
    { loading: loadingUpload, error: errorUpload },
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
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      // Upload the image
      const response = await uploadServiceImage(formData).unwrap();
      console.log("UPLOAD RESPONSE:", response);

      // Check if the upload was successful
      if (response.error) {
        toast.error(response.error?.data?.message || "Image upload failed");
        return;
      }

      // Image uploaded successfully, now create the service
      const imagePath = response.imagePath;
      console.log("IMAGEPATH :", imagePath);
      const serviceData = {
        title,
        description,
        image: imagePath,
      };
      console.log("SERVICE DATA :", serviceData);

      try {
        const createResponse = await createService(serviceData).unwrap();
        console.log("CREATE SERVICE RESPONSE:", createResponse);

        if (createResponse.error) {
          // Handle validation errors specifically
          if (createResponse.error?.data?.message) {
            toast.error(createResponse.error.data.message);
          } else {
            console.error("Error creating service:", createResponse.error);
            toast.error(createResponse.error.error || "An error occurred");
          }
        } else if (createResponse.data) {
          console.log("Service created successfully!", createResponse.data);
          toast.success("Service created successfully!");
        } else {
          console.warn("Unexpected response:", createResponse);
        }
      } catch (createError) {
        console.error("Error creating service:", createError);
        toast.error(
          createError?.data?.message || createError.error || "An error occurred"
        );
      }
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
      toast.error(
        uploadError?.data?.message || "An error occurred during image upload"
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
      {loadingUpload && <ScaleLoader />}
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
