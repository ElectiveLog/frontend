<template>
  <div class="form-body">
    <div class="row">
      <div class="form-holder">
        <div class="form-content">
          <div class="form-items">
            <h3>Inscription</h3>
            <p>Merci de compléter les différentes informations.</p>
            <b-form @submit.prevent="handleRegister">
              <div class="col-md-12">
                <select v-model="user.roleId">
                  >
                  <option selected value="">Choisissez votre rôle *</option>
                  <option v-for="role in roledata" :key="role" :value="role">
                    {{ role }}
                  </option>
                </select>
              </div>
              <div class="col-md-12">
                <b-form-input
                  class="form-control"
                  type="text"
                  name="name"
                  placeholder="Nom *"
                  required
                  v-model="user.username"
                />
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
              <div v-if="user.roleId == 'Client'">
                &emsp;
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="number"
                    name="number"
                    placeholder="Numéro"
                    v-model="user.streetNumber"
                  />
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="adresse"
                    placeholder="Adresse"
                    v-model="user.address"
                  />
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="ville"
                    placeholder="Ville"
                    v-model="user.city"
                  />
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="country"
                    placeholder="Pays"
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
                />
                <div class="valid-feedback">Mot de passe valide</div>
                <div class="invalid-feedback">Mot de passe invalide</div>
              </div>
              <div class="form-button mt-3">
                <button class="green_button styled_button" type="submit">
                  Valider
                </button>
              </div>
            </b-form>
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
      user: new User("", "", "", "", "", "", "", "", "", "", ""),
      submitted: false,
      successful: false,
      message: "",
      roledata: ["Livreur", "Client", "Restaurateur"],
      allRoledata: [],
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
      // url: "http://localhost:8080/roles/",
      url: "http://localhost:5000/roles/",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlc3RhdXJhdGV1ckByZXN0YXVyYXRldXIucmVzdGF1cmF0ZXVyIiwibmFtZSI6InJlc3RhdXJhdGV1ciIsInJvbGUiOiJSZXN0YXVyYXRldXIiLCJ1c2VySWQiOiJjbDRzZ3M3OGMwMDAzMDFweW15bDEweDZvIiwiaWF0IjoxNjU2NDAzNDE2LCJleHAiOjE2NTcwMDgyMTZ9.-K-Q1EXnCx7WcKrQm9OHDceqZQwexdohM3aBn08HgQk",
      },
    };
    axios(config)
      .then((response) => {
        this.allRoledata = response.data;
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
          text: "Veuillez choisir un rôle",
          duration: 8000,
        });
      } else {
        this.allRoledata.forEach((element) => {
          if (element.name === this.user.roleId) {
            this.user.roleId = element.id;
          }
        });
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
              this.successful = false;
              this.$notify({
                group: "foo",
                title: "Inscription échouée",
                type: "error",
                text: "L'adresse email que vous avez entrée n'appartient pas à un utilisateur de votre role",
                duration: 8000,
              });
            } else if (data == "Error when creating the user") {
              this.successful = false;
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
