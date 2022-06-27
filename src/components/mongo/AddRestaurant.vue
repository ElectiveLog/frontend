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
      <div class="form-group">
        <label for="idRestaurateur">Le restaurateur</label>
        <input
          type="number"
          class="form-control"
          id="idRestaurateur"
          placeholder="Selectionner le restaurateur"
          v-model="form.idRestaurateur"
        />
      </div>
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
        idRestaurateur: "",
        address: ""
      }
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://localhost:3000/api/restaurants/create", this.form)
        .then(res => {
          //Perform Success Action
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
      location.reload();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 10px;
}
</style>
