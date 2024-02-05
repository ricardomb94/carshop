import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const VehiculeTableRow = ({ vehicule, deleteHandler }) => {
  return (
    <tr key={vehicule._id}>
      <td>
        <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip id={`tooltip-${vehicule._id}`}>{vehicule._id}</Tooltip>
          }
        >
          <span className='shortened-id'>{vehicule._id.slice(0, 7)}...</span>
        </OverlayTrigger>
      </td>
      <td>{vehicule.brand}</td>
      <td>{vehicule.year}</td>
      <td>{vehicule.color}</td>
      <td>{vehicule.price}</td>
      {/* <td>{vehicule.category}</td> */}
      <td>{vehicule.provenance}</td>
      <td>{vehicule.registration}</td>
      <td>{vehicule.vehiculeInspection}</td>
      <td>{vehicule.originalOwner}</td>
      <td className='text-truncate'>{vehicule.odometerReading}</td>
      <td>{vehicule.energy}</td>
      <td>{vehicule.upholstery}</td>
      <td>{vehicule.doors}</td>
      <td>{vehicule.seats}</td>
      <td className='text-truncate'>{vehicule.transmission}</td>
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
  );
};

export default VehiculeTableRow;
