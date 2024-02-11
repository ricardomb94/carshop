import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import Message from "../../components/Message";
import {
  useDeleteVehiculeMutation,
  useGetVehiculesQuery,
} from "../../slices/vehiculesApiSlice";
import VehiculeTableRow from "../../components/VehiculeTableRow";

const ITEMS_PER_PAGE = 5; // Set the number of items per page

const VehiculeListScreen = () => {
  const { data: vehicules, isLoading, refresh, error } = useGetVehiculesQuery();
  console.log("VehiculeSCREEN", vehicules);

  const [
    deleteVehicule,
    { isLoading: loadingDelete },
  ] = useDeleteVehiculeMutation();

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = vehicules
    ? vehicules.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteHandler = async (id) => {
    console.log("DELETE :", id);
    if (window.confirm("Êtes vous sûre de vouloir supprimer cet item ?")) {
      try {
        await deleteVehicule(id);
        refresh();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2>Liste de véhicules</h2>
        </Col>
        <Col className='text-end'>
          <Link to='/admin/vehicule/create' className='btn-sm m-3'>
            <FaEdit />
            Créez un nouveau produit
          </Link>
        </Col>
      </Row>
      {loadingDelete && (
        <ScaleLoader
          visible={+true}
          height={40}
          width={5}
          color='#36d7b7'
          aria-label='scale-loading'
          wrapperstyle={{}}
          wrapperclass='scale-wrapper'
        />
      )}
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
    </>
  );
};

export default VehiculeListScreen;
