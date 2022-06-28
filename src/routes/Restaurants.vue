<template>
  <main class="container">
    <ListRestaurants />
    <AddRestaurant />
  </main>
</template>

<script>
import ListRestaurants from "@/components/mongo/ListRestaurants";
import AddRestaurant from "@/components/mongo/AddRestaurant";

export default {
  name: "home",
  components: {
    ListRestaurants,
    AddRestaurant
  }
};
</script>
