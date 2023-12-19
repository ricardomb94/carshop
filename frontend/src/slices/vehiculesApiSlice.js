import { VEHICULES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const vehiculesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicules: builder.query({
      query: () => ({
        url: VEHICULES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getVehiculeDetails: builder.query({
      query: (vehiculeId) => ({
        url: `${VEHICULES_URL}/${vehiculeId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createVehicule: builder.mutation({
      query: (newVehicule) => ({
        url: `${VEHICULES_URL}/admin/vehiculeslist`,
        method: "POST",
        body: { ...newVehicule },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.JWT_SECRET}`,
        },
      }),
      invalidatesTags: ["Vehicule"],
    }),
  }),
});

export const {
  useGetVehiculesQuery,
  useGetVehiculeDetailsQuery,
  useCreateVehiculeMutation,
} = vehiculesApiSlice;
