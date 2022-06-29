import axios from "axios";
export default axios.create({
  baseURL: "http://10.117.129.194:8080/api",
  headers: {
    "Content-type": "application/json",
    "X-Server-Select": "mongo",
  },
});
