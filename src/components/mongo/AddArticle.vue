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

export default {
  name: "PostFormAxios",
  data() {
    return {
      form: {
        name: "",
        type: "",
        price: "",
        detail: "",
      },
      articles: {
        articles: "",
      },
    };
  },
  methods: {
    submitForm() {
      // get the restaurant ID
      const restaurantId = "62b9c1f576ca9b32e16d9bf5";
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
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 10px;
}
</style>
