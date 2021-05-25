import axios from "axios";
import GStore from "../store";

const apiClient = axios.create({
  baseURL: "/", // "http://localhost:3000/"
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTalks() {
    return apiClient.get("/talks");
  },
  getSearchParams() {
    return apiClient.get("/search");
  },
  submitSearch() {
    return apiClient.post("/talks/search", GStore);
  },
};
