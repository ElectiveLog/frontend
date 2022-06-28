<template>
  <div class="form-body">
    <div class="row">
      <div class="form-holder">
        <div class="form-content">
          <div class="form-items">
            <h3>Inscription</h3>
            <p>Merci de compléter les différentes informations.</p>
            <form
              class="requires-validation"
              novalidate
              @submit.prevent="handleRegister"
            >
              <div class="col-md-12">
                <select v-model="user.roleId">
                  >
                  <option selected value="">Choisissez *</option>
                  <option
                    v-for="role in roledata"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-12">
                <input
                  class="form-control"
                  type="text"
                  name="name"
                  placeholder="Nom *"
                  required
                  v-model="user.username"
                />
                <div class="valid-feedback">Nom valide</div>
                <div class="invalid-feedback">Nom invalide</div>
              </div>

              <div class="col-md-12">
                <input
                  class="form-control"
                  type="email"
                  name="email"
                  placeholder="Adresse e-mail *"
                  v-model="user.email"
                  required
                />
                <div class="valid-feedback">Email valide</div>
                <div class="invalid-feedback">Email invalide</div>
              </div>
              <div v-if="user.roleId == 'cl4sfnxan006501pyrhmwnrme'">
                &emsp;
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="number"
                    name="number"
                    placeholder="Numéro"
                    required
                    v-model="user.streetNumber"
                  />
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="adresse"
                    placeholder="Adresse"
                    required
                    v-model="user.address"
                  />
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="ville"
                    placeholder="Ville"
                    required
                    v-model="user.city"
                  />
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="country"
                    placeholder="Pays"
                    required
                    v-model="user.country"
                  />
                </div>
                &emsp;
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="phone"
                    name="phone"
                    placeholder="Numéro de téléphone"
                    required
                    v-model="user.phoneNumber"
                  />
                </div>
              </div>

              <div class="col-md-12">
                <input
                  class="form-control"
                  type="password"
                  name="password"
                  placeholder="Mot de passe *"
                  v-model="user.password"
                  required
                />
                <div class="valid-feedback">Mot de passe valide</div>
                <div class="invalid-feedback">Mot de passe invalide</div>
              </div>
              <div class="col-md-12">
                <input
                  class="form-control"
                  type="email"
                  name="parraingae"
                  placeholder="Adresse e-mail du parain"
                  v-model="user.sponsorshipCode"
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
  name: "Register",
  data() {
    return {
      user: new User("", "", "", "", "", "", "", "", "", ""),
      submitted: false,
      successful: false,
      message: "",
      roledata: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:8080/roles/",
      // url: "http://localhost:5000/roles/",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsaWVudEBjbGllbnQuY2xpZW50IiwibmFtZSI6ImNsaWVudGZkIiwicm9sZSI6IkNsaWVudCIsInVzZXJJZCI6ImNsNHNmc3NmNTAwMDEwMXB5ZXVwbnR5NXIiLCJpYXQiOjE2NTYzNjcyNzcsImV4cCI6MTY1NjQ1MzY3N30.bF7rywxOATgXqGzY11uRu1XP9UkmcMJZxVeoYdTznNc",
      },
    };

    axios(config)
      .then((response) => {
        this.roledata = response.data;
      })
      .catch((error) => {
        console.log("fdsqf" + error);
      });
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },

  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      console.log(this.user.roleId);
      if (this.user.roleId === "") {
        this.$notify({
          group: "foo",
          title: "Role",
          type: "error",
          text: "Veuillez choisir un role",
          duration: 8000,
        });
      } else {
        this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;

            if (data == "User already exists") {
              this.successful = false;

              this.$notify({
                group: "foo",
                title: "Inscription échouée",
                type: "error",
                text:
                  "L'adresse mail " +
                  this.user.email +
                  " possède déjà un compte. Veuillez vous connecter.",
                duration: 8000,
              });
            } else if (
              data ==
              "L'adresse email que vous avez entrée n'appartient pas à un utilisateur de votre role"
            ) {
              this.$notify({
                group: "foo",
                title: "Inscription échouée",
                type: "error",
                text: "L'adresse email que vous avez entrée n'appartient pas à un utilisateur de votre role",
                duration: 8000,
              });
            } else if (data == "Error when creating the user") {
              this.$notify({
                group: "foo",
                title: "Inscription échouée",
                type: "error",
                text: "Un problème inconnu est survenu lors de la création de votre compte. Veuillez réessayer.",
                duration: 8000,
              });
            } else {
              this.$notify({
                group: "foo",
                title: "Inscription réussie",
                type: "success",
                text:
                  "Bienvenue " +
                  this.user.email +
                  " !" +
                  "Vous pouvez vous connecter.",
                duration: 8000,
              });
              this.$router.push("/login");
            }
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.successful = false;
          }
        );
      }
    },
  },
};
</script>
<style scoped></style>
