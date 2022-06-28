import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    // "X-Server-Select": "mongo",
  },
});
