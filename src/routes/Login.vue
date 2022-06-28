<template>
  <div class="form-body">
    <div class="row">
      <div class="form-holder">
        <div class="form-content">
          <div class="form-items">
            <h3>Connexion</h3>
            <p>Merci de compléter les différentes informations.</p>
            <form
              class="requires-validation"
              novalidate
              @submit.prevent="handleLogin"
            >
              <div class="col-md-12">
                <input
                  class="form-control"
                  type="email"
                  name="email"
                  placeholder="Adresse e-mail"
                  v-model="user.email"
                  required
                />
                <div class="valid-feedback">Email valide</div>
                <div class="invalid-feedback">Email invalide</div>
              </div>
              <div class="col-md-12">
                <input
                  class="form-control"
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  v-model="user.password"
                  required
                />
                <div class="valid-feedback">Mot de passe valide</div>
                <div class="invalid-feedback">Mot de passe invalide</div>
              </div>
              <div class="form-button mt-3">
                <button class="green_button styled_button" type="submit">
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import User from "../models/user";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      console.log(this.$store.state);
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    var axios = require("axios");

    var config = {
      method: "get",
      // url: "http://localhost:8080/api/ingredients/",
      url: "http://localhost:5000/api/ingredients/",
      headers: {
        "X-Server-Select": "mongo"
      }
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });

    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      console.log("handleLogin");
      this.loading = true;

      if (this.user.email && this.user.password) {
        console.log("handleLogin: login");
        this.$store.dispatch("auth/login", this.user).then(
          response => {
            console.log("fdsq" + JSON.stringify(response));
            if (response.status == 203) {
              this.$notify({
                group: "foo",
                title: "Erreur",
                type: "error",
                text: response.data,
                duration: 8000
              });
              this.loading = false;
              this.message = response;
            } else {
              this.$notify({
                group: "foo",
                title: "Connexion réussie",
                type: "success",
                text: "Bienvenue " + this.user.email,
                duration: 8000
              });
              this.$router.push("/");
              location.reload();
            }
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    }
  }
};
</script>
