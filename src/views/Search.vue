<template>
  <el-card class="full" shadow="never">
    <el-table
      :data="articles"
      v-loading="loading && more == false"
      style="width: 100%"
      :show-header="false"
    >
      <el-table-column>
        <template slot-scope="scope">
          <article-card :value="scope.row" />
        </template>
      </el-table-column>
    </el-table>

    <el-button v-if="more" type="text" :loading="loading" @click="search">加载更多</el-button>
  </el-card>
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
      keyword: null,
      loading: false,
      more: false
    };
  },
  watch: {
    $route() {
      this.keyword = this.$route.query.keyword;
      this.articles = [];

      this.search();
    }
  },
  mounted() {
    let query = this.$route.query;

    let keyword = query.keyword;

    if (keyword == null) {
      return;
    }

    this.keyword = query.keyword;

    this.search();
  },
  methods: {
    async search() {
      if (this.keyword == null) {
        return;
      }
      if (this.keyword.length == 0) {
        return;
      }

      this.loading = true;

      const gh = this.$github;
      const resp = await gh.search(this.keyword, this.last);

      console.dir(resp);

      const issues = resp.search.nodes;

      for (let issue of issues) {
        this.articles.push(issue);
      }

      this.loading = false;
      this.last = resp.search.pageInfo.endCursor;
      this.more = resp.search.pageInfo.hasNextPage;
    }
  }
};
</script>
