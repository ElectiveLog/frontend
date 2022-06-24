<template>
  <div class="header">
    <div class="container">
      <router-link to="/"
        ><img
          class="logo"
          src="../../../dist/assets/logo.png"
          alt="CES'EATS LOGO"
      /></router-link>
      <div class="header-right">
        <router-link to="/statistics"
          ><button class="cleargreen_button styled_button" type="button">
            Statistiques
            <b-icon-bar-chart-line-fill
              class="icon"
            ></b-icon-bar-chart-line-fill></button
        ></router-link>
        <a> &emsp;</a>
        <router-link to="/account"
          ><button class="blue_button styled_button" type="button">
            Compte
            <b-icon-person-fill class="icon"></b-icon-person-fill></button
        ></router-link>
        <a> &emsp;</a>
        <router-link to="/cart"
          ><button class="grey_button styled_button" type="button">
            Panier
            <b-icon-cart-fill class="icon"></b-icon-cart-fill>&ensp;<span>{{
              orders
            }}</span>
          </button>
        </router-link>
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
  width: 75px;
  height: 75px;
}
.header {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
