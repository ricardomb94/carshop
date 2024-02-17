import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ServiceTableRow = ({ service, deleteHandler }) => {
  return (
    <tr key={service._id}>
      <td>
        <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip id={`tooltip-${service._id}`}>{service._id}</Tooltip>
          }
        >
          <span className='shortened-id'>{service._id.slice(0, 7)}...</span>
        </OverlayTrigger>
      </td>
      <td>{service.title}</td>
      <td>{service.description}</td>
      <td>{service.image}</td>
      <td>
        <LinkContainer to={`/admin/service/${service._id}/edit`}>
          <Button variant='light' className='btn-sm mx-2'>
            <FaEdit />
          </Button>
        </LinkContainer>
        <Button
          variant='danger'
          className='btn-sm'
          onClick={() => deleteHandler(service._id)}
        >
          <FaTrash style={{ color: "white" }} />
        </Button>
      </td>
    </tr>
  );
};

export default ServiceTableRow;
