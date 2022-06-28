<template>
  <div class="list row">
    <h2>Ajouter un restaurant</h2>
    <form v-on:submit.prevent="submitForm">
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
        <label for="idRestaurateur">Le restaurateur</label>
        <input
          type="string"
          class="form-control"
          id="idRestaurateur"
          placeholder="Selectionner le restaurateur"
          v-model="form.idRestaurateur"
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
import jwt_decode from "jwt-decode";
const user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "PostFormAxios",
  data() {
    return {
      form: {
        name: "",
        idRestaurateur: "",
        address: "",
        picture: "",
      },
      image: "",
    };
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
    submitForm() {
      this.form.picture = this.image;
      this.payloadUser = this.decodeToken(user.accessToken);
      this.form.idRestaurateur = this.payloadUser.userId;
      axios
        .post("http://localhost:3000/api/restaurants/create", this.form)
        .then((res) => {
          //Perform Success Action
          console.log("donnéee" + res.data);
          location.reload();
        })
        .catch((error) => {
          console.log(error);
          // error.response.status Check status code
          console.log("err: " + error);
        })
        .finally(() => {
          //Perform action in always
          console.log("finally");
        });
      // location.reload();
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
