<template>
  <el-container class="full">
    <el-aside width="200px">
      <nav-left />
    </el-aside>
    <el-main v-loading="loading">
      <article-card v-for="article in articles" :key="article.number" :value="article" />
    </el-main>
  </el-container>
</template>

<script>
import NavLeft from "@/components/NavLeft";
import ArticleCard from "@/components/ArticleCard";

export default {
  name: "home",
  components: { NavLeft, ArticleCard },
  data() {
    return {
      articles: [],
      last: null,
      loading: false
    };
  },
  async mounted() {
    const gh = this.$github;

    this.loading = true;
    const resp = await gh.get_issues();

    console.dir(resp);

    const issues = resp.repository.issues.nodes;

    for (let issue of issues) {
      this.articles.push(issue);
    }

    this.loading = false;
  }
};
</script>
