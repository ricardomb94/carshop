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

    console.log("IMAGES In SERVICE SUBMIT:", images);
    // Format the images state
    const formattedImages = images.map((image) => ({
      original: image.original || "",
      thumbnail: image.thumbnail || "",
      _id: image._id,
    }));
    console.log("FORMATED IMAGES STATE :", formattedImages);

    try {
      const response = await updateService({
        _id: serviceId,
        title,
        images: formattedImages,
        description,
      });

      // Assuming the response.data contains the updated updatedService data
      const updatedService = response ? response.data : null;
      console.log("UPDATED SERVICE DATA :", updatedService);

      // Update the local state with the new data
      setTitle(updatedService.title || "");
      setImages(updatedService.images || []);
      setDescription(updatedService.description || "");

      toast.success("Service");
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error(err?.data?.message || err.error || "Error updating service");
    }
  };

  useEffect(() => {
    console.log("Service-EditScreen", service);
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

  const uploadFileHandler = async (e, fileType, index, imageId) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      toast.error("Choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadServiceImage(formData);

      console.log("RESPONSE UPLOADED-service-IMG :", response);

      const thumbnailPath = response.data.thumbnailPath;
      console.log("RESP.DATA.THUMBNAIL :", thumbnailPath);

      const newImage = {
        original: fileType === "image" ? response.data.imagePath : "",
        thumbnail: thumbnailPath || "",
        _id: imageId || undefined,
      };
      console.log("NEW-IMG :", newImage);

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

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedImages = [...images];
        const updatedImage = { ...updatedImages[index] }; // Create a copy of the nested object
        updatedImage.original = e.target.result;
        updatedImages[index] = updatedImage;
        setImages(updatedImages);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleAddImage = () => {
    setImages([...images, { original: "", thumbnail: "", _id: undefined }]);
  };
  return (
    <>
      <Link to='/admin/servicelist' className='btn btn-light my-3'>
        Retour
      </Link>
      <FormContainer>
        <h1>Mettre à jour le service</h1>
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
            <Form.Group controlId='title'>
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type='title'
                placeholder='Inserer un titre'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Images</Form.Label>
              {console.log("IMAGES IN SERVICES :", images)}
              {images.map((image, index) => (
                <div key={index} className='mb-3'>
                  <img
                    src={image.original || thumbnail}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "auto",
                      marginRight: "10px",
                    }}
                  />
                  <Form.Control
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <Button
                    variant='danger'
                    size='sm'
                    className='ml-2'
                    onClick={() => handleDeleteImage(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
              {loadingUpload && <ScaleLoader />}
              <Button variant='info' size='sm' onClick={() => handleAddImage()}>
                Ajoutez une Image
              </Button>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text-area'
                placeholder='Insérer une description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: "1rem" }}
            >
              Mettre à jour
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ServiceEditScreen;
