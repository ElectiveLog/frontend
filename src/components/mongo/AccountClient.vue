<template>
  <div>
    <div class="card-header">
      <h4 class="card-heading">Modifier son profile</h4>
    </div>
    <form class="card mb-4" @submit.prevent="handleEdit">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Nom</label>
              <input
                class="form-control"
                type="text"
                placeholder="Username"
                v-model="userData.name"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Adresse e-mail</label>
              <input
                class="form-control"
                type="email"
                placeholder="Email"
                v-model="userData.email"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-4">
              <label class="form-label">Adresse</label>
              <input
                class="form-control"
                type="text"
                placeholder="Home Address"
                v-model="userData.address"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="green_button styled_button" type="submit">
          Sauvegarder les modifications
        </button>
      </div>
    </form>
    <div class="card-header">
      <h4 class="card-heading">Historique des commandes</h4>
    </div>
    <div>
      <b-alert v-if="userCommandes" show
        >Vous n'avez pas encore passé de commande!!</b-alert
      >
      <b-table striped hover :items="userCommandes"></b-table>
    </div>

    <b-button
      id="red_button styled_button"
      @click="$bvModal.show('bv-modal-example')"
      variant="danger"
    >
      Supprimer son compte
    </b-button>

    <div>
      <b-modal id="bv-modal-example" hide-footer hide-header hide-backdrop>
        <div class="d-block text-center">
          <h3>
            Etes vous sur de vouloir supprimer le compte {{ userData.email }}
          </h3>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
          >Annuler</b-button
        >
        &emsp;
        <b-button
          class="mt-3"
          block
          @click="$bvModal.hide('bv-modal-example')"
          variant="danger"
          v-on:click="handleDelete"
          >Supprimer le compte</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
var axios = require("axios");
const user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "AccountClient",
  data() {
    return {
      userData: [],
      userCommandes: []
    };
  },
  methods: {
    handleEdit() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        method: "put",
        url: "http://localhost:8080/users/" + payloadUser.userId,
        headers: {
          Authorization: "Bearer " + user.accessToken
        },
        data: this.userData
      };

      axios(config)
        .then(
          this.$notify({
            group: "foo",
            title: "Modification réussie",
            type: "success",
            text: "Vos modifications ont été enregistrées",
            duration: 8000
          })
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        method: "delete",
        url: "http://localhost:8080/users/" + payloadUser.userId,
        headers: {
          Authorization: "Bearer " + user.accessToken
        }
      };

      axios(config)
        .then(() => {
          this.$notify({
            group: "foo",
            title: "Suppression réussie",
            type: "success",
            text: "Votre compte a été supprimé",
            duration: 8000
          });
          this.$store.dispatch("auth/logout");
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    decodeToken(token) {
      return jwt_decode(token);
    }
  },
  created() {
    const payloadUser = this.decodeToken(user.accessToken);
    console.log(payloadUser);
    var config = {
      method: "get",
      url: "http://localhost:8080/users/" + payloadUser.userId,
      headers: {
        Authorization: "Bearer " + user.accessToken
      }
    };

    axios(config)
      .then(response => {
        this.userData = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    var configCommande = {
      method: "get",
      url: "http://localhost:8080/api/orders/client/" + payloadUser.userId,
      headers: {
        "X-Server-Select": "mongo"
      }
    };

    axios(configCommande)
      .then(response => {
        var i = 1;
        response.data.order.forEach(element => {
          var priceCommande = 0;
          element.articles.forEach(article => {
            priceCommande += article.price;
          });

          var config = {
            method: "get",
            url: "http://localhost:8080/users/" + element.idLivreur,
            headers: {
              Authorization: "Bearer " + user.accessToken
            }
          };

          axios(config)
            .then(response => {
              this.userCommandes.push({
                Commande: "Commande n°" + i,
                prix: priceCommande + "€",
                livreur: response.data.name,
                restaurant: element.idRestaurant.name,
                status: element.state,
                date: element.createdAt.split("T")[0],
                heure: element.createdAt
                  .split("T")
                  .pop()
                  .split(".")[0]
              });
              i++;
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
