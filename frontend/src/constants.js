export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : process.env.BASE_URL;
export const VEHICULES_URL = "/api/vehicules";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
export const UPLOADS_URL = "/api/upload";
export const SERVICES_URL = "/api/services";
export const CONTACT_URL = "/api/contact";
