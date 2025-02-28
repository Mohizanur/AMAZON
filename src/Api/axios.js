import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://amazon-api-express-b25zym525-monasirs-projects.vercel.app"
      : "http://localhost:5000",
});

export { axiosInstance };
