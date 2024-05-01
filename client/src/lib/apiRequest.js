import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://connectprofilesbackend.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
