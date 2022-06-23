<template>
  <main class="container">
    <div class="search">
      <!-- <b-icon-search class="icon"></b-icon-search> -->
      <input
        type="text"
        placeholder="Rechercher un restaurant"
        v-model="search"
      />
    </div>
    <PlaceList />
  </main>
</template>

<script>
import PlaceList from "@/components/PlaceList";

export default {
  name: "home",
  components: {
    PlaceList
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
