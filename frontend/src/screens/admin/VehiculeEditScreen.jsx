import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import { ScaleLoader } from "react-spinners";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateVehiculeMutation,
  useGetVehiculeDetailsQuery,
  useUploadVehiculeImageMutation,
} from "../../slices/vehiculesApiSlice";
import { UPLOADS_URL } from "../../constants";

const VehiculeEditScreen = () => {
  const { id: vehiculeId } = useParams();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState(1900);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [provenance, setProvenance] = useState("");
  const [registration, setRegistration] = useState("");
  const [vehiculeInspection, setVehiculeInspection] = useState("");
  const [originalOwner, setOriginalOwner] = useState("");
  const [odometerReading, setOdometerReading] = useState("");

  const [energy, setEnergy] = useState("");
  const [upholstery, setUpholstery] = useState("");
  const [transmission, setTransmission] = useState("");
  const [doors, setDoors] = useState(0);
  const [seats, setSeats] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  const {
    data: vehicule,
    isLoading,
    refetch,
    error,
  } = useGetVehiculeDetailsQuery(vehiculeId);

  const [
    updateVehicule,
    { isLoading: loadingUpdate },
  ] = useUpdateVehiculeMutation();

  const [
    uploadVehiculeImage,
    { loading: loadingUpload },
  ] = useUploadVehiculeImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("VEHICULE ID", vehiculeId);
    try {
      // Map images to include the full URLs
      const updatedImages = images.map((img) => ({
        original: `${UPLOADS_URL}${img.original}`,
        thumbnail: `${UPLOADS_URL}${img.thumbnail}`,
        _id: img._id, // Keep any other properties you need
      }));

      // const updatedImages = images.map((img) => ({
      //   original: `${UPLOADS_URL}${img.original}`,
      //   thumbnail: `${UPLOADS_URL}${img.thumbnail}`,
      // }));

      console.log("UPDATED-IMAGES :", updatedImages);
      //
      const updatedVehiculeData = {
        name,
        price,
        images: updatedImages,
        brand,
        category,
        description,
        countInStock,
        year,
        color,
        rating,
        provenance,
        registration,
        vehiculeInspection,
        originalOwner,
        odometerReading,
        energy,
        transmission,
        upholstery,
        doors,
        seats,
        numReviews,
      };

      // Use the correct mutation function and pass the updated data
      await updateVehicule({
        _id: vehiculeId,
        ...updatedVehiculeData,
      });

      toast.success("Product updated");
      refetch();
      navigate("/admin/vehiculeslist");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Error updating product");
    }
  };

  useEffect(() => {
    console.log("V-EditScreen", vehicule);
    if (vehicule && vehiculeId === vehicule._id) {
      setName(vehicule.name || "");
      setImages(vehicule.images || []);
      setDescription(vehicule.description || "");
      setBrand(vehicule.brand || "");
      setYear(vehicule.year || 1900);
      setCategory(vehicule.category || "");
      setColor(vehicule.color || "");
      setCountInStock(vehicule.countInStock || 0);
      setPrice(vehicule.price || 0);
      setRating(vehicule.rating || 0);
      setProvenance(vehicule.provenance || "");
      setRegistration(vehicule.registration || "");
      setVehiculeInspection(vehicule.vehiculeInspection || "");
      setOriginalOwner(vehicule.originalOwner || "");
      setOdometerReading(vehicule.odometerReading || "");
      setEnergy(vehicule.energy || "");
      setUpholstery(vehicule.upholstery || "");
      setTransmission(vehicule.transmission || "");
      setDoors(vehicule.doors || 0);
      setSeats(vehicule.seats || 0);
      setNumReviews(vehicule.numReviews || 0);
    } else {
      refetch();
    }
  }, [vehicule, vehiculeId, images, refetch]);

  if (loadingUpdate || isLoading) {
    return <ScaleLoader />;
  }
  const updateImageField = (index, field, value) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = { ...updatedImages[index], [field]: value };
      return updatedImages;
    });
  };

  //

  const uploadFileHandler = async (e, fileType, index) => {
    const file = e.target.files[0];
    console.log("Uploading file:", file);
    const formData = new FormData();
    formData.append(fileType, file);

    try {
      const response = await uploadVehiculeImage(formData);
      console.log("Response DATA:", response);

      // Update the corresponding image in the array
      setImages((prevImages) =>
        prevImages.map((img, i) =>
          i === index
            ? {
                ...img,
                [fileType]: response.data.imagePath,
                thumbnail:
                  fileType === "original"
                    ? img.thumbnail
                    : response.data.thumbnailPath,
              }
            : img
        )
      );

      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/vehiculeslist' className='btn btn-light my-3'>
        Retour
      </Link>
      <FormContainer>
        <h1>Editer le Produit</h1>
        {loadingUpdate && <ScaleLoader />}
        {isLoading ? (
          <ScaleLoader />
        ) : error ? (
          <Message variant='danger'>{error.toString()}</Message>
        ) : (
          <Form
            onSubmit={submitHandler}
            autoComplete='off'
            encType='multipart/form-data'
          >
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Renseigner la valeur'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            {images.map((img, index) => (
              <Form.Group
                key={img._id}
                controlId={`image-${index}`}
                className='my-2'
              >
                <Form.Label>{`Image ${index + 1}`}</Form.Label>
                <div className='d-flex'>
                  <Form.Control
                    type='text'
                    placeholder={`Enter image ${index + 1} url`}
                    value={img.original || ""}
                    onChange={(e) =>
                      updateImageField(index, "original", e.target.value)
                    }
                    disabled={loadingUpload}
                    aria-label={`Image ${index + 1} URL`}
                  ></Form.Control>
                  <Form.Control
                    type='file'
                    onChange={(e) => uploadFileHandler(e, "original", index)}
                    disabled={loadingUpload}
                    aria-label={`Upload original for Image ${index + 1}`}
                  ></Form.Control>
                  {/* <Form.Control
                    type='file'
                    onChange={(e) => uploadFileHandler(e, "thumbnail", index)}
                    disabled={loadingUpload}
                    aria-label={`Upload thumbnail for Image ${index + 1}`}
                  ></Form.Control> */}
                  {loadingUpload && <ScaleLoader />}
                </div>
              </Form.Group>
            ))}

            {/* {images.map((img, index) => (
              <Form.Group
                key={img._id}
                controlId={`image-${index}`}
                className='my-2'
              >
                <Form.Label>{`Image ${index + 1}`}</Form.Label>
                <div className='d-flex'>
                  <Form.Control
                    type='text'
                    placeholder={`Enter image ${index + 1} url`}
                    value={img.original}
                    onChange={(e) =>
                      updateImageField(index, "original", e.target.value)
                    }
                  ></Form.Control>
                  <Form.Control
                    type='file'
                    onChange={(e) => uploadFileHandler(e, "thumbnail", index)}
                  ></Form.Control>
                  {loadingUpload && <ScaleLoader />}
                </div>
              </Form.Group>
            ))} */}

            {/* <Form.Group controlId='image' className='my-2'>
              <Form.Label>Images</Form.Label>
              <Form.Control
                name='image'
                type='text'
                placeholder='Enter image url'
                value={images.map((img) => img.original).join(",")}
                onChange={(e) => setImages(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose Original Image'
                type='file'
                onChange={(e) => uploadFileHandler(e, "image")}
              ></Form.Control>
              {loadingUpload && <ScaleLoader />}
            </Form.Group>

            <Form.Group controlId='thumbnail' className='my-2'>
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                label='Choose Thumbnail'
                type='file'
                onChange={(e) => uploadFileHandler(e, "thumbnail")}
              ></Form.Control>
              {loadingUpload && <ScaleLoader />}
            </Form.Group> */}

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countinStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='color'>
              <Form.Label>Couleur</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une couleur'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='provenance'>
              <Form.Label>Provenance</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={provenance}
                onChange={(e) => setProvenance(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='registration'>
              <Form.Label>Registration</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='vehiculeinspection'>
              <Form.Label>Vehicule Inspection</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={vehiculeInspection}
                onChange={(e) => setVehiculeInspection(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='originalOwner'>
              <Form.Label>originalOwner</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={originalOwner}
                onChange={(e) => setOriginalOwner(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='odometerReading'>
              <Form.Label>odomerterReading</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={odometerReading}
                onChange={(e) => setOdometerReading(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='energy'>
              <Form.Label>energy</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='doors'>
              <Form.Label>doors</Form.Label>
              <Form.Control
                type='number'
                placeholder='Renseigner une valeur'
                value={doors}
                onChange={(e) => setDoors(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='seats'>
              <Form.Label>seats</Form.Label>
              <Form.Control
                type='number'
                placeholder='Renseigner une valeur'
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='upholstery'>
              <Form.Label>upholstery</Form.Label>
              <Form.Control
                type='text'
                placeholder='Renseigner une valeur'
                value={upholstery}
                onChange={(e) => setUpholstery(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='numReviews'>
              <Form.Label>numReviews</Form.Label>
              <Form.Control
                type='number'
                placeholder='Renseigner une valeur'
                value={numReviews}
                onChange={(e) => setNumReviews(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default VehiculeEditScreen;
