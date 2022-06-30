<template>
  <div class="row">
    <div
      id="mouseover"
      class="col-md-4 effect"
      v-for="(restaurant, index) in restaurants"
      :key="index"
      @mouseover="setActiveRestaurant(restaurant, index)"
    >
      <router-link class="none" :to="`/listofarticles/${restaurantId}`">
        <ul class="list-group">
          <li class="list-group-item">
            <div class="center responsive_img">
              <img v-bind:src="restaurant.picture" />
            </div>
            <h4>{{ restaurant.name }}</h4>
            <!-- <h4>{{ restaurant.idRestaurateur }}</h4> -->
          </li>
        </ul></router-link
      >
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
var restaurantId = "";
export default {
  name: "restaurants-list",
  data() {
    return {
      restaurants: [],
      currentRestaurant: null,
      currentIndex: -1,
      title: "",
      restaurantId
    };
  },
  methods: {
    retrieveRestaurants() {
      DataService.getAllRestaurants()
        .then(response => {
          this.restaurants = response.data.restaurants;
          console.log(response.data.restaurants);
        })
        .catch(e => {
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
      this.restaurantId = this.currentRestaurant._id;
    },
    reload() {
      location.reload();
    }
  },
  mounted() {
    this.retrieveRestaurants();
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
img {
  margin: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
}
.center {
  text-align: center;
}
.list-group-item {
  border: none;
}

.effect {
  cursor: pointer;
  transform: translateY(0);
  transition: transform 0.3s ease-out 0s;
  margin-bottom: 10px;
}

.effect:hover {
  transform: translateY(-10px);
}
.row {
  margin-top: 50px;
}
.none {
  all: initial;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .responsive_img {
    width: 200px;
  }
}
</style>
