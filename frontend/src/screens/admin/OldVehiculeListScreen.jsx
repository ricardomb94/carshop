import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import Message from "../../components/Message";
import {
  useGetVehiculesQuery,
  useCreateVehiculeMutation,
  useUploadVehiculeImageMutation,
} from "../../slices/vehiculesApiSlice";
import { toast } from "react-toastify";

const VehiculeListScreen = () => {
  const {
    data: vehicules,
    images,
    isLoading,
    error,
    refetch,
  } = useGetVehiculesQuery();
  const [
    createVehicule,
    { isLoading: loadingCreate },
  ] = useCreateVehiculeMutation();

  const [
    uploadVehiculeImage,
    { loading: loadingUpload },
  ] = useUploadVehiculeImageMutation();

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
      // setImages((prevImages) =>
      //   prevImages.map((img, i) =>
      //     i === index ? { ...img, ...newImage } : img
      //   )
      // );

      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const [newVehicule, setNewVehicule] = useState({
    user: "654722623f69c2fc934a77d7",
    name: "",
    images: [],
    description: "",
    brand: "",
    year: 2023,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicule((prevVehicule) => ({
      ...prevVehicule,
      [name]: value,
    }));
  };

  const createVehiculeHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        console.log("Creating a new vehicle...");

        const mutationResult = await createVehicule(newVehicule);

        console.log("Mutation Result:", mutationResult);

        if (mutationResult.error) {
          console.error("Error creating vehicle:", mutationResult.error);
          toast.error(
            mutationResult.error?.data?.message || mutationResult.error.error
          );
        } else if (mutationResult.data) {
          console.log("Vehicle created successfully!", mutationResult.data);
          refetch();
        } else {
          console.warn("Unexpected mutation result:", mutationResult);
        }
      } catch (err) {
        console.error("Unhandled error:", err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = (id) => {
    // Implement delete logic
  };

  return (
    <>
      <Container fluid></Container>
      <Row className='align-items-center'>
        <Col>
          <h2>Liste de véhicules</h2>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createVehiculeHandler}>
            <FaEdit />
            Créez votre produit
          </Button>
        </Col>
      </Row>
      {loadingCreate && <ScaleLoader />}
      {isLoading ? (
        <ScaleLoader
          visible={+true}
          height={40}
          width={5}
          color='#36d7b7'
          aria-label='scale-loading'
          wrapperstyle={{}}
          wrapperclass='scale-wrapper'
        />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {/* Display Form for Creating a New Vehicle */}
          <Form>
            {/* ... input fields for each property of newVehicule ... */}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={newVehicule.name}
                onChange={(e) => handleInputChange(e, "name")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Renseigner la valeur'
                value={newVehicule.price}
                onChange={(e) => handleInputChange(Number(e, "price"))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              {images.map((image, index) => (
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

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={newVehicule.brand}
                onChange={(e) => handleInputChange(e, "brand")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countinStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={newVehicule.countInStock}
                onChange={(e) => handleInputChange(Number(e, "countInStock"))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={newVehicule.category}
                onChange={(e) => handleInputChange(e, "category")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={newVehicule.description}
                onChange={(e) => handleInputChange(e, "description")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='color'>
              <Form.Label>Couleur</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une couleur'
                value={newVehicule.color}
                onChange={(e) => handleInputChange(e, "color")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='provenance'>
              <Form.Label>Provenance</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={newVehicule.provenance}
                onChange={(e) => handleInputChange(e, "provenance")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='registration'>
              <Form.Label>Registration</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={newVehicule.registration}
                onChange={(e) => handleInputChange(e, "registration")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='vehiculeinspection'>
              <Form.Label>Vehicule Inspection</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={newVehicule.vehiculeInspection}
                onChange={(e) => handleInputChange(e, "vehiculeInspection")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='originalOwner'>
              <Form.Label>originalOwner</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={newVehicule.originalOwner}
                onChange={(e) => handleInputChange(e, "originalOwner")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='odometerReading'>
              <Form.Label>odomerterReading</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={newVehicule.odometerReading}
                onChange={(e) => handleInputChange(e, "odometerReading")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='energy'>
              <Form.Label>energy</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={newVehicule.energy}
                onChange={(e) => handleInputChange(e, "energy")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='doors'>
              <Form.Label>doors</Form.Label>
              <Form.Control
                type='number'
                placeholder='Renseigner une valeur'
                value={newVehicule.doors}
                onChange={(e) => handleInputChange(Number(e, "doors"))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='seats'>
              <Form.Label>seats</Form.Label>
              <Form.Control
                type='number'
                placeholder='Renseigner une valeur'
                value={newVehicule.seats}
                onChange={(e) => handleInputChange(Number(e, "seats"))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='upholstery'>
              <Form.Label>upholstery</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={newVehicule.upholstery}
                onChange={(e) => handleInputChange(e, "upholstery")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='numReviews'>
              <Form.Label>numReviews</Form.Label>
              <Form.Control
                type='number'
                placeholder='Renseigner une valeur'
                value={newVehicule.numReviews}
                onChange={(e) => handleInputChange(Number(e, "numReviews"))}
              ></Form.Control>
            </Form.Group>

            <Button variant='primary' onClick={createVehiculeHandler}>
              Create Vehicle
            </Button>
          </Form>

          {/* Display List of Vehicles */}
          {!isLoading && !error && vehicules ? (
            <Table>
              {/* ... table header ... */}
              <tbody>
                {vehicules.data.map((vehicule) => (
                  <tr key={vehicule._id}>
                    <td className='text-lowercase'>{vehicule._id}</td>
                    {/* ... table data ... */}
                    <td>
                      <LinkContainer
                        to={`/admin/vehicule/${vehicule._id}/edit`}
                      >
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(vehicule._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            console.log("ERROR ON CREATING VEHICULE")
          )}
        </>
      )}
    </>
  );
};

export default VehiculeListScreen;
