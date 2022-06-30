<template>
  <main class="container">
    <DetailMyRestaurant />
    <AddMyRestaurant />
  </main>
</template>

<script>
import DetailMyRestaurant from "@/components/mongo/DetailMyRestaurant";
import AddMyRestaurant from "@/components/mongo/AddMyRestaurant";

export default {
  name: "MyRestaurant",
  components: {
    DetailMyRestaurant,
    AddMyRestaurant,
  },
};
</script>
