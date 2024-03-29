import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import { ScaleLoader } from "react-spinners";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetServiceDetailsQuery,
  useUpdateServiceMutation,
  useUploadServiceImageMutation,
} from "../../slices/servicesApiSlice";

const ServiceEditScreen = () => {
  const { id: serviceId } = useParams();

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: service,
    isLoading,
    refetch,
    error,
  } = useGetServiceDetailsQuery(serviceId);
  console.log("SERVICE IN S-Edit :", service);

  const [
    updateService,
    { isLoading: loadingUpdate },
  ] = useUpdateServiceMutation();

  const [
    uploadServiceImage,
    { isLoading: loadingUpload },
  ] = useUploadServiceImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Format the images state
    const formattedImages = images.map((image) => ({
      original: image.original || "",
      thumbnail: image.thumbnail || "",
      _id: image._id,
    }));

    try {
      const response = await updateService({
        _id: serviceId,
        title,
        images: formattedImages,
        description,
      });

      // Assuming the response.data contains the updated service data
      const updatedService = response ? response.data : null;

      // Update the local state with the new data
      setTitle(updatedService.title || "");
      setImages(updatedService.images || []);
      setDescription(updatedService.description || "");

      toast.success("Service updated");
      navigate("/admin/servicelist");
    } catch (err) {
      console.error("Error updating service:", err);
      toast.error(err?.data?.message || err.error || "Error updating service");
    }
  };

  useEffect(() => {
    if (service && serviceId === service._id) {
      setTitle(service.title || "");
      setImages(service.images || []);
      setDescription(service.description || "");
    } else {
      refetch();
    }
  }, [service, serviceId, refetch]);

  if (loadingUpdate || isLoading) {
    return <ScaleLoader />;
  }

  // const uploadFileHandler = async (e, fileType, index, imageId) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (!file) {
  //     toast.error("Choisir un fichier");
  //     return;
  //   }
  const uploadFileHandler = async (e, fileType, index, imageId) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      toast.error("Choisir un fichier");
      return;
    }

    const formData = new FormData();
    // formData.append(fileType, file);
    formData.append("image", file); // Assuming "image" is the field name for the file

    // Append other fields as strings
    formData.append("images", images.toString());
    formData.append("title", title.toString());
    formData.append("description", description.toString());

    try {
      const response = await uploadServiceImage(formData);

      const thumbnailPath = response.data.thumbnailPath;

      const newImage = {
        original: fileType === "image" ? response.data.imagePath : "",
        thumbnail: thumbnailPath || "", // Check if thumbnailPath is defined
        _id: imageId || undefined,
      };

      // Update the state immutably
      setImages((prevImages) =>
        prevImages.map((img, i) =>
          i === index ? { ...img, ...newImage } : img
        )
      );

      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/servicelist' className='btn btn-light my-3'>
        Retour
      </Link>
      <FormContainer>
        <h1>Editer le Service</h1>
        {loadingUpdate && <ScaleLoader />}
        {isLoading ? (
          <ScaleLoader />
        ) : error ? (
          <Message variant='danger'>{error.toString()}</Message>
        ) : (
          <Form
            onSubmit={submitHandler}
            autoComplete='off'
            encType='multipart/form-data'
          >
            <Form.Group controlId='name'>
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type='name'
                placeholder='renseigner un titre'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              {images.length > 0 &&
                images.map((image, index) => (
                  <div key={index}>
                    <Form.Control
                      name={`images[${index}].original`}
                      type='text'
                      placeholder='Enter image url'
                      value={image.original}
                      onChange={(e) =>
                        uploadFileHandler(e, "original", index, image._id || "")
                      }
                    />
                    <Form.Control
                      name={`images[${index}].original`}
                      label='Choose File'
                      type='file'
                      onChange={(e) =>
                        uploadFileHandler(e, "image", index, image._id || "")
                      }
                    />
                  </div>
                ))}
              {loadingUpload && <ScaleLoader />}
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ServiceEditScreen;
