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
  }),
});

export const { useGetVehiculesQuery, useGetVehiculeDetailsQuery } =
  vehiculesApiSlice;
