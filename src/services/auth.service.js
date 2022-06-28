import axios from "axios";
const API_URL = "http://localhost:8080/users/";
// const API_URL = "http://localhost:5000/users/";
class AuthService {
  login(user) {
    console.log(user);
    return axios
      .post(
        API_URL + "login",
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            // "X-Server-Select": "auth"
          },
        }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user) {
    const streetNumber = parseInt(user.streetNumber, 10);
    return axios.post(
      API_URL + "create",
      {
        name: user.username,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
        streetNumber: streetNumber,
        address: user.address,
        city: user.city,
        country: user.country,
        phoneNumber: user.phoneNumber,
        sponsorshipCode: user.sponsorshipCode,
      },
      {
        headers: {
          // "X-Server-Select": "auth"
        },
      }
    );
  }
}
export default new AuthService();
