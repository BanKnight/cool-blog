<template>
  <el-main>
    <article-card v-for="article in articles" :key="article.id" :value="article" />
  </el-main>
</template>

<script>
import ArticleCard from "./ArticleCard";

export default {
  components: { ArticleCard },
  data() {
    return {
      articles: []
    };
  },
  async mounted() {
    console.log("articles mounted before");

    const issues = this.issues();

    const resp = await issues.listIssues({
      state: "open",
      creator: this.$store.state.config.user,
      labels: process.env.NODE_ENV,
      sort: "created"
    });

    this.articles = [];

    for (let one of resp.data) {
      let article = {
        id: one.id,
        title: one.title,
        created: one.created_at
      };

      this.articles.push(article);

      console.log(resp.data);
    }
  }
};
</script>