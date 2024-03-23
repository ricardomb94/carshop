import React, { useState } from "react";
import { Row, Col, Table, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import {
  useDeleteContactMutation,
  useGetMessagesQuery,
} from "../../slices/contactApiSlice";
import MessageTableRow from "../../components/MessageTableRow";
import Message from "../../components/Message";

const ITEMS_PER_PAGE = 5; // Set the number of items per page

const MessagesListScreen = () => {
  const { data: contacts, isLoading, error } = useGetMessagesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  console.log("CONTACTS :", contacts);

  const [
    deleteContact,
    { isLoading: loadingDelete, refresh },
  ] = useDeleteContactMutation();

  // Logic for pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = contacts
    ? contacts.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteHandler = async (id) => {
    console.log("DELETE :", id);
    if (window.confirm("Êtes vous sûre de vouloir supprimer cet item ?")) {
      try {
        await deleteContact(id);
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
          <h2>Liste des Messages</h2>
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
          // visible={true}
          height={40}
          width={5}
          color='#36d7b7'
          aria-label='scale-loading'
        />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {contacts && contacts.length > 0 ? ( //conditional check
            <Row className='justify-content-center'>
              <Col>
                <Table className='table table-sm table-hover' responsive>
                  <thead className='thead-dark'>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Service choisi</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((contact) => (
                      <MessageTableRow
                        key={contact._id}
                        contact={contact}
                        deleteHandler={deleteHandler}
                      />
                    ))}
                  </tbody>
                </Table>
                <Row>
                  <Col>
                    <Pagination>
                      {Array.from({
                        length: Math.ceil(contacts.length / ITEMS_PER_PAGE),
                      }).map((_, index) => (
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
          ) : (
            <Message variant='info'>Aucun message trouvé</Message>
          )}
        </>
      )}
    </>
  );
};

export default MessagesListScreen;
