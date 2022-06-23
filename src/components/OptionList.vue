<template>
  <div class="container">
    <div class="options">
      <OptionItem
        v-for="item in list"
        v-bind="item"
        :id-place="idPlace"
        :key="`option-${item.id}`"
      />
    </div>
    <div class="payment">
      <router-link to="/cart"
        ><button class="blue_button styled_button center">
          Panier
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
import OptionItem from "@/components/OptionItem";
export default {
  name: "OptionList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    idPlace: {
      type: Number,
      default: null,
    },
  },
  components: {
    OptionItem,
  },
};
</script>

<style scoped>
.payment {
  display: block;
  text-align: center;
}
</style>
