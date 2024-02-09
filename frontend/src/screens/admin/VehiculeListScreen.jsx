import { useState } from "react";
import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  // Button,
  Row,
  Col,
  // Container,
  Pagination,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import Message from "../../components/Message";
import {
  useGetVehiculesQuery,
  // useCreateVehiculeMutation,
} from "../../slices/vehiculesApiSlice";
// import { toast } from "react-toastify";
import VehiculeTableRow from "../../components/VehiculeTableRow";
// import VehiculeCreateScreen from "./VehiculeCreateScreen";

const ITEMS_PER_PAGE = 5; // Set the number of items per page

const VehiculeListScreen = () => {
  // const navigate = useNavigate();

  const { data: vehicules, isLoading, error } = useGetVehiculesQuery();
  console.log("VehiculeSCREEN", vehicules);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = vehicules
    ? vehicules.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const [
  //   createVehicule,
  //   { isLoading: loadingCreate },
  // ] = useCreateVehiculeMutation();

  // const createVehiculeHandler = async () => {
  //   console.log("Button clicked!");
  //   const newVehicule = {
  //     user: "654722623f69c2fc934a77d7",
  //     name: "Toyota example",
  //     images: [
  //       {
  //         original: "/images/volgswagen-slider5.jpeg",
  //         thumbnail: "/thumbnails/volgswagen-t5.jpeg",
  //       },
  //       {
  //         original: "/images/volgswagen-slider5.jpeg",
  //         thumbnail: "/thumbnails/volgswagen-t5.jpeg",
  //       },
  //       // ... other image objects ...
  //     ],
  //     description: "Example of description.",
  //     brand: "Audi-A3",
  //     year: 2023,
  //     category: "Sedan",
  //     color: "White",
  //     countInStock: 15,
  //     price: 45000,
  //     rating: 0,
  //     provenance: "Germany",
  //     registration: "12/01/2023",
  //     vehiculeInspection: "Done",
  //     originalOwner: "Yes",
  //     odometerReading: "10,000 Km",
  //     energy: "Petrol",
  //     transmission: "Automatic",
  //     upholstery: "Leather",
  //     doors: 4,
  //     seats: 5,
  //     numReviews: 10,
  //   };
  //   if (window.confirm("Are you sure you want to create a new product?")) {
  //     try {
  //       console.log("Creating a new vehicle...");
  //       // await createVehicule();
  //       //refetch();
  //       console.log("New Vehicle Data:", newVehicule);

  //       const mutationResult = await createVehicule(newVehicule);

  //       console.log("Mutation Result:", mutationResult);

  //       if (mutationResult.error) {
  //         console.error("Error creating vehicle:", mutationResult.error);
  //         toast.error(
  //           mutationResult.error?.data?.message || mutationResult.error.error
  //         );
  //       } else if (mutationResult.data) {
  //         console.log("Vehicle created successfully!", mutationResult.data);
  //         refetch(); // Assuming refetch is a function to refetch the vehicle list
  //       } else {
  //         console.warn("Unexpected mutation result:", mutationResult);
  //       }
  //     } catch (err) {
  //       console.error("Unhandled error:", err);
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };

  const deleteHandler = (id) => {};

  return (
    <>
      {/* <Container> */}
      <Row className='align-items-center'>
        <Col>
          <h2>Liste de véhicules</h2>
        </Col>
        <Col className='text-end'>
          <Link to='/admin/vehicule/create' className='btn-sm m-3'>
            <FaEdit />
            Créez votre produit
          </Link>
        </Col>
      </Row>
      {/* {loadingCreate && <ScaleLoader />} */}
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
          <Row className='justify-content-center'>
            <Col>
              <Table className='table table-sm table-hover' responsive>
                <thead className='thead-dark'>
                  <tr>
                    <th>ID</th>
                    <th>Marque</th>
                    <th>Année</th>
                    <th>Couleur</th>
                    <th>Prix(€)</th>
                    {/* <th>Catégorie</th> */}
                    <th>Origine</th>
                    <th>Circule depuis</th>
                    <th>Ctl technique</th>
                    <th>Première main</th>
                    <th>km </th>
                    <th>Energie</th>
                    <th>Sellerie</th>
                    <th>Portes</th>
                    <th>Place</th>
                    <th>Transmission</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((vehicule) => (
                    <VehiculeTableRow
                      key={vehicule._id}
                      vehicule={vehicule}
                      deleteHandler={deleteHandler}
                    />
                  ))}
                </tbody>
              </Table>
              <Row>
                <Col>
                  <Pagination>
                    {Array.from({
                      length: Math.ceil(vehicules.length / ITEMS_PER_PAGE),
                    }).map((item, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
      {/* </Container> */}
    </>
  );
};

export default VehiculeListScreen;
