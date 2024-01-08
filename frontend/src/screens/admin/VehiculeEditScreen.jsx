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

  const [images, setImages] = useState([{}]);
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
    user,
    isLoading,
    refetch,
    error,
  } = useGetVehiculeDetailsQuery(vehiculeId);

  const [
    { mutate: updateVehicule },
    { isLoading: loadingUpdate },
  ] = useUpdateVehiculeMutation();

  const [
    uploadVehiculeImage,
    { loading: loadingUpload },
  ] = useUploadVehiculeImageMutation();

  const navigate = useNavigate();

  // const userId = user._id;

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(
      "VEHICULE ID IN SUBMIT HANDLER",
      vehiculeId,
      "AND USER ID",
      user
    );
    try {
      const response = await updateVehicule({
        _id: vehiculeId,
        // user: userId,
        name,
        price,
        images,
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
      if (response.error) {
        // Handle specific error cases if needed
        throw new Error(response.error.message || "Error updating product");
      }

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
      setImages(vehicule.images || [{}]);
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

  // const uploadFileHandler = async (e, fileType, index, imageId) => {
  //   const file = e.target.files[0];
  //   console.log("FILE-UPLOAD", file);

  //   if (!file) {
  //     // Handle the case where no file is selected
  //     toast.error("Please select a file.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append(fileType, file);
  //   console.log("FORMDATA", formData);

  //   try {
  //     const response = await uploadVehiculeImage(formData);
  //     console.log(" RESPONSE IN UPLOAD-HANDLER:", response.data);

  //     if (
  //       !response.data ||
  //       !response.data.imagePath ||
  //       !response.data.thumbnailPath
  //     ) {
  //       // Handle the case where the response data is not as expected
  //       toast.error("Error uploading image. Please try again.");
  //       return;
  //     }

  //     const updatedImages = [...images];
  //     console.log("UPDATED-IMAGES 1", updatedImages);

  //     const newImage = {
  //       original: `/${response.data.imagePath}`,
  //       thumbnail: `/${response.data.thumbnailPath}`,
  //       _id: vehiculeId,
  //       // user: userId,
  //     };

  //     console.log(" NEWIMAGES", newImage);

  //     updatedImages[index] = newImage;

  //     console.log(" UPDATED-IMAGES IN UPLOAD-HANDLER-2:", updatedImages);

  //     setImages(updatedImages);
  //     console.log("SET-UPDATED-IMAGES", setImages(updatedImages));
  //     toast.success("Image uploaded successfully");
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  const uploadFileHandler = async (e, index, vehiculeId) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    // formData.append(fileType, file);
    formData.append("image", file); // Assuming "image" is the field name for the file

    // Append other fields as strings
    formData.append("images", images.toString());
    formData.append("name", name.toString());
    formData.append("price", Number(price));
    formData.append("brand", brand.toString());
    formData.append("category", category.toString());
    formData.append("description", description.toString());
    formData.append("countInStock", Number(countInStock));
    formData.append("year", Number(year));
    formData.append("color", color.toString());
    formData.append("rating", Number(rating));
    formData.append("provenance", provenance.toString());
    formData.append("registration", registration.toString());
    formData.append("vehiculeInspection", vehiculeInspection.toString());
    formData.append("originalOwner", originalOwner.toString());
    formData.append("odometerReading", odometerReading.toString());
    formData.append("energy", energy.toString());
    formData.append("transmission", transmission.toString());
    formData.append("upholstery", upholstery.toString());
    formData.append("doors", Number(doors));
    formData.append("seats", Number(seats));
    formData.append("numReviews", Number(numReviews));

    try {
      const response = await uploadVehiculeImage(formData);
      // console.log(" RESPONSE IN UPLOAD-HANDLER:", response.data);

      if (
        !response.data ||
        !response.data.imagePath ||
        !response.data.thumbnailPath
      ) {
        // Handle the case where the response data is not as expected
        toast.error("Error uploading image. Please try again.");
        return;
      }

      const updatedImages = [...images];
      console.log("UPDATED-IMAGES 1", updatedImages);

      const newImage = {
        original: `/${response.data.imagePath}`,
        thumbnail: `/${response.data.thumbnailPath}`,
        _id: vehiculeId,
        // user: userId,
      };

      console.log(" NEWIMAGES", newImage);

      updatedImages[index] = newImage;

      console.log(" UPDATED-IMAGES IN UPLOAD-HANDLER-2:", updatedImages);

      setImages(updatedImages);
      console.log("SET-UPDATED-IMAGES", setImages(updatedImages));

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
          <Form onSubmit={submitHandler} autoComplete='off'>
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
              {Array.isArray(images) &&
                images.map((image, index) => (
                  <div key={index}>
                    <Form.Control
                      name={`images[${index}].original`}
                      type='text'
                      placeholder='Enter image url'
                      value={image && image.original ? image.original : ""}
                      onChange={(e) =>
                        uploadFileHandler(
                          e,
                          "original",
                          index,
                          image ? image._id || "" : ""
                        )
                      }
                    />
                    <Form.Control
                      name={`images[${index}].thumbnail`}
                      label='Choose File'
                      type='file'
                      onChange={(e) =>
                        uploadFileHandler(
                          e,
                          "image",
                          index,
                          image ? image._id || "" : ""
                        )
                      }
                    />
                  </div>
                ))}
              {loadingUpload && <ScaleLoader />}
            </Form.Group>

            {/* <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                name='image'
                type='text'
                placeholder='Enter image url'
                value={JSON.stringify(images.join(","))} // Display the current value of the images state
                onChange={(e) => setImages(e.target.value.split(","))}
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
