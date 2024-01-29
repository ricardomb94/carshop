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
    // Format the images state
    const formattedImages = images.map((image) => ({
      original: image.original || "",
      thumbnail: image.thumbnail || "",
      _id: image._id,
    }));
    console.log("FORMATED IMAGES STATE :", formattedImages);
    try {
      const response = await updateVehicule({
        _id: vehiculeId,
        name,
        price,
        images: formattedImages,
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
      });
      // Assuming the response.data contains the updated vehicule data
      const updatedVehicule = response ? response.data : null;
      console.log("UPDATED VEICULE DATA :", updatedVehicule);

      // Update the local state with the new data
      setName(updatedVehicule.name || "");
      setImages(updatedVehicule.images || []);
      setDescription(updatedVehicule.description || "");
      setBrand(updatedVehicule.brand || "");
      setYear(updatedVehicule.year || 1900);
      setCategory(updatedVehicule.category || "");
      setColor(updatedVehicule.color || "");
      setCountInStock(updatedVehicule.countInStock || 0);
      setPrice(updatedVehicule.price || 0);
      setRating(updatedVehicule.rating || 0);
      setProvenance(updatedVehicule.provenance || "");
      setRegistration(updatedVehicule.registration || "");
      setVehiculeInspection(updatedVehicule.vehiculeInspection || "");
      setOriginalOwner(updatedVehicule.originalOwner || "");
      setOdometerReading(updatedVehicule.odometerReading || "");
      setEnergy(updatedVehicule.energy || "");
      setUpholstery(updatedVehicule.upholstery || "");
      setTransmission(updatedVehicule.transmission || "");
      setDoors(updatedVehicule.doors || 0);
      setSeats(updatedVehicule.seats || 0);
      setNumReviews(updatedVehicule.numReviews || 0);

      toast.success("Product updated");
      // refetch();
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
  }, [vehicule, vehiculeId, refetch]);

  if (loadingUpdate || isLoading) {
    return <ScaleLoader />;
  }

  const uploadFileHandler = async (e, fileType, index, imageId) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(fileType, file);

    try {
      const response = await uploadVehiculeImage(formData);
      console.log("RESPONSE UPLOADED-VEHICULE-IMG :", response);

      const newImage = {
        original: fileType === "image" ? response.data.imagePath : "",
        thumbnail: fileType === "thumbnail" ? response.data.thumbnailPath : "", // Check if thumbnailPath is defined
        _id: imageId || undefined,
      };
      console.log("NEW-IMG :", newImage);

      // Update the state immutably
      setImages((prevImages) =>
        prevImages.map((img, i) =>
          i === index ? { ...img, ...newImage } : img
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
            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              {images.map((image, index) => (
                <div key={index}>
                  <Form.Control
                    name={`images[${index}].original`}
                    type='text'
                    placeholder='Enter image url'
                    value={image.original}
                    onChange={(e) =>
                      uploadFileHandler(e, "original", index, image._id || "")
                    }
                  />
                  <Form.Control
                    name={`images[${index}].original`}
                    label='Choose File'
                    type='file'
                    onChange={(e) =>
                      uploadFileHandler(e, "image", index, image._id || "")
                    }
                  />
                </div>
              ))}
              {loadingUpload && <ScaleLoader />}
            </Form.Group>
            {/* <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label> */}
            {/* <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control> */}
            {/* <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <ScaleLoader />} */}
            {/* </Form.Group> */}
            {/* <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                name='image'
                type='text'
                placeholder='Enter image url'
                value={images} // Display the current value of the images state
                onChange={(e) => setImages(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                type='file'
                onChange={(e) => uploadFileHandler(e, "image")} // Pass the correct fileType
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
