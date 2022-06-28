<template>
  <div>
    <AccountClient v-if="payloadUser.role == 'Client'" />
    <AccountRestaurateur v-else-if="payloadUser.role == 'Restaurateur'" />
    <AccountLivreur v-else-if="payloadUser.role == 'Livreur'" />
  </div>
</template>

<script>
import AccountClient from "@/components/mongo/AccountClient";
import AccountRestaurateur from "@/components/mongo/AccountRestaurateur";
import AccountLivreur from "@/components/mongo/AccountLivreur";
import jwt_decode from "jwt-decode";
import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
export default {
  name: "Account",
  data() {
    return {
      userData: []
    };
  },
  components: {
    AccountClient,
    AccountRestaurateur,
    AccountLivreur
  },
  methods: {
    handleEdit() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        // url: "http://localhost:8080/users/" + payloadUser.userId,
        url: "http://localhost:5000/users/" + payloadUser.userId,
        headers: {
          Authorization: "Bearer " + user.accessToken
        },
        data: this.userData
      };

      axios(config)
        .then(
          this.$notify({
            group: "foo",
            title: "Modification réussie",
            type: "success",
            text: "Vos modifications ont été enregistrées",
            duration: 8000
          })
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        method: "delete",
        // url: "http://localhost:8080/users/" + payloadUser.userId,
        url: "http://localhost:5000/users/" + payloadUser.userId,
        headers: {
          Authorization: "Bearer " + user.accessToken
        }
      };

      axios(config)
        .then(() => {
          this.$notify({
            group: "foo",
            title: "Suppression réussie",
            type: "success",
            text: "Votre compte a été supprimé",
            duration: 8000
          });
          this.$store.dispatch("auth/logout");
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    decodeToken(token) {
      return jwt_decode(token);
    },
    created() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        method: "get",
        // url: "http://localhost:8080/users/" + payloadUser.userId,
        url: "http://localhost:5000/users/" + payloadUser.userId,
        headers: {
          Authorization: "Bearer " + user.accessToken
        }
      };

      axios(config)
        .then(response => {
          this.userData = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
