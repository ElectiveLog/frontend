<template>
  <div class="list row">
    <h2>Ajouter un article / menu</h2>
    <a
      >Après validation, l'article sera directement ajouté à votre
      restaurant.</a
    >
    <form v-on:submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nom *</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Nom de l'article"
          v-model="form.name"
          required="required"
        />
      </div>
      <div class="form-group">
        <label for="type">Type d'article *</label>
        <input
          type="text"
          class="form-control"
          id="type"
          placeholder="Selectionner un type"
          v-model="form.type"
          required="required"
        />
      </div>
      <div class="form-group">
        <label for="price">Prix *</label>
        <input
          type="number"
          class="form-control"
          id="price"
          placeholder="Prix"
          v-model="form.price"
          required="required"
        />
      </div>
      <div class="form-group">
        <label for="detail">Détail *</label>
        <input
          type="text"
          class="form-control"
          id="detail"
          placeholder="Détail"
          v-model="form.detail"
          required="required"
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
import axios from "axios";

// get the restaurant id
// const restaurantId = "62bc211e7cbcca78020f4411";
import jwt_decode from "jwt-decode";
const user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "PostFormAxios",
  data() {
    return {
      form: {
        name: "",
        type: "",
        price: "",
        detail: "",
        picture: ""
      },
      articles: {
        articles: ""
      }
    };
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
    async submitForm() {
      this.payloadUser = this.decodeToken(user.accessToken);
      this.userId = this.payloadUser.userId;
      this.form.picture = this.image;
      //get the restaurant id
      await axios
        .get(
          `http://10.117.129.194:8080/api/restaurants/restaurateur/${
            this.userId
          }`,
          {
            headers: {
              "X-Server-Select": "mongo"
            }
          }
        )
        .then(res => {
          this.restaurantId = res.data.restaurants[0]._id;
          console.log("Utilisateur: " + this.userId);
          console.log("le restau: " + this.restaurantId);
        });

      // get all the articles in the restaurant
      await axios
        .get(
          `http://10.117.129.194:8080/api/restaurants/${this.restaurantId}`,
          {
            headers: {
              "X-Server-Select": "mongo"
            }
          }
        )
        .then(res => {
          console.log("je rentre ici");
          this.articles = res.data.restaurant.articles;
          console.log("liste des articles dans le restau :");
          console.log(this.articles);
        });

      axios
        .post("http://10.117.129.194:8080/api/articles/create", this.form, {
          headers: {
            "X-Server-Select": "mongo"
          }
        })
        .then(res => {
          //Perform Success Action

          // get this article ID
          const articleId = [res.data.article._id];
          console.log("id du nouvel article :");
          console.log(articleId);

          // get all the articles
          const allArticles = this.articles;
          console.log("tous les articles niv 2 :");
          console.log(allArticles);

          // add the new article to the list
          allArticles.push(articleId);

          // envoie de la nouvelle liste d'articles dans le restaurant
          axios.put(
            `http://10.117.129.194:8080/api/restaurants/${this.restaurantId}`,
            {
              articles: allArticles
            },
            {
              headers: {
                "X-Server-Select": "mongo"
              }
            }
          );
        })
        .catch(() => {
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
    },
    scrollToTop() {
      window.scrollTo(0, 0);
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
    }
  }
};
</script>

<style scoped>
.space_up {
  margin-top: 10px;
}
</style>
