import { SERVICES_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: SERVICES_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Services"],
    }),
    // getServiceDetails: builder.query({
    //   query: (serviceId) => ({
    //     url: `${SERVICES_URL}/${serviceId}`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
    createService: builder.mutation({
      query: (newService) => ({
        url: `${SERVICES_URL}/admin/servicelist`,
        method: "POST",
        body: newService, // use newService directly, without JSON.stringify
        log: console.log("CreateServiceApi :", newService),
        headers: {
           "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.JWT_SECRET}`,
        },
      }),
      invalidatesTags: ["Services"],
    }),
    // createService: builder.mutation({
    //   query: (newService) => ({
    //     url: `${SERVICES_URL}/admin/servicelist`,
    //     method: "POST",
    //     // body: { ...newVehicule },
    //     body: JSON.stringify(newService),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.JWT_SECRET}`,
    //     },
    //   }),

    //   invalidatesTags: ["Services"],
    // }),
  
    updateService: builder.mutation({
      query: (data) => {
        const { _id, ...updatedData } = data;

        // Ensure _id is present in updatedData
        updatedData._id = _id;

        const url = `${SERVICES_URL}/${_id}`;

        return {
          url,
          method: "PUT",
          body: updatedData, // Use updatedData without _id for the body
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.JWT_SECRET}`,
          },
        };
      },
      invalidatesTags: ["Services"],
    }),

    uploadServiceImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${process.env.JWT_SECRET}`,
        },
      }),
    }),
    deleteService: builder.mutation({
      query: (serviceId) => ({
        url: `${SERVICES_URL}/${serviceId}`,
        method: "DELETE",
      }),
      providesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
//   useGetServiceDetailsQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useUploadServiceImageMutation,
  useDeleteServiceMutation,
} = servicesApiSlice;
