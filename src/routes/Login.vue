<template>
  <div class="form-body">
    <div class="row">
      <div class="form-holder">
        <div class="form-content">
          <div class="form-items">
            <h3>Connexion</h3>
            <p>Merci de compléter les différentes informations.</p>
            <form class="requires-validation" @submit.prevent="handleLogin">
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
import axios from "axios";
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
  methods: {
    handleLogin() {
      this.loading = true;

      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          response => {
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
              var configLog = {
                method: "post",
                url:
                  window.location.origin.split(":80")[0] +
                  ":8080/api/logs/create",
                headers: {
                  "X-Server-Select": "mongo"
                },
                data: {
                  type: "Connexion",
                  description:
                    "Connexion réussie sur le frontoffice de : " +
                    this.user.email +
                    ""
                }
              };
              axios(configLog)
                .then(response => {
                  console.log(JSON.stringify(response.data));
                })
                .catch(error => {
                  console.log(error);
                });
              this.$notify({
                group: "foo",
                title: "Connexion réussie",
                type: "success",
                text: "Bienvenue " + this.user.email,
                duration: 8000
              });
              this.$router.push("/account");
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
