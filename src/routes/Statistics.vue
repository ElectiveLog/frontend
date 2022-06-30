<template>
  <div class="small">
    <VueApexCharts
      ref="realtimeChart"
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
    <p>
      Nombre de commandes totales passées par les clients :
      {{ numberCommandesTotals }}
    </p>
    <p>Nombre d'articles en cours : {{ numberArticles }}</p>
    <p>Nombre de clients uniques : {{ numberClientsTotals }}</p>
    <p>Moyenne du prix de tous les paniers : {{ meanCard }} €</p>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import jwt_decode from "jwt-decode";
var axios = require("axios");
const user = JSON.parse(localStorage.getItem("user"));

export default {
  components: { VueApexCharts },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
    updateSeriesLine() {
      this.$refs.realtimeChart.updateSeries(
        [
          {
            data: this.series.data,
          },
        ],
        false,
        true
      );
    },
  },
  data() {
    return {
      numberClientsTotals: 0, //
      meanCard: 0,
      commandsPerHour: [],
      numberArticles: 0, //
      numberCommandesTotals: 0, //

      clients: [],
      restaurants: [],
      livreurs: [],
      commandes: [],
      users: [],
      restaurateurs: [],
      devTiers: [],
      commerciaux: [],
      techniques: [],
      roles: [],
      articles: [],
      restaurantOfRestaurateur: [],
      commandesForThisRestaurant: [],
      series: [
        {
          name: "Nombre de commandes (%)",
          data: [],
        },
      ],
      chartOptions: {
        xaxis: {
          categories: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
          ],
        },
        yaxis: {
          min: 0,
          max: 100,
        },
        title: {
          text: "Pourcentage du nombre de commandes par heures",
          align: "left",
        },
      },
    };
  },
  async created() {
    const payloadUser = this.decodeToken(user.accessToken);
    var configRoles = {
      method: "get",
      url: window.location.origin.split(":80")[0] + ":8080/roles/",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    await axios(configRoles).then((response) => {
      response.data.forEach((role) => {
        this.roles.push({
          id: role.id,
          name: role.name,
        });
      });
    });
    //Get nb users
    var configUsers = {
      method: "get",
      url: window.location.origin.split(":80")[0] + ":8080/users",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    await axios(configUsers).then((response) => {
      response.data.forEach((user) => {
        var role = this.roles.find((role) => role.id === user.roleId);
        this.users.push({
          id: user.id,
          Name: user.name,
          Email: user.email,
          Adresse: user.address,
          Role: role.name,
          City: user.city,
          SponsorshipCode: user.sponsorshipCode,
          Date: user.createdAt.split("T")[0],
          Heure: user.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    //Get nb livreurs
    var roleLivreurId = "";
    this.roles.forEach((role) => {
      if (role.name === "Livreur") roleLivreurId = role.id;
    });

    var configLivreurs = {
      method: "get",
      url:
        window.location.origin.split(":80")[0] +
        ":8080/users/get/role/" +
        roleLivreurId,
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    await axios(configLivreurs).then((response) => {
      response.data.forEach((livreur) => {
        this.livreurs.push({
          id: livreur.id,
          Name: livreur.name,
          Email: livreur.email,
          Adresse: livreur.address,
          Role: "Livreur",
          Date: livreur.createdAt.split("T")[0],
          Heure: livreur.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    //Get nb clients
    var roleClientId = "";
    this.roles.forEach((role) => {
      if (role.name === "Client") roleClientId = role.id;
    });
    var configClients = {
      method: "get",
      url:
        window.location.origin.split(":80")[0] +
        ":8080/users/get/role/" +
        roleClientId,
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    await axios(configClients).then((response) => {
      response.data.forEach((client) => {
        this.clients.push({
          id: client.id,
          Name: client.name,
          Email: client.email,
          Adresse: client.address,
          Role: "Client",
          Date: client.createdAt.split("T")[0],
          Heure: client.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    //Get nb restaurateurs
    var roleRestaurateurId = "";
    this.roles.forEach((role) => {
      if (role.name === "Restaurateur") roleRestaurateurId = role.id;
    });
    var configRestaurateurs = {
      method: "get",
      url:
        window.location.origin.split(":80")[0] +
        ":8080/users/get/role/" +
        roleRestaurateurId,
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    await axios(configRestaurateurs).then((response) => {
      response.data.forEach((restaurateur) => {
        this.restaurateurs.push({
          id: restaurateur.id,
          Name: restaurateur.name,
          Email: restaurateur.email,
          Adresse: restaurateur.address,
          Role: "Restaurateur",
          Date: restaurateur.createdAt.split("T")[0],
          Heure: restaurateur.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    //Get nb commerciaux
    var roleCommerciauxId = "";
    this.roles.forEach((role) => {
      if (role.name === "Commercial") roleCommerciauxId = role.id;
    });
    var configCommerciaux = {
      method: "get",
      url:
        window.location.origin.split(":80")[0] +
        ":8080/users/get/role/" +
        roleCommerciauxId,
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    await axios(configCommerciaux).then((response) => {
      response.data.forEach((commerciaux) => {
        this.commerciaux.push({
          id: commerciaux.id,
          Name: commerciaux.name,
          Email: commerciaux.email,
          Adresse: commerciaux.address,
          Role: "Commercial",
          Date: commerciaux.createdAt.split("T")[0],
          Heure: commerciaux.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    //Get nb technique
    var roleTechniqueId = "";
    this.roles.forEach((role) => {
      if (role.name === "Technique") roleTechniqueId = role.id;
    });
    var configTechniques = {
      method: "get",
      url:
        window.location.origin.split(":80")[0] +
        ":8080/users/get/role/" +
        roleTechniqueId,
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    await axios(configTechniques).then((response) => {
      response.data.forEach((technique) => {
        this.techniques.push({
          id: technique.id,
          Name: technique.name,
          Email: technique.email,
          Adresse: technique.address,
          Role: "Technique",
          Date: technique.createdAt.split("T")[0],
          Heure: technique.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    //Get nb technique
    var roleDevTiersId = "";
    this.roles.forEach((role) => {
      if (role.name === "Developpeur Tiers") roleDevTiersId = role.id;
    });
    var configDevTiers = {
      method: "get",
      url:
        window.location.origin.split(":80")[0] +
        ":8080/users/get/role/" +
        roleDevTiersId,
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    await axios(configDevTiers).then((response) => {
      response.data.forEach((devTiers) => {
        this.devTiers.push({
          id: devTiers.id,
          Name: devTiers.name,
          Email: devTiers.email,
          Adresse: devTiers.address,
          Role: "Developpeur Tiers",
          Date: devTiers.createdAt.split("T")[0],
          Heure: devTiers.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    //Get nb commandes
    var configOrders = {
      method: "get",
      url: window.location.origin.split(":80")[0] + ":8080/api/orders/",
      headers: {
        Authorization: "Bearer " + user.accessToken,
        "X-Server-Select": "mongo",
      },
    };
    await axios(configOrders).then((response) => {
      response.data.orders.forEach((order) => {
        this.commandes.push({
          id: order._id,
          Date: order.createdAt.split("T")[0],
          Heure: order.createdAt.split("T").pop().split(".")[0],
          IdClient: order.idClient,
          IdLivreur: order.idLivreur,
          IdRestaurant: order.idRestaurant,
          Articles: order.articles,
          ActiveCodeSponsorhsip: order.activeCodeSponsorhsip,
          State: order.state,
        });
      });
    });
    //Get nb restaurants
    var configRestaurant = {
      method: "get",
      url: window.location.origin.split(":80")[0] + ":8080/api/restaurants/",
      headers: {
        Authorization: "Bearer " + user.accessToken,
        "X-Server-Select": "mongo",
      },
    };
    await axios(configRestaurant).then((response) => {
      response.data.restaurants.forEach((restaurant) => {
        this.restaurants.push({
          id: restaurant._id,
          Name: restaurant.name,
          Adresse: restaurant.address,
          Articles: restaurant.articles,
          IdRestaurateur: restaurant.idRestaurateur,
          Date: restaurant.createdAt.split("T")[0],
          Heure: restaurant.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    //Get articles
    var configArticles = {
      method: "get",
      url: window.location.origin.split(":80")[0] + ":8080/api/articles/",
      headers: {
        Authorization: "Bearer " + user.accessToken,
        "X-Server-Select": "mongo",
      },
    };
    await axios(configArticles).then((response) => {
      response.data.articles.forEach((article) => {
        this.articles.push({
          id: article._id,
          Name: article.name,
          Description: article.detail,
          Prix: article.price,
          Date: article.createdAt.split("T")[0],
          Heure: article.createdAt.split("T").pop().split(".")[0],
        });
      });
    });
    this.restaurantOfRestaurateur = this.restaurants.filter(
      (restaurant) => restaurant.IdRestaurateur == payloadUser.userId
    )[0];
    this.commandes.forEach((commande) => {
      if (commande.IdRestaurant == this.restaurantOfRestaurateur.id) {
        this.numberCommandesTotals++;
        this.commandesForThisRestaurant.push(commande);
      }
    });
    this.numberArticles = this.restaurantOfRestaurateur.Articles.length;
    var obj = [];
    for (var i = 0; i < this.commandesForThisRestaurant.length; i++) {
      if (!obj[this.commandesForThisRestaurant[i].IdClient]) {
        obj[this.commandesForThisRestaurant[i].IdClient] = 1;
        this.numberClientsTotals++;
      } else if (obj[this.commandesForThisRestaurant[i].IdClient]) {
        obj[this.commandesForThisRestaurant[i].IdClient] += 1;
      }
    }
    var priceCommande = 0;
    this.commandesForThisRestaurant.forEach((commande) => {
      commande.Articles.forEach((article) => {
        this.articles.forEach((article2) => {
          if (article._id == article2.id) {
            priceCommande += article2.Prix;
          }
        });
      });
    });
    this.meanCard = priceCommande / this.numberCommandesTotals;

    this.commandesForThisRestaurant.forEach((commande) => {
      console.log(commande);
      if (!this.commandsPerHour[parseInt(commande.Heure.split(":")[0])]) {
        if (commande.Heure.split(":")[0][0] === "0") {
          console.log(commande.Heure.split(":")[0][1]);
          this.commandsPerHour[commande.Heure.split(":")[0][1]] = 1;
        } else {
          this.commandsPerHour[commande.Heure.split(":")[0]] = 1;
        }
      } else if (this.commandsPerHour[parseInt(commande.Heure.split(":")[0])]) {
        if (commande.Heure.split(":")[0][0] === "0") {
          this.commandsPerHour[commande.Heure.split(":")[0][1]] = 1;
        } else {
          this.commandsPerHour[commande.Heure.split(":")[0]] += 1;
        }
      }
    });
    this.series.data = [
      Number.parseFloat(
        (this.commandsPerHour[0] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[1] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[2] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[3] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[4] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[5] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[6] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[7] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[8] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[9] * 100) / this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[10] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[11] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,

      Number.parseFloat(
        (this.commandsPerHour[12] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[13] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[14] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[15] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[16] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[17] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[18] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[19] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[20] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[21] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[22] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
      Number.parseFloat(
        (this.commandsPerHour[23] * 100) /
          this.commandesForThisRestaurant.length
      ).toFixed(2) || 0,
    ];
    console.log(this.series.data);
    i = 0;
    this.series.data.forEach((data) => {
      if (data === "NaN") this.series.data[i] = 0;
      i++;
    });

    this.updateSeriesLine();
  },
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
