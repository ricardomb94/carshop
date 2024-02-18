import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import Message from "../../components/Message";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "../../slices/servicesApiSlice";
import ServiceTableRow from "../../components/ServiceTableRow";

const ITEMS_PER_PAGE = 5; // Set the number of items per page

const ServiceListScreen = () => {
  const { data: services, isLoading, refresh, error } = useGetServicesQuery();
  console.log("SERVICELIST", services);

  const [
    deleteService,
    { isLoading: loadingDelete },
  ] = useDeleteServiceMutation();

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = services
    ? services.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteHandler = async (id) => {
    console.log("DELETE :", id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet item ?")) {
      try {
        await deleteService(id);
        // Invalidate the cache for "Services" tag after deletion
        refresh({ tags: ["Services"] });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2>Liste de services</h2>
        </Col>
        <Col className='text-end'>
          <Link to='/admin/service/create' className='btn-sm m-3'>
            <FaEdit />
            Créez un nouveau service
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
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((service) => (
                    <ServiceTableRow
                      key={service._id}
                      service={service}
                      deleteHandler={deleteHandler}
                    />
                  ))}
                </tbody>
              </Table>
              <Row>
                <Col>
                  <Pagination>
                    {Array.from({
                      length: Math.ceil(services.length / ITEMS_PER_PAGE),
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

export default ServiceListScreen;
