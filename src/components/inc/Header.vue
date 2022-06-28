<template>
  <div class="header">
    <div class="container">
      <router-link to="/"
        ><img
          class="logo"
          src="../../../public/assets/logo.png"
          alt="CES'EATS LOGO"
      /></router-link>
      <div class="header-right">
        <router-link v-if="!currentUser" to="/register"
          ><button class="blue_button styled_button" type="button">
            Inscription
          </button></router-link
        >
        &emsp;
        <router-link v-if="!currentUser" to="/login"
          ><button class="grey_button styled_button" type="button">
            Connexion
          </button></router-link
        >
        &emsp;
        <b-dropdown
          v-if="currentUser"
          text="Mon compte"
          toggle-class="customDropdown"
        >
          <b-dropdown-item to="/statistics"
            >Statistiques
            <b-icon-bar-chart-line-fill class="icon">
            </b-icon-bar-chart-line-fill>
          </b-dropdown-item>
          <b-dropdown-item to="/account">
            Compte <b-icon-person-fill class="icon"></b-icon-person-fill>
          </b-dropdown-item>
          <b-dropdown-item to="/cart"
            >Panier
            <b-icon-cart-fill class="icon"></b-icon-cart-fill>&ensp;<span>{{
              orders
            }}</span></b-dropdown-item
          >
          <b-dropdown-item @click.prevent="logOut">Deconnexion</b-dropdown-item>
        </b-dropdown>
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
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$store.state.auth.user = null;
      this.$router.push("/login");
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
