import Vehicule from "../../../../backend/models/vehiculeModel";

const UpdateVehiculeImages = async (vehiculeId, newImages) => {
  try {
    // Find the vehicule by ID
    const vehicule = await Vehicule.findById(vehiculeId);
    if (!vehicule) {
      throw new Error("Vehicule not found");
    }

    // Update the images array with new image paths
    vehicule.images = newImages.map((image) => ({
      original: image.originalPath,
      thumbnail: image.thumbnailPath,
    }));

    // Save the updated vehicule
    await vehicule.save();

    return { success: true, message: "Vehicule images updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update vehicule images" };
  }
};
export default UpdateVehiculeImages;
