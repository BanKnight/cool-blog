<template>
  <el-main>
    <article-card v-for="article in articles" :key="article.id" :value="article" />
  </el-main>
</template>

<script>
import ArticleCard from "./ArticleCard";

export default {
  data() {
    return {
      articles: [
        { id: 1, title: "title1", desc: "desc1" },
        { id: 2, title: "title2", desc: "desc2" },
        { id: 3, title: "title3", desc: "desc3" }
      ]
    };
  },
  components: { ArticleCard }
};
</script>