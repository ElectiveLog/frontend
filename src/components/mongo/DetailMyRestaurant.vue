<template>
  <div v-if="!this.haveARestaurant == false" class="list row">
    <div class="list row">
      <h2>Mon restaurant</h2>
      <!-- <button class="m-2 blue_button styled_button" @click="updateRestaurant()">
        Modifier
      </button> -->
      <div>
        <label><strong>Nom :</strong></label> {{ this.restaurant.name }}
      </div>
      <div>
        <label><strong>Adresse :</strong></label>
        {{ this.restaurant.address }}
      </div>
      <div class="small_image">
        <label><strong>Image :</strong></label>
        <img v-bind:src="this.restaurant.picture" />
      </div>
    </div>
    <div>
      <button class="m-2 red_button styled_button" @click="deleteRestaurant()">
        Supprimer mon restaurant
      </button>
      <a>Attention vous ne pourrez pas revenir en arrière.</a>
    </div>
    <!-- <div>
      <button class="m-2 green_button styled_button" @click="reload()">
        Actualiser
      </button>
    </div> -->
  </div>
</template>

<script>
import DataService from "../../services/DataService";
import jwt_decode from "jwt-decode";
const user = JSON.parse(localStorage.getItem("user"));
// let haveARestaurant;
export default {
  name: "restaurants-list",
  data() {
    return {
      restaurants: [],
      currentRestaurant: null,
      currentIndex: -1,
      title: "",
      restaurant: "",
      haveARestaurant: false
    };
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
    retrieveRestaurant() {
      this.payloadUser = this.decodeToken(user.accessToken);
      this.userId = this.payloadUser.userId;
      DataService.getAllRestaurantsByRestaurateur(this.payloadUser.userId)
        .then(response => {
          this.restaurantId = response.data.restaurants[0]._id;
          console.log("Utilisateur: " + this.userId);
          console.log("le restau: " + this.restaurantId);
          DataService.getOneRestaurant(this.restaurantId)
            .then(response => {
              this.restaurant = response.data.restaurant;
              console.log(this.restaurant);
              if (this.restaurant) {
                this.haveARestaurant = true;
                console.log(this.haveARestaurant);
              }
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    },
    reload() {
      location.reload();
    },
    refreshList() {
      this.retrieveRestaurant();
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
      DataService.deleteRestaurant(this.restaurantId)
        .then(response => {
          console.log(response.data.restaurants);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      this.reload();
    },
    updateRestaurant() {
      DataService.updateRestaurant(this.currentRestaurant._id)
        .then(response => {
          console.log(response.data.restaurants);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }

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
    this.retrieveRestaurant();
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

.small_image {
  width: 200px;
  height: 200px;
}
</style>
