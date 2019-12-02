<template>
  <el-main>
    <article-card v-for="article in articles" :key="article.number" :value="article" />
  </el-main>
</template>

<script>
import ArticleCard from "./ArticleCard";

export default {
  components: { ArticleCard },
  data() {
    return {
      articles: [],
      last: null
    };
  },
  async mounted() {
    const gh = this.$github;

    const resp = await gh.get_issues();

    console.dir(resp);

    const issues = resp.repository.issues.nodes;

    for (let issue of issues) {
      this.articles.push(issue);
    }
  }
};
</script>