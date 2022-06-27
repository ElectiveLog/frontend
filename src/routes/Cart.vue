<template>
  <div class="container">
    <h1 class="cart-title">Panier</h1>
    <div class="cart-container">
      <ul class="cart-list">
        <li v-for="item in list" :key="`cart-${item.id}`" class="cart-item">
          <div class="cart-text">
            <div class="cart-place">{{ item.place.title }}</div>
            <div class="cart-order">{{ item.name }}</div>
          </div>
          <div class="cart-price">{{ item.price }}€</div>
        </li>
      </ul>
      <div class="payment">
        <div class="payment-total">
          <div class="payment-total-text">Total</div>
          <div class="payment-total-price">{{ total }}€</div>
        </div>
        <button class="green_button styled_button center">Paiement</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      total: 0
    };
  },
  computed: {
    list() {
      console.log(this.$store.state.cart);

      return this.$store.state.cart;
    }
  },
  created() {
    console.log("created");
    this.$store.state.cart.forEach(item => {
      this.total += item.price;
    });
  }
};
</script>

<!-- <style scoped>
.payment {
  display: block;
  text-align: center;
}
</style> -->
