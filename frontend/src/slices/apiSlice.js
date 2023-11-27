import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ base_url: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Vehicule", "VehiculeById", "Order", "User", "images"],
  endpoints: (builder) => ({}),
});
