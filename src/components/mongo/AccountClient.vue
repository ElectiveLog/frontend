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

    <div>
      <label for="image">Upload Image</label>
      <input type="file" id="image" name="image" value="" ref="file" required />
      <button class="btn btn-success btn-sm float-right" @click="upload">
        Upload
      </button>
    </div>

    <div class="card-header">
      <h4 class="card-heading">Commandes en cours</h4>
      <b-alert v-if="inProgressCommandes.length == 0" show
        >Aucune commande en cours!!!</b-alert
      >

      <b-table
        v-else
        hover
        striped
        borderred
        responsive
        primary-key
        :items="inProgressCommandes"
      ></b-table>
    </div>
    <div class="card-header">
      <h4 class="card-heading">Historique des commandes</h4>

      <div>
        <b-alert v-if="historyCommandes.length == 0" show
          >Vous n'avez pas encore passé de commande!!</b-alert
        >
        <b-table
          striped
          hover
          borderred
          responsive
          primary-key
          :items="historyCommandes"
        ></b-table>
      </div>
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
      historyCommandes: [],
      inProgressCommandes: [],
      image: []
    };
  },
  methods: {
    upload() {
      console.log("uplo" + this.$refs.file.files.item(0));

      var data = JSON.stringify({
        name: "Burgermodifier",
        type: "plat",
        price: 1100,
        detail: "C'est un burger quoi",
        picture: this.$refs.file.files.item(0)
      });

      var config = {
        method: "post",
        url: "http://localhost:8080/api/articles/create",
        headers: {
          "X-Server-Select": "mongo",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU3NTg3MjUsImV4cCI6MTY1NjM2MzUyNX0.vHdiEc98ELrbBDbeZeG-851qS_SLSHJW8HDJX7mPgjs",
          "Content-Type": "application/json"
        },
        data: data
      };

      axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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
        .then(() => {
          this.$notify({
            group: "foo",
            title: "Modification réussie",
            type: "success",
            text: "Vos modifications ont été enregistrées",
            duration: 8000
          });
        })
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
        var y = 1;
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
              if (element.state == "prepared") {
                this.historyCommandes.push({
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
              } else {
                this.inProgressCommandes.push({
                  Commande: "Commande n°" + y,
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
                y++;
              }
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
