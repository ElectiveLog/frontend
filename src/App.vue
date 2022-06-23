<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Header from "@/components/Header";
import data from "@/data.json";

export default {
  name: "App",
  components: {
    Header
  },
  created() {
    document.title = "CES'EATS";
    this.setPlaces(data);
  },
  methods: {
    ...mapMutations(["setPlaces"])
  }
};
</script>

<style>
@import "../style/style.css";
@import url("https://fonts.googleapis.com/css2?family=Anek+Latin:wght@500&display=swap");
@import "~bootstrap/dist/css/bootstrap.css";
</style>
