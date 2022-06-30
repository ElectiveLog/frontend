<template>
  <div class="header">
    <div class="container">
      <router-link v-if="!currentUser" to="/"
        ><img
          class="logo"
          src="../../../public/assets/logo.png"
          alt="CES'EATS LOGO"
      /></router-link>
      <router-link v-if="currentUser && currentRole == 'Client'" to="/"
        ><img
          class="logo"
          src="../../../public/assets/logo.png"
          alt="CES'EATS LOGO"
      /></router-link>
      <router-link v-if="currentUser && currentRole == 'Livreur'" to="/account"
        ><img
          class="logo"
          src="../../../public/assets/logo.png"
          alt="CES'EATS LOGO"
      /></router-link>
      <router-link
        v-if="currentUser && currentRole == 'Restaurateur'"
        to="/account"
        ><img
          class="logo"
          src="../../../public/assets/logo.png"
          alt="CES'EATS LOGO"
        />
      </router-link>
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
          <b-dropdown-item v-if="currentRole == 'Restaurateur'" to="/statistics"
            >Statistiques
            <b-icon-bar-chart-line-fill class="icon">
            </b-icon-bar-chart-line-fill>
          </b-dropdown-item>
          <b-dropdown-item to="/account">
            Compte <b-icon-person-fill class="icon"></b-icon-person-fill>
          </b-dropdown-item>
          <!-- <b-dropdown-item to="/Restaurants">
            Tous les restaurants
          </b-dropdown-item> -->
          <b-dropdown-item v-if="currentRole == 'Restaurateur'" to="/Articles">
            Gérer mes articles
          </b-dropdown-item>
          <b-dropdown-item
            v-if="currentRole == 'Restaurateur'"
            to="/MyRestaurant"
          >
            Gérer mon restaurant
          </b-dropdown-item>
          <b-dropdown-item @click.prevent="logOut">Deconnexion</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "Header",
  computed: {
    orders() {
      return this.$store.state.cart.length;
    },
    currentRole() {
      const payloadUser = jwt_decode(this.$store.state.auth.user.accessToken);
      return payloadUser.role;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$store.state.auth.user = null;
      this.$router.push("/login");
    }
  }
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
