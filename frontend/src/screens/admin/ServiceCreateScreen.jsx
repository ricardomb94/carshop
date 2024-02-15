import React, { useState } from "react";
import { useForm } from "react-hook-form"; // For client-side validation
import { useCreateServiceMutation } from "../../slices/servicesApiSlice";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import ImagePreview from "../../components/ImagePreview";

const ServiceCreateScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [
    createService,
    { isLoading: loadingCreate, error: errorCreate },
  ] = useCreateServiceMutation();

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setImage(e.target.files[0]); // Update image state directly
    } else {
      // Update other fields using register
      register(name).onChange(value);
    }
  };

  const submitHandler = async (data) => {
    // Client-side validation (optional, can be simplified based on needs)
    if (!data.title.trim() || !data.description.trim() || !image) {
      toast.error("Please fill out all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", image);

    try {
      const response = await createService(formData);

      if (response.error) {
        // Handle validation errors from API
        if (response.error?.data?.validation) {
          const validationErrors = Object.entries(
            response.error.data.validation
          ).map(([field, msg]) => `${field}: ${msg}`);
          toast.error(validationErrors.join("\n"));
        } else {
          console.error("Error creating service:", response.error);
          toast.error("An error occurred. Please try again later.");
        }
      } else if (response.data) {
        console.log("Service created successfully!", response.data);
        toast.success("Service created successfully!");
        // Redirect or refresh as needed
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Unhandled error:", err);
      toast.error(err?.data?.message || err.error || "An error occurred");
    }
  };

  return (
    <FormContainer>
      <h1>Create a new service</h1>
      {loadingCreate && <ScaleLoader />}
      {errorCreate && (
        <Message variant='danger'>{errorCreate.toString()}</Message>
      )}
      <Form onSubmit={handleSubmit(submitHandler)}>
        {/* Form fields with validation using register and errors object */}
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter title'
            {...register("title", {
              required: "Title is required",
              minLength: 3,
            })}
          />
          {errors.title && (
            <p className='text-danger'>{errors.title.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            type='text'
            placeholder='Enter description'
            {...register("description", {
              required: "Description is required",
              minLength: 10,
            })}
          />
          {errors.description && (
            <p className='text-danger'>{errors.description.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId='image' className='my-2'>
          <Form.Label>Ajoutez une image</Form.Label>
          <Form.Control
            name='image'
            label='Choose a file'
            type='file'
            onChange={handleChange}
          />
          {image && (
            <ImagePreview
              src={URL.createObjectURL(image)}
              alt='Selected image preview'
            />
          )}
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

// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useCreateServiceMutation } from "../../slices/servicesApiSlice";
// import FormContainer from "../../components/FormContainer";
// import Message from "../../components/Message";
// import { toast } from "react-toastify";
// import { ScaleLoader } from "react-spinners";

// const ServiceCreateScreen = () => {
//   const [
//     createService,
//     { isLoading: loadingCreate, error: errorCreate },
//   ] = useCreateServiceMutation();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "image" && e.target.files[0]) {
//       // Update the state for file uploads
//       setImage(e.target.files[0]);
//     } else {
//       // Update the state for text inputs
//       if (name === "title") {
//         setTitle(value);
//       } else if (name === "description") {
//         setDescription(value);
//       }
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     // Check for missing required fields
//     if (!title || !description || !image) {
//       toast.error("Title, description, and image are required");
//       return;
//     }

//     // Create a FormData object
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("image", image);

//     try {
//       const response = await createService(formData);
//       console.log("RESPONSE IN CREATE FORM SERVICE :", response);

//       if (response.error) {
//         // Handle validation errors specifically
//         if (response.error?.data?.message) {
//           toast.error(response.error.data.message);
//         } else {
//           console.error("Error creating service:", response.error);
//           toast.error(response.error.error || "An error occurred");
//         }
//       } else if (response.data) {
//         console.log("Service created successfully!", response.data);
//         toast.success("Service created successfully!");
//       } else {
//         console.warn("Unexpected response:", response);
//       }
//     } catch (err) {
//       console.error("Unhandled error:", err);
//       toast.error(err?.data?.message || err.error || "An error occurred");
//     }

//   };

//   const uploadFileHandler = async (e) => {
//     const file = e.target.files[0];

//     // Update the state
//     setImage(file);

//     toast.success("Image uploaded successfully");
//   };

//   return (
//     <FormContainer>
//       <h1>Create a new service</h1>
//       {loadingCreate && <ScaleLoader />}
//       {errorCreate && (
//         <Message variant='danger'>{errorCreate.toString()}</Message>
//       )}
//       <Form
//         onSubmit={submitHandler}
//         autoComplete='off'
//         encType='multipart/form-data'
//       >
//         {/* Form fields for title and description */}
//         <Form.Group controlId='title'>
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter title'
//             value={title}
//             onChange={handleChange}
//             name='title'
//           />
//         </Form.Group>

//         <Form.Group controlId='description'>
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as='textarea'
//             rows={3}
//             type='text'
//             placeholder='Enter description'
//             value={description}
//             onChange={handleChange}
//             name='description'
//           />
//         </Form.Group>

//         {/* Form field for image upload */}
//         <Form.Group controlId='image' className='my-2'>
//           <Form.Label>Ajoutez une image </Form.Label>
//           <Form.Control
//             name='image'
//             label='Choose a file'
//             type='file'
//             onChange={uploadFileHandler}
//           />
//         </Form.Group>

//         {/* Submit button */}
//         <Button type='submit' variant='primary' style={{ marginTop: "1rem" }}>
//           Create Service
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default ServiceCreateScreen;
