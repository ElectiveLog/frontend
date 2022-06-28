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
      <h2>Liste des articles / menus</h2>
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
        <a class="badge badge-warning" :href="'/articles/' + currentArticle.id">
          Edit
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import DataService from "../../services/DataService";
export default {
  name: "articles-list",
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveArticles() {
      DataService.getAllArticles()
        .then(response => {
          this.articles = response.data.articles;
          console.log(response.data.articles);
        })
        .catch(e => {
          console.log(e);
        });
    },
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
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateArticle() {
      DataService.updateArticle(this.currentArticle._id)
        .then(response => {
          console.log(response.data.articles);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
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
.styled_button {
}
</style>
