<template>
  <main class="container">
    <ListRestaurants />
  </main>
</template>

<script>
import ListRestaurants from "@/components/mongo/ListRestaurants";

export default {
  name: "home",
  components: {
    ListRestaurants
  }
};
</script>
