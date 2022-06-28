<template>
  <div id="app">
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
    Footer
  },
  created() {
    document.title = "CES'EATS";
    this.setPlaces(data);

    const user = JSON.parse(localStorage.getItem("user"));
    const payloadUser = jwt_decode(user.accessToken);
    var configCommande = "";
    var notified = "";
    var message = "";
    if (payloadUser.role == "Client") {
      configCommande = {
        method: "get",
        url: "http://localhost:8080/api/orders/client/" + payloadUser.userId,
        headers: {
          "X-Server-Select": "mongo"
        }
      };
      notified = "clientNotified";
      message = "Votre commande a été prise en compte";
    } else if (payloadUser.role == "Livreur") {
      configCommande = {
        method: "get",
        url: "http://localhost:8080/api/orders/livreur/" + payloadUser.userId,
        headers: {
          "X-Server-Select": "mongo"
        }
      };
      notified = "livreurNotified";
      message = "Vous avez une nouvelle commande de disponible";
    }

    axios(configCommande)
      .then(response => {
        console.log(response.data);
        response.data.order.forEach(element => {
          if (
            element[notified] === false &&
            (element.state == "preparation" || element.state == "livreur")
          ) {
            console.log("coucouc es moio");
            if (Notification.permission === "granted") {
              new Notification(message);
              var data = JSON.stringify({
                [notified]: true
              });

              var config = {
                method: "put",
                url: "http://localhost:8080/api/orders/" + element._id,
                headers: {
                  "X-Server-Select": "mongo",
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU3NTg3MjUsImV4cCI6MTY1NjM2MzUyNX0.vHdiEc98ELrbBDbeZeG-851qS_SLSHJW8HDJX7mPgjs",
                  "Content-Type": "application/json"
                },
                data: data
              };

              axios(config);
            } else if (Notification.permission !== "denied") {
              console.log("coucouc es moiodenied");
              Notification.requestPermission(function(permission) {
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
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    ...mapMutations(["setPlaces"])
  }
};
</script>

<style>
@import "../style/style.css";
@import url("https://fonts.googleapis.com/css2?family=Anek+Latin:wght@500&display=swap");
@import "~bootstrap/dist/css/bootstrap.css";
</style>
