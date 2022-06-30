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
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="green_button styled_button" type="submit">
          Sauvegarder les modifications
        </button>
      </div>
    </form>
    <div class="card-header">
      <h4 class="card-heading">Commande·s en attente</h4>
      <b-alert v-if="awaitCommandes.length == 0" show
        >Aucune commande en attente!!!</b-alert
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
        :items="awaitCommandes"
        :fields="fields"
      >
        <template #cell(actions)="row">
          <b-button
            size="sm"
            variant="dark"
            @click="handleEditStatus(row.item)"
            class="text-sm-right"
          >
            Valider
          </b-button>
        </template>
        <template #cell(show_details)="row">
          <b-button
            size="sm"
            variant="dark"
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
                ><b>Numéro de rue: </b>{{ row.item.streetNumber }}</b-col
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
      <h4 class="card-heading">Commande·s en cours</h4>
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
        <template #cell(actions)="row">
          <b-button
            size="sm"
            variant="dark"
            @click="handleEditStatusLivraison(row.item)"
            class="text-sm-right"
          >
            Valider
          </b-button>
        </template>
        <template #cell(show_details)="row">
          <b-button
            size="sm"
            variant="dark"
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
                ><b>Numéro de rue: </b>{{ row.item.streetNumber }}</b-col
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
          >Aucun client n'a passé de commande !</b-alert
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
          :fields="fieldsMore"
        >
          <template #cell(show_details)="row">
            <b-button
              size="sm"
              variant="dark"
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
                  ><b>Numéro de rue: </b>{{ row.item.streetNumber }}</b-col
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
  name: "AccountLivreur",
  data() {
    return {
      userData: [],
      awaitCommandes: [],
      inProgressCommandes: [],
      fields: [
        {
          key: "Commande",
          label: "Commande"
        },
        {
          key: "prix",
          label: "Prix"
        },
        {
          key: "client",
          label: "Client"
        },
        {
          key: "restaurant",
          label: "Restaurant"
        },
        {
          key: "status",
          label: "Status"
        },
        {
          key: "actions",
          label: "Action"
        },
        { key: "show_details", label: "Details" }
      ],
      fieldsMore: [
        {
          key: "Commande",
          label: "Commande"
        },
        {
          key: "prix",
          label: "Prix"
        },
        { key: "articles", label: "Article·s" },
        { key: "livreur", label: "Livreur" },
        { key: "client", label: "Client" },
        { key: "status", label: "Status" },
        { key: "show_details", label: "Details" }
      ],
      historyCommandes: []
    };
  },
  methods: {
    handleEditStatus(commande) {
      if (this.inProgressCommandes.length != 0) {
        return this.$notify({
          group: "foo",
          title: "Erreur",
          type: "error",
          text: "Vous avez déjà une commande en cours!!!",
          duration: 8000
        });
      }
      this.$socket.emit("OrderAcceptLivreur", "1");
      const payloadUser = this.decodeToken(user.accessToken);
      var data = JSON.stringify({
        state: "livraison",
        idLivreur: payloadUser.userId
      });

      var configLog = {
        method: "post",
        url: window.location.origin.split(":80")[0] + ":8080/api/logs/create",
        headers: {
          "X-Server-Select": "mongo"
        },
        data: {
          type: "StatusCommande",
          description:
            payloadUser.email +
            " a modifié le status de la commande " +
            commande.id +
            " à livraison."
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
        method: "put",
        url:
          window.location.origin.split(":80")[0] +
          ":8080/api/orders/" +
          commande.id,
        headers: {
          "X-Server-Select": "mongo",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU3NTg3MjUsImV4cCI6MTY1NjM2MzUyNX0.vHdiEc98ELrbBDbeZeG-851qS_SLSHJW8HDJX7mPgjs",
          "Content-Type": "application/json"
        },
        data: data
      };

      axios(config)
        .then(() => {
          this.$notify({
            group: "foo",
            title: "Commande validée",
            type: "success",
            text: "La commande a été validée avec succès",
            duration: 8000
          });
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleEditStatusLivraison(commande) {
      const payloadUser = this.decodeToken(user.accessToken);
      var data = JSON.stringify({
        state: "prepared",
        idLivreur: payloadUser.userId
      });
      this.$socket.emit("OrderLivre", "1");

      var configLog = {
        method: "post",
        url: window.location.origin.split(":80")[0] + ":8080/api/logs/create",
        headers: {
          "X-Server-Select": "mongo"
        },
        data: {
          type: "StatusCommande",
          description:
            payloadUser.email +
            " a modifié le status de la commande " +
            commande.id +
            " à prepared."
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
        method: "put",
        url:
          window.location.origin.split(":80")[0] +
          ":8080/api/orders/" +
          commande.id,
        headers: {
          "X-Server-Select": "mongo",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU3NTg3MjUsImV4cCI6MTY1NjM2MzUyNX0.vHdiEc98ELrbBDbeZeG-851qS_SLSHJW8HDJX7mPgjs",
          "Content-Type": "application/json"
        },
        data: data
      };

      axios(config)
        .then(() => {
          this.$notify({
            group: "foo",
            title: "Commande validée",
            type: "success",
            text: "La commande a été validée avec succès",
            duration: 8000
          });
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleEdit() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        method: "put",
        url:
          window.location.origin.split(":80")[0] +
          ":8080/users/" +
          payloadUser.userId,
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
      var configLog = {
        method: "post",
        url: window.location.origin.split(":80")[0] + ":8080/api/logs/create",
        headers: {
          "X-Server-Select": "mongo"
        },
        data: {
          type: "Modification",
          description: payloadUser.email + "(Livreur) a modifié son compte."
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
        url: window.location.origin.split(":80")[0] + ":8080/api/logs/create",
        headers: {
          "X-Server-Select": "mongo"
        },
        data: {
          type: "Suppression",
          description: payloadUser.email + "(Livreur) a supprimé son compte."
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
        url:
          window.location.origin.split(":80")[0] +
          ":8080/users/" +
          payloadUser.userId,
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
      url:
        window.location.origin.split(":80")[0] +
        ":8080/users/" +
        payloadUser.userId,
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

    var configpreparation = {
      method: "get",
      url:
        window.location.origin.split(":80")[0] +
        ":8080/api/orders/status/preparation",
      headers: {
        "X-Server-Select": "mongo"
      }
    };

    axios(configpreparation)
      .then(response => {
        response.data.order.forEach(element => {
          var priceCommande = 0;
          element.articles.forEach(article => {
            priceCommande += article.price;
          });

          var config = {
            method: "get",
            url:
              window.location.origin.split(":80")[0] +
              ":8080/users/" +
              element.idClient,
            headers: {
              Authorization: "Bearer " + user.accessToken
            }
          };
          axios(config).then(response => {
            if (response.data.sponsorshipCode) {
              priceCommande = priceCommande * 0.9;
            }
            this.awaitCommandes.push({
              id: element._id,
              Commande: "Commande n°1",
              prix: priceCommande + "€",
              client: response.data.name,
              streetNumber: response.data.streetNumber,
              address: response.data.address,
              city: response.data.city,
              country: response.data.country,
              phoneNumber: response.data.phoneNumber,
              restaurant: element.idRestaurant.name,
              status: element.state,
              parnainage: response.data.sponsorshipCode,
              date: element.createdAt.split("T")[0],
              heure: element.createdAt
                .split("T")
                .pop()
                .split(".")[0]
            });
          });
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    var configCommande = {
      method: "get",
      url:
        window.location.origin.split(":80")[0] +
        ":8080/api/orders/livreur/" +
        payloadUser.userId,
      headers: {
        "X-Server-Select": "mongo"
      }
    };

    axios(configCommande)
      .then(response => {
        console.log(response.dataorder);
        var i = 1;
        response.data.order.forEach(element => {
          var priceCommande = 0;
          element.articles.forEach(article => {
            priceCommande += article.price;
          });

          var config = {
            method: "get",
            url:
              window.location.origin.split(":80")[0] +
              ":8080/users/" +
              element.idClient,
            headers: {
              Authorization: "Bearer " + user.accessToken
            }
          };

          axios(config)
            .then(response => {
              if (response.data.sponsorshipCode) {
                priceCommande = priceCommande * 0.9;
              }
              if (element.state == "livraison") {
                this.inProgressCommandes.push({
                  id: element._id,
                  Commande: "Commande n°1",
                  prix: priceCommande + "€",
                  client: response.data.name,
                  streetNumber: response.data.streetNumber,
                  address: response.data.address,
                  city: response.data.city,
                  country: response.data.country,
                  phoneNumber: response.data.phoneNumber,
                  restaurant: element.idRestaurant.name,
                  status: element.state,
                  parnainage: response.data.sponsorshipCode,
                  date: element.createdAt.split("T")[0],
                  heure: element.createdAt
                    .split("T")
                    .pop()
                    .split(".")[0]
                });
                i++;
              } else if (element.state == "prepared") {
                this.historyCommandes.push({
                  Commande: "Commande n°" + i,
                  prix: priceCommande + "€",
                  client: response.data.name,
                  streetNumber: response.data.streetNumber,
                  address: response.data.address,
                  city: response.data.city,
                  country: response.data.country,
                  phoneNumber: response.data.phoneNumber,
                  restaurant: element.idRestaurant.name,
                  status: "Livrée",
                  parnainage: response.data.sponsorshipCode,
                  date: element.createdAt.split("T")[0],
                  heure: element.createdAt
                    .split("T")
                    .pop()
                    .split(".")[0]
                });
                i++;
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
