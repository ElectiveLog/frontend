<template>
  <div class="list row">
    <h2>Ajouter un article / menu</h2>
    <a>L'article ajouté sera directement ajouté à votre restaurant.</a>
    <form v-on:submit.prevent="submitForm">
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
      <div class="form-group">
        <img style="" :src="image" alt="" />
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
const restaurantId = "62bb0561c68d60c802700f5e";

export default {
  name: "PostFormAxios",
  data() {
    return {
      form: {
        name: "",
        type: "",
        price: "",
        detail: "",
        picture: "",
      },
      articles: {
        articles: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.form.picture = this.image;
      // get all the articles in the restaurant
      axios
        .get(`http://localhost:3000/api/restaurants/${restaurantId}`)
        .then((res) => {
          this.articles = res.data.restaurant.articles;
          console.log("liste des articles dans le restau :");
          console.log(this.articles);
        });

      axios
        .post("http://localhost:3000/api/articles/create", this.form)
        .then((res) => {
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
          axios.put(`http://localhost:3000/api/restaurants/${restaurantId}`, {
            articles: allArticles,
          });
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

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
  },
};
</script>
