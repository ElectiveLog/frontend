import http from "../http-common";
class DataService {
  // Restaurants
  getAllRestaurants() {
    return http.get("/restaurants");
  }
  createRestaurant(data) {
    return http.post("/restaurants/create", data);
  }
  deleteRestaurant(id) {
    return http.delete(`/restaurants/${id}`);
  }
  updateRestaurant(id) {
    return http.put(`/restaurants/${id}`);
  }
  getOneRestaurant(id) {
    return http.get(`/restaurants/${id}`);
  }
  getAllRestaurantsByRestaurateur(id) {
    return http.get(`/restaurants/restaurateur/${id}`);
  }

  // Articles
  getAllArticles() {
    return http.get("/articles");
  }
  createArticle(data) {
    return http.post("/articles/create", data);
  }
  deleteArticle(id) {
    return http.delete(`/articles/${id}`);
  }
  updateArticle(id) {
    return http.put(`/articles/${id}`);
  }
  getOneArticle(id) {
    return http.get(`/articles/${id}`);
  }

  // Order
  createOrder(data) {
    return http.post("/orders/create", data);
  }
}
export default new DataService();
