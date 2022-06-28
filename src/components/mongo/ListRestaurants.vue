<template>
  <div class="list row">
    <div class="col-md-8">
      <!-- <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Rechercher un restaurant"
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
      <h2>Liste des restaurants</h2>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(restaurant, index) in restaurants"
          :key="index"
          @click="setActiveRestaurant(restaurant, index)"
        >
          {{ restaurant.name }}
        </li>
      </ul>
      <button class="m-2 red_button styled_button" @click="deleteRestaurant()">
        Supprimer
      </button>
      <!-- <button class="m-2 blue_button styled_button" @click="updateRestaurant()">
        Modifier
      </button> -->
      <button
        class="m-2 grey_button styled_button"
        @click="unsetActiveRestaurant()"
      >
        Dessélectionner
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentRestaurant">
        <h4>Restaurant</h4>
        <div>
          <label><strong>Nom :</strong></label> {{ currentRestaurant.name }}
        </div>
        <div>
          <label><strong>Articles :</strong></label>
          {{ currentRestaurant.articles }}
        </div>
        <!-- <div>
          <label><strong>Id :</strong></label>
          {{ currentRestaurant._id }}
        </div> -->
        <div>
          <label><strong>Adresse :</strong></label>
          {{ currentRestaurant.address }}
        </div>
        <div>
          <label><strong>Image :</strong></label>
          <img v-bind:src="currentRestaurant.picture" />
        </div>
        <a
          class="badge badge-warning"
          :href="'/restaurants/' + currentRestaurant.id"
        >
          Edit
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import DataService from "../../services/DataService";
export default {
  name: "restaurants-list",
  data() {
    return {
      restaurants: [],
      currentRestaurant: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveRestaurants() {
      DataService.getAllRestaurants()
        .then((response) => {
          this.restaurants = response.data.restaurants;
          console.log(response.data.restaurants);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveRestaurants();
      this.currentRestaurant = null;
      this.currentIndex = -1;
    },
    setActiveRestaurant(restaurant, index) {
      this.currentRestaurant = restaurant;
      this.currentIndex = index;
    },
    unsetActiveRestaurant() {
      this.currentRestaurant = null;
      this.currentIndex = null;
    },
    deleteRestaurant() {
      DataService.deleteRestaurant(this.currentRestaurant._id)
        .then((response) => {
          console.log(response.data.restaurants);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateRestaurant() {
      DataService.updateRestaurant(this.currentRestaurant._id)
        .then((response) => {
          console.log(response.data.restaurants);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // searchName() {
    //   DataService.find(this.name)
    //     .then((response) => {
    //       this.restaurants = response.data;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
  },
  mounted() {
    this.retrieveRestaurants();
  },
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
