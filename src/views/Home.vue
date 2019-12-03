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
    <el-row type="flex" justify="center" align="middle">
      <el-button v-if="more" type="text" :loading="loading" @click="get_data">加载更多</el-button>
    </el-row>
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
      loading: false,
      more: false
    };
  },
  async mounted() {
    this.get_data();
  },
  methods: {
    async get_data() {
      const gh = this.$github;

      this.loading = true;
      const resp = await gh.get_issues(this.last);

      const issues = resp.repository.issues.nodes;

      for (let issue of issues) {
        this.articles.push(issue);
      }

      console.log(this.articles);

      this.loading = false;
      this.last = resp.repository.issues.pageInfo.endCursor;
      this.more = resp.repository.issues.pageInfo.hasNextPage;
    }
  }
};
</script>
