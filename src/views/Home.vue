<template>
  <el-container class="full">
    <el-main v-loading="loading">
      <el-collapse-transition v-for="article in articles" :key="article.number">
        <article-card :value="article" />
      </el-collapse-transition>
    </el-main>
  </el-container>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";

export default {
  name: "home",
  components: { ArticleCard },
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
