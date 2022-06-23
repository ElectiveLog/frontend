<template>
  <div class="header">
    <div class="container">
      <router-link to="/"
        ><img class="logo" src="../../dist/assets/logo.png" alt="CES'EATS LOGO"
      /></router-link>
      <div class="header-right">
        Style Guide<router-link class="header-cart" to="/styleguide"
          ><img src="/assets/user.svg" alt="Not logged user icon"
        /></router-link>
        Account<router-link class="header-cart" to="/account"
          ><img src="/assets/user.svg" alt="Not logged user icon"
        /></router-link>
        Cart<router-link class="header-cart" to="/cart"
          ><img src="/assets/cart.svg" alt="Cart icon"
        /></router-link>
        <span>{{ orders }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    orders() {
      return this.$store.state.cart.length;
    },
  },
};
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
}
.button {
  cursor: pointer;
}
</style>
