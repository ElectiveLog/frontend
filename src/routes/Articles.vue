<template>
  <main class="container">
    <ListArticles />
    <AddArticle />
  </main>
</template>

<script>
import ListArticles from "@/components/mongo/ListArticles";
import AddArticle from "@/components/mongo/AddArticle";

export default {
  name: "home",
  components: {
    ListArticles,
    AddArticle
  }
};
</script>
