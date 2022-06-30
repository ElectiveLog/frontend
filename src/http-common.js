import axios from "axios";
export default axios.create({
  baseURL: window.location.origin.split(":80")[0] + ":8080/api",
  headers: {
    "Content-type": "application/json",
    "X-Server-Select": "mongo",
  },
});
