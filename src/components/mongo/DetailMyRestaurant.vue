<template>
  <div v-if="!this.haveARestaurant == false" class="list row">
    <div class="list row">
      <h2>Mon restaurant</h2>
      <h5 class="space_bottom">{{ validation }}</h5>
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
      <button class="m-2 green_button styled_button" @click="reload()">
        Actualiser
      </button>
      <a>Attention vous ne pourrez pas revenir en arrière.</a>
    </div>
    <!-- <div>
      <button class="m-2 green_button styled_button" @click="reload()">
        Actualiser
      </button>
    </div> -->
    <!-- Modifier -->
    <h2>Modifier mon restaurant</h2>
    <form v-on:submit.prevent="updateRestaurant">
      <div class="form-group">
        <label for="name">Nom</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Nom du restaurant"
          v-model="form.name"
        />
      </div>
      <!-- <div class="form-group">
        <label for="idRestaurateur">Restaurateur *</label>
        <input
          type="string"
          class="form-control"
          id="idRestaurateur"
          placeholder="Selectionner le restaurateur"
          v-model="form.idRestaurateur"
          required="required"
        />
      </div> -->
      <div class="form-group">
        <label for="address">Adresse</label>
        <input
          type="text"
          class="form-control"
          id="address"
          placeholder="Adresse"
          v-model="form.address"
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
      <div>
        <div class="form-group space_up">
          <button class="green_button styled_button">Valider</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "../../services/DataService";
import jwt_decode from "jwt-decode";
import axios from "axios";

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
      haveARestaurant: false,
      validation: "",
      form: {
        name: "",
        address: "",
        picture: "",
      },
    };
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
    updateRestaurant() {
      this.form.picture = this.image;
      const restaurantId = this.restaurantId;
      if (this.form.name !== "") {
        axios.put(
          `http://10.117.129.194:8080/api/restaurants/${restaurantId}`,
          {
            name: this.form.name,
          },
          {
            headers: {
              "X-Server-Select": "mongo",
            },
          }
        );
      }
      if (this.form.address !== "") {
        axios.put(
          `http://10.117.129.194:8080/api/restaurants/${restaurantId}`,
          {
            address: this.form.address,
          },
          {
            headers: {
              "X-Server-Select": "mongo",
            },
          }
        );
      }
      if (this.form.picture !== "") {
        axios.put(
          `http://10.117.129.194:8080/api/restaurants/${restaurantId}`,
          {
            picture: this.form.picture,
          },
          {
            headers: {
              "X-Server-Select": "mongo",
            },
          }
        );
      }
      // this.reload();
    },
    retrieveRestaurant() {
      this.payloadUser = this.decodeToken(user.accessToken);
      this.userId = this.payloadUser.userId;
      DataService.getAllRestaurantsByRestaurateur(this.payloadUser.userId)
        .then((response) => {
          this.restaurantId = response.data.restaurants[0]._id;
          console.log("Utilisateur: " + this.userId);
          console.log("le restau: " + this.restaurantId);
          DataService.getOneRestaurant(this.restaurantId)
            .then((response) => {
              this.restaurant = response.data.restaurant;
              console.log(this.restaurant);
              if (this.restaurant) {
                this.haveARestaurant = true;
                console.log(this.haveARestaurant);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
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
    deleteRestaurant() {
      DataService.deleteRestaurant(this.restaurantId)
        .then((response) => {
          console.log(response.data.restaurants);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
      // this.reload();
      this.validation =
        "Votre restaurant a bien été supprimé. Actualisez la page.";
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
.space_up {
  margin-top: 10px;
}
.small_image {
  width: 200px;
  height: 200px;
}
</style>
