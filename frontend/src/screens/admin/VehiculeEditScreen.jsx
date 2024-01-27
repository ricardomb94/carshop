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
import { BASE_URL, UPLOADS_URL } from "../../constants";
import ImageUpload from "./ImageUpload";

const VehiculeEditScreen = () => {
  const { id: vehiculeId } = useParams();

  const [images, setImages] = useState([]);
  console.log("INIT IMG STATE :", images);
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
    console.log("VEHICULE-IMAGES - SUBMITHANDLER", vehicule.images);

    try {
      console.log("IMAGES IN SUBMITHANDLER :", images);
      // Map images to include the full URLs
      const updatedImages = images.map((image) => ({
        images: console.log("IMAGES - IN MAP :", image),
        original: `${UPLOADS_URL}/${image.originalPath}`,
        thumbnail: `${UPLOADS_URL}/${image.thumbnailPath}`,
        _id: image._id,
      }));

      console.log("UPDATED-IMAGES :", updatedImages);
      console.log("BASE_URL:", BASE_URL);
      console.log("UPLOADS_URL:", UPLOADS_URL);
      console.log("Constructed Image URLs:", updatedImages);
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
    console.log("V-EditScreen useEffect", vehicule);
    // console.log("Current Images in useEffect:", vehicule.images);
    if (vehicule && vehiculeId === vehicule._id) {
      console.log("API Response for Images:", vehicule.images);
      setName(vehicule.name || "");
      setImages(vehicule.images || []);
      setDescription(vehicule.description || "");
      setBrand(vehicule.brand || "");
      setBrand(vehicule.name || "");
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

    try {
      const formData = new FormData();
      formData.append(fileType, file);

      const response = await uploadVehiculeImage(formData);
      console.log("Response from uploadVehiculeImage:", response);

      if (response) {
        console.log("RESPONSE-DATA[0] :", response);
        const { imagePath, thumbnailPath, _id } = response.data;

        setImages((prevImages) => {
          const updatedImages = prevImages.map((img, i) =>
            i === index
              ? {
                  ...img,
                  original: imagePath || img.original,
                  thumbnail: thumbnailPath || img.thumbnail,
                  _id: _id || img._id,
                }
              : img
          );

          console.log(
            "Updated Images in setImages:, UPDATES IMG",
            updatedImages
          );
          return updatedImages;
        });

        // Reset the file input value
        e.target.value = "";

        toast.success("Image uploaded successfully");
      } else {
        console.error("Invalid response structure:", response);
        toast.error("Error uploading image. Invalid response structure");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error(err?.data?.message || err.error || "Error uploading image");
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
            {/*</Form> {loadingUpload && <ScaleLoader />}
                </div>
              </Form.Group>
            ))} */}
            {images.map((img, index) => (
              <ImageUpload
                key={img._id}
                index={index}
                img={img}
                loadingUpload={loadingUpload}
                uploadFileHandler={uploadFileHandler}
              />
            ))}

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
