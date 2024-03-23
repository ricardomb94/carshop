import React from "react";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const MessagesTableRow = ({ contact, deleteHandler }) => {
  return (
    <tr key={contact._id}>
      <td>
        <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip id={`tooltip-${contact._id}`}>{contact._id}</Tooltip>
          }
        >
          <span className='shortened-id'>{contact._id.slice(0, 7)}...</span>
        </OverlayTrigger>
      </td>
      <td>{contact.name}</td>
      <td>{contact.telephone}</td>
      <td>{contact.email}</td>
      <td>{contact.selectedService}</td>
      <td>{contact.message}</td>
      <td>
        <Button
          variant='danger'
          className='btn-sm'
          onClick={() => deleteHandler(contact._id)}
        >
          <FaTrash style={{ color: "white" }} />
        </Button>
      </td>
    </tr>
  );
};

export default MessagesTableRow;
