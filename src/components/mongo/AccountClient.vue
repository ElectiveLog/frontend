<template>
  <div>
    <div class="card-header">
      <h4 class="card-heading">Modifier son profil</h4>
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
                placeholder="Nom"
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

          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Numéro</label>
              <input
                class="form-control"
                type="number"
                v-model="userData.streetNumber"
                placeholder="Numéro"
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
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Ville</label>
              <input
                class="form-control"
                type="text"
                v-model="userData.city"
                placeholder="Ville"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Pays</label>
              <input
                class="form-control"
                type="text"
                v-model="userData.country"
                placeholder="Pays"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Numéro de téléphone</label>
              <input
                class="form-control"
                type="phone"
                v-model="userData.phoneNumber"
                placeholder="Numéro de téléphone"
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
      <h4 class="card-heading">Commandes en cours</h4>
      <b-alert v-if="inProgressCommandes.length == 0" show
        >Aucune commande en cours !</b-alert
      >

      <b-table
        v-else
        hover
        small
        outlined
        borderred
        fixed
        responsive
        primary-key
        :items="inProgressCommandes"
        :fields="fields"
      >
        <template #cell(show_details)="row">
          <b-button
            variant="dark"
            size="sm"
            @click="row.toggleDetails"
            class="mr-2"
          >
            {{ row.detailsShowing ? "Cacher" : "Afficher" }}
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Date et heure de la commande: </b>Le {{ row.item.date }} à
                {{ row.item.heure }}</b-col
              >
            </b-row>
            <b-row v-if="row.item.parainage != null" class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Parainage: </b>{{ row.item.parainage }}</b-col
              >
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Numéro: </b>{{ row.item.streetNumber }}</b-col
              >
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Adresse: </b>{{ row.item.addresse }}</b-col
              >
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Ville: </b>{{ row.item.city }}</b-col
              >
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Numéro de téléphone: </b>{{ row.item.phoneNumber }}</b-col
              >
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Pays: </b>{{ row.item.country }}</b-col
              >
            </b-row>
          </b-card>
        </template></b-table
      >
    </div>
    <div class="card-header">
      <h4 class="card-heading">Historique des commandes</h4>

      <div>
        <b-alert v-if="historyCommandes.length == 0" show
          >Vous n'avez pas encore passé de commande!!</b-alert
        >
        <b-table
          v-else
          hover
          small
          outlined
          borderred
          fixed
          responsive
          primary-key
          :items="historyCommandes"
          :fields="fields"
        >
          <template #cell(show_details)="row">
            <b-button
              variant="dark"
              size="sm"
              @click="row.toggleDetails"
              class="mr-2"
            >
              {{ row.detailsShowing ? "Cacher" : "Afficher" }}
            </b-button>
          </template>

          <template #row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Date et heure de la commande: </b>Le {{ row.item.date }} à
                  {{ row.item.heure }}</b-col
                >
              </b-row>
              <b-row v-if="row.item.parainage != null" class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Parainage: </b>{{ row.item.parainage }}</b-col
                >
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Numéro: </b>{{ row.item.streetNumber }}</b-col
                >
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Adresse: </b>{{ row.item.addresse }}</b-col
                >
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Ville: </b>{{ row.item.city }}</b-col
                >
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Numéro de téléphone: </b>{{ row.item.phoneNumber }}</b-col
                >
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Pays: </b>{{ row.item.country }}</b-col
                >
              </b-row>
            </b-card>
          </template></b-table
        >
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
      image: [],
      fields: [
        {
          key: "Commande",
          label: "Commande"
        },
        {
          key: "prix",
          label: "Prix"
        },
        { key: "livreur", label: "Livreur" },
        { key: "restaurant", label: "Restaurant" },
        { key: "status", label: "Status" },
        { key: "show_details", label: "Details" }
      ]
    };
  },
  methods: {
    handleEdit() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        method: "put",
        url: "http://10.117.129.194:8080/users/" + payloadUser.userId,
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
      console.log("ijifejife");
      var configLog = {
        method: "post",
        url: "http://localhost:8080/api/logs/create",
        headers: {
          "X-Server-Select": "mongo"
        },
        data: {
          type: "Modification",
          description: payloadUser.email + "(Client) a modifié son compte."
        }
      };
      axios(configLog)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDelete() {
      const payloadUser = this.decodeToken(user.accessToken);

      var configLog = {
        method: "post",
        url: "http://localhost:8080/api/logs/create",
        headers: {
          "X-Server-Select": "mongo"
        },
        data: {
          type: "Suppression",
          description: payloadUser.email + "(Client) a supprimé son compte."
        }
      };
      axios(configLog)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
      var config = {
        method: "delete",
        url: "http://10.117.129.194:8080/users/" + payloadUser.userId,
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
    var config = {
      method: "get",
      url: "http://10.117.129.194:8080/users/" + payloadUser.userId,
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
    console.log(payloadUser.userId);
    var configCommande = {
      method: "get",
      url: "http://10.117.129.194:8080/api/orders/client/" + payloadUser.userId,
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
          console.log(element);
          element.articles.forEach(article => {
            priceCommande += article.price;
          });
          if (this.userData.sponsorshipCode) {
            priceCommande = priceCommande * 0.9;
          }

          var config = {
            method: "get",
            url: "http://10.117.129.194:8080/users/" + element.idLivreur,
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
                  status: "livrée",
                  date: element.createdAt.split("T")[0],
                  heure: element.createdAt
                    .split("T")
                    .pop()
                    .split(".")[0],
                  addresse: this.userData.address,
                  streetNumber: this.userData.streetNumber,
                  city: this.userData.city,
                  phoneNumber: this.userData.phoneNumber,
                  country: this.userData.country,
                  parnainage: this.userData.sponsorshipCode
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
                    .split(".")[0],
                  addresse: this.userData.address,
                  streetNumber: this.userData.streetNumber,
                  city: this.userData.city,
                  phoneNumber: this.userData.phoneNumber,
                  country: this.userData.country,
                  parnainage: this.userData.sponsorshipCode
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
