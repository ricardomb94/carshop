import dotenv from 'dotenv'


// Load environment variables from .env file
dotenv.config();

const baseUrl = process.env.BASE_URL;

export default baseUrl;

