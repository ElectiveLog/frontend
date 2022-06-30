<template>
  <div id="app" class="responsive_login">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <!-- Add anything else here -->
    <Footer />
    <notifications group="foo" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Header from "@/components/inc/Header";
import Footer from "@/components/inc/Footer";
import data from "@/data.json";
import jwt_decode from "jwt-decode";
var axios = require("axios");

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      restaurantId: "",
    };
  },
  async created() {
    document.title = "CES'EATS";
    this.setPlaces(data);

    const user = JSON.parse(localStorage.getItem("user"));
    const payloadUser = jwt_decode(user.accessToken);

    const configCommandeClient = {
      method: "get",
      url: "http://10.117.129.194:8080/api/orders/client/" + payloadUser.userId,
      headers: {
        "X-Server-Select": "mongo",
      },
    };

    const configCommandeLivreur = {
      method: "get",
      url: "http://10.117.129.194:8080/api/orders/",
      headers: {
        "X-Server-Select": "mongo",
      },
    };

    if (payloadUser.role == "Client") {
      axios(configCommandeClient)
        .then((response) => {
          response.data.order.forEach((element) => {
            if (
              (element.state == "preparation" ||
                element.state == "livraison") &&
              element.clientNotified == false
            ) {
              if (Notification.permission === "granted") {
                new Notification(
                  "Votre commande est en cours de preparation!!!"
                );
                var data = JSON.stringify({
                  clientNotified: true,
                });

                var config = {
                  method: "put",
                  url: "http://10.117.129.194:8080/api/orders/" + element._id,
                  headers: {
                    "X-Server-Select": "mongo",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU3NTg3MjUsImV4cCI6MTY1NjM2MzUyNX0.vHdiEc98ELrbBDbeZeG-851qS_SLSHJW8HDJX7mPgjs",
                    "Content-Type": "application/json",
                  },
                  data: data,
                };

                axios(config);
              } else if (Notification.permission !== "denied") {
                Notification.requestPermission(function (permission) {
                  if (permission === "granted") {
                    new Notification(
                      "Votre commande est en cours de préparation"
                    );
                  }
                });
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (payloadUser.role == "Livreur") {
      axios(configCommandeLivreur)
        .then((response) => {
          response.data.orders.forEach((element) => {
            if (
              element.state == "preparation" &&
              element.livreurNotified == false
            ) {
              if (Notification.permission === "granted") {
                new Notification(
                  "Vous avez de nouvelles commandes en attente de livraison!!!"
                );
                var data = JSON.stringify({
                  livreurNotified: true,
                });

                var config = {
                  method: "put",
                  url: "http://10.117.129.194:8080/api/orders/" + element._id,
                  headers: {
                    "X-Server-Select": "mongo",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU3NTg3MjUsImV4cCI6MTY1NjM2MzUyNX0.vHdiEc98ELrbBDbeZeG-851qS_SLSHJW8HDJX7mPgjs",
                    "Content-Type": "application/json",
                  },
                  data: data,
                };

                axios(config);
              } else if (Notification.permission !== "denied") {
                Notification.requestPermission(function (permission) {
                  if (permission === "granted") {
                    new Notification(
                      "Votre commande est en cours de préparation"
                    );
                  }
                });
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (payloadUser.role == "Restaurateur") {
      var configRestaurant = {
        method: "get",
        url:
          "http://10.117.129.194:8080/api/restaurants/restaurateur/" +
          payloadUser.userId,
        headers: {
          "X-Server-Select": "mongo",
        },
      };
      await axios(configRestaurant)
        .then((response) => {
          this.restaurantId = response.data.restaurants[0]._id;
        })
        .catch((error) => {
          console.log(error);
        });
      const configCommandeRestaurateur = {
        method: "get",
        url:
          "http://10.117.129.194:8080/api/orders/restaurant/" +
          this.restaurantId,
        headers: {
          "X-Server-Select": "mongo",
        },
      };
      axios(configCommandeRestaurateur)
        .then((response) => {
          response.data.order.forEach((element) => {
            if (
              element.state == "commande" &&
              element.restaurantNotified == false
            ) {
              if (Notification.permission === "granted") {
                new Notification(
                  "Vous avez une commande en attente de traitement!!!"
                );
                var data = JSON.stringify({
                  restaurantNotified: true,
                });

                var config = {
                  method: "put",
                  url: "http://10.117.129.194:8080/api/orders/" + element._id,
                  headers: {
                    "X-Server-Select": "mongo",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU3NTg3MjUsImV4cCI6MTY1NjM2MzUyNX0.vHdiEc98ELrbBDbeZeG-851qS_SLSHJW8HDJX7mPgjs",
                    "Content-Type": "application/json",
                  },
                  data: data,
                };

                axios(config);
              } else if (Notification.permission !== "denied") {
                Notification.requestPermission(function (permission) {
                  if (permission === "granted") {
                    new Notification(
                      "Votre commande est en cours de préparation"
                    );
                  }
                });
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    ...mapMutations(["setPlaces"]),
  },
};
</script>

<style>
@import "../style/style.css";
@import url("https://fonts.googleapis.com/css2?family=Anek+Latin:wght@500&display=swap");
@import "~bootstrap/dist/css/bootstrap.css";
</style>
