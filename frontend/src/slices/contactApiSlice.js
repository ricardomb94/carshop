import { apiSlice } from "./apiSlice";
import { CONTACT_URL } from "../constants";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
        query: (data) => ({
          url: `${CONTACT_URL}`,
          method: "POST",
          body: data,
        }),
      }),
    getMessages: builder.query({
      query: () => ({
        url: CONTACT_URL,
      }),
      providesTags: ["Message"],
      keepUnusedDataFor: 5,
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `${CONTACT_URL}/${messageId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSubmitContactFormMutation,
  useGetMessagesQuery,
  useDeleteMessageMutation,
//   useUpdateMessageMutation,
//   useGetMessageDetailsQuery,
} = contactApiSlice;
