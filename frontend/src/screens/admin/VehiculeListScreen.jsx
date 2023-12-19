import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";

import { FaEdit, FaTrash } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import Message from "../../components/Message";
import {
  useGetVehiculesQuery,
  useCreateVehiculeMutation,
} from "../../slices/vehiculesApiSlice";
import { toast } from "react-toastify";

const VehiculeListScreen = () => {
  const { data: vehicules, isLoading, error, refetch } = useGetVehiculesQuery();
  console.log("VehiculeSCREEN", vehicules);

  const [
    createVehicule,
    { isLoading: loadingCreate },
  ] = useCreateVehiculeMutation();

  const createVehiculeHandler = async () => {
    console.log("Button clicked!");
    const newVehicule = {
      user: "654722623f69c2fc934a77d7",
      name: "Toyota example",
      images: [
        {
          original: "/images/audi-origin1.jpeg",
          thumbnail: "/thumbnails/audi-t1.jpeg",
        },
        {
          original: "/images/audi-origin3.jpeg",
          thumbnail: "/thumbnails/audi-t2.jpeg",
        },
        // ... other image objects ...
      ],
      description: "Example of description.",
      brand: "Audi-A3",
      year: 2023,
      category: "Sedan",
      color: "White",
      countInStock: 15,
      price: 45000,
      rating: 0,
      provenance: "Germany",
      registration: "12/01/2023",
      vehicleInspection: "Required",
      originalOwner: "Yes",
      odometerReading: "10,000 Km",
      energy: "Petrol",
      transmission: "Automatic",
      upholstery: "Leather",
      doors: 4,
      seats: 5,
      numReviews: 10,
    };
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        console.log("Creating a new vehicle...");
        // await createVehicule();
        //refetch();
        console.log("New Vehicle Data:", newVehicule);

        const mutationResult = await createVehicule(newVehicule);

        console.log("Mutation Result:", mutationResult);

        if (mutationResult.error) {
          console.error("Error creating vehicle:", mutationResult.error);
          toast.error(
            mutationResult.error?.data?.message || mutationResult.error.error
          );
        } else if (mutationResult.data) {
          console.log("Vehicle created successfully!", mutationResult.data);
          refetch(); // Assuming refetch is a function to refetch the vehicle list
        } else {
          console.warn("Unexpected mutation result:", mutationResult);
        }
      } catch (err) {
        console.error("Unhandled error:", err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = (id) => {};

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
      {/* {loadingDelete && <ScaleLoader />} */}
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
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Marque</th>
                <th>Année</th>
                <th>Couleur</th>
                <th>Prix(€)</th>
                <th>Catégorie</th>
                <th>Provenance</th>
                <th>Circule depuis</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vehicules.map((vehicule) => (
                <tr key={vehicule._id}>
                  <td className='text-lowercase'>{vehicule._id}</td>
                  <td>{vehicule.brand}</td>
                  <td>{vehicule.year}</td>
                  <td>{vehicule.color}</td>
                  <td>{vehicule.price}</td>
                  <td>{vehicule.category}</td>
                  <td>{vehicule.provenance}</td>
                  <td>{vehicule.registration}</td>
                  <td>
                    <LinkContainer to={`/admin/vehicule/${vehicule._id}/edit`}>
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
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                {/* <th>Marque</th>
                <th>Année</th>
                <th>Couleur</th>
                <th>Prix(€)</th>
                <th>Catégorie</th>
                <th>Provenance</th>
                <th>Circule depuis</th> */}
                <th>C tech</th>
                <th>P main</th>
                <th>km </th>
                <th>Energie</th>
                <th>Sellerie</th>
                <th>Portes</th>
                <th>Place</th>
                <th>Transmission</th>
              </tr>
            </thead>
            <tbody>
              {vehicules.map((vehicule) => (
                <tr key={vehicule._id}>
                  <td className='text-lowercase'>{vehicule._id}</td>
                  {/* <td>{vehicule.brand}</td>
                  <td>{vehicule.year}</td>
                  <td>{vehicule.color}</td>
                  <td>{vehicule.price}</td>
                  <td>{vehicule.category}</td>
                  <td>{vehicule.provenance}</td>
                  <td>{vehicule.registration}</td> */}
                  <td>{vehicule.vehicleInspection}</td>
                  <td>{vehicule.originalOwner}</td>
                  <td>{vehicule.odometerReading}</td>
                  <td>{vehicule.energy}</td>
                  <td>{vehicule.upholstery}</td>
                  <td>{vehicule.doors}</td>
                  <td>{vehicule.seats}</td>
                  <td>{vehicule.transmission}</td>

                  <td>
                    <LinkContainer to={`/admin/vehicule/${vehicule._id}/edit`}>
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
        </>
      )}
    </>
  );
};

export default VehiculeListScreen;
