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
      keepUnusedDataFor: 5,
    }),
     getUnreadMessagesCount: builder.query({
      query: () => ({
        url: `${CONTACT_URL}/unread`,
      }),
      providesTags: ["Contact"],
    }),
    
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `${CONTACT_URL}/${contactId}`,
        method: "DELETE",
      }),
      providesTags: ["Contact"],
    }),
  }),
});

export const {
  useSubmitContactFormMutation,
  useGetMessagesQuery,
  useDeleteContactMutation,
  useGetUnreadMessagesCountQuery,
} = contactApiSlice;
