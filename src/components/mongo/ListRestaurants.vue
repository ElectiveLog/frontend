<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Search
          </button>
        </div> -->
      </div>
    </div>
    <div class="col-md-6">
      <h4>Restaurants List</h4>
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
      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllRestaurants">
        Remove All
      </button> -->
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
        <div>
          <label><strong>Adresse :</strong></label>
          {{ currentRestaurant.address }}
        </div>
        <a
          class="badge badge-warning"
          :href="'/restaurants/' + currentRestaurant.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Restaurant...</p>
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
      DataService.getAllRestaurant()
        .then((response) => {
          this.restaurants = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // refreshList() {
    //   this.retrieveRestaurants();
    //   this.currentRestaurant = null;
    //   this.currentIndex = -1;
    // },
    // setActiveRestaurant(restaurant, index) {
    //   this.currentRestaurant = restaurant;
    //   this.currentIndex = index;
    // },
    // removeAllRestaurants() {
    //   DataService.deleteAll()
    //     .then((response) => {
    //       console.log(response.data);
    //       this.refreshList();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

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
}
</style>
