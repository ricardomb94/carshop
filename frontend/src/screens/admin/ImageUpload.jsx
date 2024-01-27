import React from "react";
import { Form } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";

const ImageUpload = ({ index, img, loadingUpload, uploadFileHandler }) => (
  <Form.Group
    key={img._id}
    controlId={`image-${index}`}
    className='my-2'
    encType='multipart/form-data'
  >
    <Form.Label>{`Image ${index + 1}`}</Form.Label>
    <div className='d-flex'>
      <Form.Control
        type='file'
        onChange={(e) => uploadFileHandler(e, "original", index)}
        disabled={loadingUpload}
        aria-label={`Upload original for Image ${index + 1}`}
      ></Form.Control>
      {loadingUpload && <ScaleLoader />}
    </div>
  </Form.Group>
);
export default ImageUpload;
