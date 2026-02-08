import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5006/api",
});

export default API;
