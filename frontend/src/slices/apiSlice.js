import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ base_url: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Vehicule", "VehiculeById", "Order", "User", "Service"],
  endpoints: (builder) => ({
    tagTypes: ["Vehicule", "Order", "User"],
    endpoints: (builder) => ({}),
    createVehicule: builder.mutation({
      query: (newVehicule) => ({
        url: "/api/admin/vehiculeslist",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.JWT_SECRET}`,
        },
        body: JSON.stringify(newVehicule),
      }),
    }),
    getVehicules: builder.query({
      query: () => "/api/vehicules",
    }),
  }),
});
