import axios from "axios";

const axiosInstance = axios.create({
  // This will automatically use the Vercel deployment URL in production
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3000/api",
});

export { axiosInstance };
