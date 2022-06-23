import axios from "axios";
const API_URL = "http://localhost:8080/users/";
class AuthService {
  login(user) {
    console.log(user);
    return axios
      .post(
        API_URL + "login",
        {
          email: user.email,
          password: user.password
        },
        {
          headers: {
            // "X-Server-Select": "auth"
          }
        }
      )
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user) {
    return axios.post(
      API_URL + "create",
      {
        name: user.username,
        email: user.email,
        password: user.password,
        roleId: "cl4pj9g89000601tfgh82kucg"
      },
      {
        headers: {
          // "X-Server-Select": "auth"
        }
      }
    );
  }
}
export default new AuthService();
