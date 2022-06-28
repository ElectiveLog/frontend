<template>
  <main class="container">
    <ListArticles />
    <AddArticle />
    <!-- <UpdateArticle /> -->
  </main>
</template>

<script>
import ListArticles from "@/components/mongo/ListArticles";
import AddArticle from "@/components/mongo/AddArticle";
// import UpdateArticle from "@/components/mongo/UpdateArticle";

export default {
  name: "home",
  components: {
    ListArticles,
    AddArticle
    // UpdateArticle,
  }
};
</script>
