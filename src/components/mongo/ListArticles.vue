<template>
  <div class="list row">
    <div class="col-md-8">
      <!-- <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Rechercher un article"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Chercher
          </button>
        </div>
      </div> -->
    </div>
    <div class="col-md-6">
      <h2>Liste de vos articles / menus</h2>
      <a class="space_bottom">{{ validation }}</a>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(article, index) in articles"
          :key="index"
          @click="setActiveArticle(article, index)"
        >
          {{ article.name }}
        </li>
      </ul>
      <button class="m-2 red_button styled_button" @click="deleteArticle()">
        Supprimer
      </button>
      <button class="m-2 blue_button styled_button" @click="updateArticle()">
        Modifier
      </button>
      <button
        class="m-2 grey_button styled_button"
        @click="unsetActiveArticle()"
      >
        Dessélectionner
      </button>
      <button class="m-2 green_button styled_button" @click="reload()">
        Actualiser
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentArticle">
        <h4>Article / menu</h4>
        <div>
          <label><strong>Nom :</strong></label> {{ currentArticle.name }}
        </div>
        <div>
          <label><strong>Type :</strong></label>
          {{ currentArticle.type }}
        </div>
        <div>
          <label><strong>Prix :</strong></label>
          {{ currentArticle.price }}
        </div>
        <!-- <div>
          <label><strong>Id :</strong></label>
          {{ currentArticle._id }}
        </div> -->
        <div>
          <label><strong>Détail :</strong></label>
          {{ currentArticle.detail }}
        </div>
        <div>
          <label><strong>Image :</strong></label>
          <img v-bind:src="currentArticle.picture" />
        </div>
        <!-- <a class="badge badge-warning" :href="'/articles/' + currentArticle.id">
        <div>
          <label><strong>Image :</strong></label>
          <img v-bind:src="currentArticle.picture" />
        </div>
        <a class="badge badge-warning" :href="'/articles/' + currentArticle.id">
          Edit
        </a> -->
      </div>
    </div>
    &emsp;
    <!-- Modifier -->
    <h2>Modifier un article / menu</h2>
    <a
      >L'article sélectionné au dessus sera modifié avec les champs que vous
      aurez renseignés. Les champs vides ne seront pas pris en compte</a
    >
    <form v-on:submit.prevent="updateArticle">
      <div class="form-group">
        <label for="name">Nom</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Nom de l'article"
          v-model="form.name"
        />
      </div>
      <div class="form-group">
        <label for="type">Type d'article</label>
        <input
          type="text"
          class="form-control"
          id="type"
          placeholder="Selectionner un type"
          v-model="form.type"
        />
      </div>
      <div class="form-group">
        <label for="price">Prix</label>
        <input
          type="number"
          class="form-control"
          id="price"
          placeholder="Prix"
          v-model="form.price"
        />
      </div>
      <div class="form-group">
        <label for="detail">Détail</label>
        <input
          type="text"
          class="form-control"
          id="detail"
          placeholder="Détail"
          v-model="form.detail"
        />
      </div>
      <div class="form-group space_up">
        <input
          @change="handleImage"
          class="custom-input"
          type="file"
          accept="image/*"
        />
      </div>
      &nbsp;
      <div @click="scrollToTop">
        <div class="form-group">
          <button class="green_button styled_button">Valider</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "../../services/DataService";
import axios from "axios";
import jwt_decode from "jwt-decode";
const user = JSON.parse(localStorage.getItem("user"));
export default {
  name: "articles-list",
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
      restaurantArticles: "",
      form: {
        name: "",
        type: "",
        price: "",
        detail: "",
        picture: ""
      },
      validation: "",
      image: ""
    };
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
    retrieveArticles() {
      this.payloadUser = this.decodeToken(user.accessToken);
      this.userId = this.payloadUser.userId;
      console.log("Utilisateur: " + this.userId);
      DataService.getAllRestaurantsByRestaurateur(this.payloadUser.userId)
        .then(response => {
          this.restaurantId = response.data.restaurants[0]._id;
          console.log("Utilisateur: " + this.userId);
          console.log("le restau: " + this.restaurantId);
          DataService.getOneRestaurant(this.restaurantId).then(response => {
            this.restaurantArticles = response.data.restaurant.articles;
            console.log(response.data.restaurant.articles);
            const allRestaurantArticles = this.restaurantArticles;
            const allArticles = this.articles;
            allRestaurantArticles.forEach(element => {
              console.log(element);
              DataService.getOneArticle(element)
                .then(response => {
                  allArticles.push(response.data.article);
                  console.log(allArticles);
                })
                .catch(e => {
                  console.log(e);
                });
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    // to get all
    // retrieveArticles() {
    //   DataService.getAllArticles()
    //     .then((response) => {
    //       this.articles = response.data.articles;
    //       console.log(response.data.articles);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    // Test with Burger King
    // retrieveArticles() {
    //   const restaurantId = "62bc06825573eae221135afa";
    //   DataService.getOneRestaurant(restaurantId).then((response) => {
    //     this.restaurantArticles = response.data.restaurant.articles;
    //     console.log(response.data.restaurant.articles);
    //     const allRestaurantArticles = this.restaurantArticles;
    //     const allArticles = this.articles;
    //     allRestaurantArticles.forEach((element) => {
    //       console.log(element);
    //       DataService.getOneArticle(element)
    //         .then((response) => {
    //           allArticles.push(response.data.article);
    //           console.log(allArticles);
    //         })
    //         .catch((e) => {
    //           console.log(e);
    //         });
    //     });
    //   });
    // },

    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },
    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
    },
    unsetActiveArticle() {
      this.currentArticle = null;
      this.currentIndex = null;
    },
    deleteArticle() {
      DataService.deleteArticle(this.currentArticle._id)
        .then(response => {
          console.log(response.data.articles);
          // get the list of articles in the restaurant
          const allRestaurantArticles = this.restaurantArticles;
          const toDelete = this.currentArticle._id;
          console.log(allRestaurantArticles);
          console.log(toDelete);
          // get the new list of articles (the previous one without the articles just deleted)
          let difference = allRestaurantArticles.filter(
            x => !toDelete.includes(x)
          );

          var configLog = {
            method: "post",
            url: "http://10.117.129.194:8080/api/logs/create",
            headers: {
              "X-Server-Select": "mongo"
            },
            data: {
              type: "Suppression",
              description: "Article supprimé : " + this.currentArticle.name
            }
          };
          axios(configLog)
            .then(response => {
              console.log(JSON.stringify(response.data));
            })
            .catch(error => {
              console.log(error);
            });
          console.log("result :");
          console.log(difference);
          console.log(this.restaurantId);
          axios.put(
            `http://10.117.129.194:8080/api/restaurants/${this.restaurantId}`,
            {
              articles: difference
            },
            {
              headers: {
                "X-Server-Select": "mongo"
              }
            }
          );
        })
        .catch(e => {
          console.log(e);
        });

      // get the list of articles in the restaurant
      const allRestaurantArticles = this.restaurantArticles;
      const toDelete = this.currentArticle._id;

      // get the new list of articles (the previous one without the articles just deleted)
      let difference = allRestaurantArticles.filter(x => !toDelete.includes(x));
      console.log("result :");
      console.log(difference);
      axios.put(
        `http://10.117.129.194:8080/api/restaurants/${this.restaurantId}`,
        {
          articles: difference
        },
        {
          headers: {
            "X-Server-Select": "mongo"
          }
        }
      );
      this.reload();
      // this.refreshList();
      this.validation = "Suppression réussie, actualisez la liste.";
    },
    updateArticle() {
      this.form.picture = this.image;
      const articleId = this.currentArticle._id;

      var configLog = {
        method: "post",
        url: "http://10.117.129.194:8080/api/logs/create",
        headers: {
          "X-Server-Select": "mongo"
        },
        data: {
          type: "Modification",
          description: "Article modifié : " + this.currentArticle.name
        }
      };
      axios(configLog)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
      if (this.form.name !== "") {
        axios.put(
          `http://10.117.129.194:8080/api/articles/${articleId}`,
          {
            name: this.form.name
          },
          {
            headers: {
              "X-Server-Select": "mongo"
            }
          }
        );
      }
      if (this.form.type !== "") {
        axios.put(
          `http://10.117.129.194:8080/api/articles/${articleId}`,
          {
            type: this.form.type
          },
          {
            headers: {
              "X-Server-Select": "mongo"
            }
          }
        );
      }
      if (this.form.price !== "") {
        axios.put(
          `http://10.117.129.194:8080/api/articles/${articleId}`,
          {
            price: this.form.price
          },
          {
            headers: {
              "X-Server-Select": "mongo"
            }
          }
        );
      }
      if (this.form.detail !== "") {
        axios.put(
          `http://10.117.129.194:8080/api/articles/${articleId}`,
          {
            detail: this.form.detail
          },
          {
            headers: {
              "X-Server-Select": "mongo"
            }
          }
        );
      }
      if (this.form.picture !== "") {
        axios.put(
          `http://10.117.129.194:8080/api/articles/${articleId}`,
          {
            picture: this.form.picture
          },
          {
            headers: {
              "X-Server-Select": "mongo"
            }
          }
        );
      }
      this.reload();
    },
    reload() {
      location.reload();
    },
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = e => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }

    // searchName() {
    //   DataService.find(this.name)
    //     .then((response) => {
    //       this.articles = response.data;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
  },
  mounted() {
    this.retrieveArticles();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
  margin-bottom: 50px;
}

a {
  text-decoration: none;
  color: black;
}
.space_up {
  margin-top: 10px;
}
</style>
