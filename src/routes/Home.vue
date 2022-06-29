<template>
  <main class="container">
    <div class="search">
      <!-- <b-icon-search class="icon"></b-icon-search>
      <input
        type="text"
        placeholder="Rechercher un restaurant"
        v-model="search"
      /> -->
    </div>
    <!-- <PlaceList /> -->
    <ListOfPlaces />
  </main>
</template>

<script>
// import PlaceList from "@/components/PlaceList";
import ListOfPlaces from "@/components/ListOfPlaces";

export default {
  name: "home",
  components: {
    // PlaceList,
    ListOfPlaces
  },
  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.commit("setSearch", value);
      }
    }
  }
};
</script>
