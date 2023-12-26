import { VEHICULES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const vehiculesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicules: builder.query({
      query: () => ({
        url: VEHICULES_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Vehicules"],
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
      invalidatesTags: ["Vehicules"],
    }),
    updateVehicule: builder.mutation({
      //
      query: (data) => {
        const url = `${VEHICULES_URL}/${data._id}`;

        return {
          url: url,
          method: "PUT",
          body: data,
          log: console.log("Update URL:", url),
        };
      },
      invalidatesTags: ["Vehicules"],
    }),
    uploadVehiculeImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteVehicule: builder.mutation({
      query: (vehiculeId) => ({
        url: `${VEHICULES_URL}/${vehiculeId}`,
        method: "DELETE",
      }),
      providesTags: ["Vehicule"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${VEHICULES_URL}/${data.vehiculeId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vehicule"],
    }),
    getTopVehicules: builder.query({
      query: () => `${VEHICULES_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetVehiculesQuery,
  useGetVehiculeDetailsQuery,
  useCreateVehiculeMutation,
  useUpdateVehiculeMutation,
} = vehiculesApiSlice;
