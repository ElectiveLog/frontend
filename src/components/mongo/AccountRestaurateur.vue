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
      <h4 class="card-heading">Commandes en attente</h4>
      <b-alert v-if="waitCommandes.length == 0" show
        >Aucune commande en attente!!!</b-alert
      >

      <b-table
        v-else
        striped
        hover
        borderred
        primary-key
        responsive
        :items="waitCommandes"
        :fields="fields"
      >
        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="handleEditStatus(row.item)"
            class="green_button styled_button"
          >
            Validé
          </b-button>
        </template></b-table
      >
    </div>

    <div class="card-header">
      <h4 class="card-heading">Commandes en cours</h4>
      <b-alert v-if="inProgressCommandes.length == 0" show
        >Aucune commande en cours!!!</b-alert
      >

      <b-table
        v-else
        striped
        hover
        borderred
        primary-key
        responsive
        :items="inProgressCommandes"
      ></b-table>
    </div>

    <div class="card-header">
      <h4 class="card-heading">Historique des commandes</h4>

      <div>
        <b-alert v-if="historyCommandes.length == 0" show
          >Aucun client n'a encore passé de commande!!!</b-alert
        >

        <b-table
          striped
          hover
          borderred
          primary-key
          responsive
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
  name: "AccountRestaurateur",
  data() {
    return {
      userData: [],
      waitCommandes: [],
      fields: [
        {
          key: "Commande",
          label: "Commande"
        },
        {
          key: "prix",
          label: "Prix"
        },
        { key: "Articles", label: "articles" },
        {
          key: "livreur",
          label: "Livreur"
        },
        {
          key: "client",
          label: "client"
        },
        {
          key: "status",
          label: "Status"
        },
        {
          key: "date",
          label: "Date"
        },
        {
          key: "heure",
          label: "Heure"
        },
        {
          key: "actions",
          label: "Actions"
        }
      ],
      inProgressCommandes: [],
      historyCommandes: []
    };
  },
  methods: {
    handleEditStatus(commande) {
      var data = JSON.stringify({
        state: "preparation"
      });

      var config = {
        method: "put",
        url: "http://localhost:8080/api/orders/" + commande.id,
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
  async created() {
    const payloadUser = this.decodeToken(user.accessToken);
    console.log(payloadUser);
    var config = {
      method: "get",
      url: "http://localhost:8080/users/" + payloadUser.userId,
      headers: {
        Authorization: "Bearer " + user.accessToken
      }
    };

    await axios(config)
      .then(response => {
        this.userData = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    var configRestaurant = {
      method: "get",
      url:
        "http://localhost:8080/api/restaurants/restaurateur/cl4sgs78c000301pymyl10x6o",
      headers: {
        "X-Server-Select": "mongo"
      }
    };

    await axios(configRestaurant).then(async response => {
      var i = 1;
      var y = 1;
      var z = 1;
      response.data.restaurants
        .forEach(async restaurant => {
          var config = {
            method: "get",
            url:
              "http://localhost:8080/api/orders/restaurant/" + restaurant._id,
            headers: {
              "X-Server-Select": "mongo"
            }
          };

          await axios(config)
            .then(response => {
              var priceCommande = 0;
              response.data.order.forEach(async order => {
                var configLivreur = {
                  method: "get",
                  url: "http://localhost:8080/users/" + order.idLivreur,
                  headers: {
                    Authorization: "Bearer " + user.accessToken
                  }
                };

                await axios(configLivreur)
                  .then(response => {
                    order.idLivreur = response.data.name;
                  })
                  .catch(function(error) {
                    console.log(error);
                  });

                var configClient = {
                  method: "get",
                  url: "http://localhost:8080/users/" + order.idClient,
                  headers: {
                    Authorization: "Bearer " + user.accessToken
                  }
                };

                await axios(configClient)
                  .then(response => {
                    order.idClient = response.data.name;
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
                var articlesNames = "";
                order.articles.forEach(article => {
                  priceCommande += article.price;
                  articlesNames += article.name + ", ";
                });
                const articleNames = articlesNames.substring(
                  0,
                  articlesNames.length - 2
                );

                if (order.state == "commande") {
                  this.waitCommandes.push({
                    id: order._id,
                    Commande: "Commande n°" + i,
                    prix: priceCommande + "€",
                    articles: articleNames,
                    livreur: order.idLivreur,
                    client: order.idClient,
                    status: order.state,
                    date: order.createdAt.split("T")[0],
                    heure: order.createdAt
                      .split("T")
                      .pop()
                      .split(".")[0]
                  });
                  i++;
                } else if (
                  order.state == "preparation" ||
                  order.state == "livraison"
                ) {
                  this.inProgressCommandes.push({
                    Commande: "Commande n°" + y,
                    prix: priceCommande + "€",
                    articles: articleNames,
                    livreur: order.idLivreur,
                    client: order.idClient,
                    status: order.state,
                    date: order.createdAt.split("T")[0],
                    heure: order.createdAt
                      .split("T")
                      .pop()
                      .split(".")[0]
                  });

                  y++;
                } else if (order.state == "prepared") {
                  this.historyCommandes.push({
                    Commande: "Commande n°" + z,
                    prix: priceCommande + "€",
                    articles: articleNames,
                    livreur: order.idLivreur,
                    client: order.idClient,
                    status: order.state,
                    date: order.createdAt.split("T")[0],
                    heure: order.createdAt
                      .split("T")
                      .pop()
                      .split(".")[0]
                  });

                  z++;
                }
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
};
</script>
