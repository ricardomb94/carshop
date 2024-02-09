import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import {
  useCreateVehiculeMutation,
  useUploadVehiculeImageMutation,
} from "../../slices/vehiculesApiSlice";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const VehiculeCreateScreen = () => {
  const navigate = useNavigate();

  const [
    createVehicule,
    { isLoading: loadingCreate, error: errorCreate },
  ] = useCreateVehiculeMutation();

  const [
    uploadVehiculeImage,
    { loading: loadingUpload, error: errorUpload },
  ] = useUploadVehiculeImageMutation();

  // Common state for form data and images
  const [formData, setFormData] = useState({
    user: "654722623f69c2fc934a77d7",
    name: "",
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
    // Common structure for images
    images: [{ original: "", thumbnail: "", _id: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addImageField = () => {
    // Add a new empty image field
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

    // Format the images state
    const formattedImages = formData.images.map((image) => ({
      original: image.original || "",
      thumbnail: image.thumbnail || "",
      _id: image._id,
    }));

    // Create a new vehicle object
    const newVehicule = { ...formData, images: formattedImages };

    if (window.confirm("Are you sure you want to create a new vehicle?")) {
      try {
        const response = await createVehicule(newVehicule);

        if (response.error) {
          console.error("Error creating vehicle:", response.error);
          toast.error(response.error?.data?.message || response.error.error);
        } else if (response.data) {
          console.log("Vehicle created successfully!", response.data);
          toast.success("Vehicle created successfully!");
          navigate("/admin/vehiculeslist");
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
      const response = await uploadVehiculeImage(formData);
      console.log("RESPONSE UPLOADED-VEHICULE-IMG :", response);

      const thumbnailPath = response.data.thumbnailPath;
      console.log("RESP.DATA.THUMBNAIL :", thumbnailPath);
      console.log("THUMBNAIL PATH:", thumbnailPath);

      const newImage = {
        original: fileType === "image" ? response.data.imagePath : "",
        thumbnail: thumbnailPath || "", // Check if thumbnailPath is defined
        _id: imageId || undefined,
      };
      console.log("NEW-IMG :", newImage);

      // Update the state immutably
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

  return (
    <>
      {/* ... (other JSX code) */}
      <FormContainer>
        <h1>Creez un nouveau produit</h1>
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
          <Form.Group controlId='name'>
            <Form.Label>Nom:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={formData.name}
              onChange={handleChange}
              name='name' // Add name attribute
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Brève description'
              value={formData.description}
              onChange={handleChange}
              name='description' // Add name attribute
            />
          </Form.Group>
          {/* Render image fields */}
          <Form.Group controlId='image' className='my-2'>
            <Form.Label>Ajouter une Image</Form.Label>
            {formData.images.map((image, index) => (
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
              Add Image Field
            </button>
          </Form.Group>
          <Form.Group controlId='brand'>
            <Form.Label>La Marque de voiture:</Form.Label>
            <Form.Control
              type='text'
              placeholder=' Renseigner la marque'
              value={formData.brand}
              onChange={handleChange}
              name='brand'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='year'>
            <Form.Label>Année:</Form.Label>
            <Form.Control
              type='number'
              placeholder="Renseigner l/'année"
              value={formData.year}
              onChange={handleChange}
              name='year'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Categorie:</Form.Label>
            <Form.Control
              type='text'
              placeholder=' Renseigner la catégorie'
              value={formData.category}
              onChange={handleChange}
              name='category'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='color'>
            <Form.Label>Couleur:</Form.Label>
            <Form.Control
              type='text'
              placeholder=' Renseigner la couleur'
              value={formData.color}
              onChange={handleChange}
              name='color'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='countInStock'>
            <Form.Label>Stock:</Form.Label>
            <Form.Control
              type='number'
              placeholder=' Renseigner la couleur'
              value={formData.countInStock}
              onChange={handleChange}
              name='countInStock'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='rating'>
            <Form.Label>Avis</Form.Label>
            <Form.Control
              type='number'
              placeholder='Votre avis'
              value={formData.rating}
              onChange={handleChange}
              name='rating'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='provenance'>
            <Form.Label>Origine</Form.Label>
            <Form.Control
              type='text'
              placeholder='Renseigner la provenance'
              value={formData.provenance}
              onChange={handleChange}
              name='provenance'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='registration'>
            <Form.Label>Mise en circulation</Form.Label>
            <Form.Control
              type='text'
              placeholder='Renseigner une date'
              value={formData.registration}
              onChange={handleChange}
              name='registration'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='vehiculeInspection'>
            <Form.Label>Mise en circulation</Form.Label>
            <Form.Control
              type='text'
              placeholder='La date du contrôl technique'
              value={formData.vehiculeInspection}
              onChange={handleChange}
              name='vehiculeInspection'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='originalOwner'>
            <Form.Label>Première main</Form.Label>
            <Form.Control
              type='text'
              placeholder='Rensigner la valeur'
              value={formData.originalOwner}
              onChange={handleChange}
              name='originalOwner'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='energy'>
            <Form.Label>Energie</Form.Label>
            <Form.Control
              type='text'
              placeholder='Rensigner la valeur'
              value={formData.energy}
              onChange={handleChange}
              name='energy'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='odometerReading'>
            <Form.Label>Km</Form.Label>
            <Form.Control
              type='text'
              placeholder='Rensigner la valeur'
              value={formData.odometerReading}
              onChange={handleChange}
              name='odometerReading'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='transmission'>
            <Form.Label>Transmission</Form.Label>
            <Form.Control
              type='text'
              placeholder='Rensigner la valeur'
              value={formData.transmission}
              onChange={handleChange}
              name='transmission'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='upholstery'>
            <Form.Label>Sellery</Form.Label>
            <Form.Control
              type='text'
              placeholder='Rensigner la valeur'
              value={formData.upholstery}
              onChange={handleChange}
              name='upholstery'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='doors'>
            <Form.Label>Nombre de Porte</Form.Label>
            <Form.Control
              type='number'
              placeholder='Rensigner la valeur'
              value={formData.doors}
              onChange={handleChange}
              name='doors'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='seats'>
            <Form.Label>Nombre de siège</Form.Label>
            <Form.Control
              type='number'
              placeholder='Rensigner la valeur'
              value={formData.seats}
              onChange={handleChange}
              name='seats'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='numReviews'>
            <Form.Label>Nombre de commentaire</Form.Label>
            <Form.Control
              type='number'
              placeholder='Rensigner la valeur'
              value={formData.numReviews}
              onChange={handleChange}
              name='numReviews'
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary' style={{ marginTop: "1rem" }}>
            Creez
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default VehiculeCreateScreen;
