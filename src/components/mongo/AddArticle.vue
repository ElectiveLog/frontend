<template>
  <div class="list row">
    <h2>Ajouter un article / menu</h2>
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
        <label for="type">Type de restaurant</label>
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
        picture: "",
      },
      articles: {
        articles: "",
      },
      image: "",
    };
  },
  methods: {
    submitForm() {
      // get the restaurant ID
      const restaurantId = "62b5b7695c44b92b81c6f082";
      this.form.picture = this.image;
      // get all the articles in the restaurant
      axios
        .get(`http://localhost:3000/api/restaurants/${restaurantId}`)
        .then((res) => {
          // eslint-disable-next-line no-undef
          allArticles = res.data.articles;
        });

      axios
        .post("http://localhost:3000/api/articles/create", this.form)
        .then((res) => {
          //Perform Success Action

          // get this article ID
          // eslint-disable-next-line no-undef
          console.log(allArticles);
          // eslint-disable-next-line no-unused-vars
          const articleId = [res.data.article._id];

          // add the new article to the list

          // envoie de la nouvelle liste d'articles dans le restaurant
          axios.put(`http://localhost:3000/api/restaurants/${restaurantId}`, {
            // eslint-disable-next-line no-undef
            articles: newArticlesList,
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
      location.reload();
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

<style scoped>
.form-group {
  margin-bottom: 10px;
}
</style>
