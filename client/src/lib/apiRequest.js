import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://connectprofilesbackend.onrender.com",
  withCredentials: true,
});

export default apiRequest;
