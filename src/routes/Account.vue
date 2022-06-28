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
const user = JSON.parse(localStorage.getItem("user"));
export default {
  name: "Account",
  data() {
    return {
      payloadUser: {},
    };
  },
  components: {
    AccountClient,
    AccountRestaurateur,
    AccountLivreur,
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
  },
  created() {
    this.payloadUser = this.decodeToken(user.accessToken);
    console.log(this.payloadUser);
  },
};
</script>
