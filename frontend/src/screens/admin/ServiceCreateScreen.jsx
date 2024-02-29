import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import {
  useCreateServiceMutation,
  useUploadServiceImageMutation,
} from "../../slices/servicesApiSlice";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const ServiceCreateScreen = () => {
  const navigate = useNavigate();

  const [
    createService,
    { isLoading: loadingCreate, error: errorCreate },
  ] = useCreateServiceMutation();

  const [
    uploadServiceImage,
    { loading: loadingUpload, error: errorUpload },
  ] = useUploadServiceImageMutation();

  const [formData, setFormData] = useState({
    user: "654722623f69c2fc934a77d7",
    title: "",
    description: "",
    images: [{ original: "", thumbnail: "", _id: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addImageField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [
        ...prevFormData.images,
        { original: "", thumbnail: "", _id: "" },
      ],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formattedImages = formData.images.map((image) => ({
      original: image.original || "",
      thumbnail: image.thumbnail || "",
      _id: image._id,
    }));

    const newService = { ...formData, images: formattedImages };

    if (window.confirm("Are you sure you want to create a new service?")) {
      try {
        const response = await createService(newService);

        if (response.error) {
          console.error("Error creating service:", response.error);
          toast.error(response.error?.data?.message || response.error.error);
        } else if (response.data) {
          console.log("Service created successfully!", response.data);
          toast.success("Service created successfully!");
          navigate("/admin/servicelist");
        } else {
          console.warn("Unexpected response:", response);
        }
      } catch (err) {
        console.error("Unhandled error:", err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const uploadFileHandler = async (e, fileType, index, imageId) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(fileType, file);

    try {
      const response = await uploadServiceImage(formData);
      console.log("RESPONSE UPLOADED-SERVICE-IMG :", response);

      const thumbnailPath = response.data.thumbnailPath;
      console.log("RESP.DATA.THUMBNAIL :", thumbnailPath);
      console.log("THUMBNAIL PATH:", thumbnailPath);

      const newImage = {
        original: fileType === "image" ? response.data.imagePath : "",
        thumbnail: thumbnailPath || "", // Check if thumbnailPath is defined
        _id: imageId || undefined,
      };
      console.log("NEW-IMG :", newImage);

      setFormData((prevFormData) => ({
        ...prevFormData,
        images: prevFormData.images.map((img, i) =>
          i === index ? { ...img, ...newImage } : img
        ),
      }));

      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleImageUpload = (formData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, { original: formData }],
    }));
  };
  return (
    <>
      <FormContainer>
        <h1>Créez un nouveau service</h1>
        {loadingCreate && <ScaleLoader />}
        {loadingUpload && <ScaleLoader />}
        {errorCreate && (
          <Message variant='danger'>{errorCreate.toString()}</Message>
        )}
        {errorUpload && (
          <Message variant='danger'>{errorUpload.toString()}</Message>
        )}
        <Form
          onSubmit={submitHandler}
          autoComplete='off'
          encType='multipart/form-data'
        >
          <Form.Group controlId='title'>
            <Form.Label>Titre:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Renseignez le titre'
              value={formData.title}
              onChange={handleChange}
              name='title'
            />
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as='textarea'
              row={6}
              type='text'
              placeholder='Noter la Description'
              value={formData.description}
              onChange={handleChange}
              name='description'
            />
          </Form.Group>
          {/* Render image fields */}
          <Form.Group controlId='image' className='my-2'>
            <Form.Label>Ajoutez une Image</Form.Label>
            {formData.images.map((image, index) => (
              <div key={index}>
                <Form.Control
                  name={`images[${index}].original`}
                  type='text'
                  placeholder="Renseigner l'Url de l'image"
                  value={image.original}
                  onChange={(e) =>
                    uploadFileHandler(e, "original", index, image._id || "")
                  }
                />
                <Form.Control
                  name={`images[${index}].file`}
                  label='Choose File'
                  type='file'
                  onChange={(e) =>
                    uploadFileHandler(e, "image", index, image._id || "")
                  }
                />
              </div>
            ))}
            {loadingUpload && <ScaleLoader />}
            <button type='button' onClick={addImageField}>
              Ajouter une autre image
            </button>
          </Form.Group>

          <Button type='submit' variant='primary' style={{ marginTop: "1rem" }}>
            Validez
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ServiceCreateScreen;
