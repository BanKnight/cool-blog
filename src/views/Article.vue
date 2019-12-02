<template>
  <el-container>
    <el-main v-if="article">
      <h1>{{article.title}}</h1>
      <div class="markdown-body" v-html="html" />
    </el-main>
  </el-container>
</template>

<script>
// import marked from "marked";

export default {
  data() {
    return {
      article: null
    };
  },
  async mounted() {
    let params = this.$route.params;

    let id = params.id;

    if (id == null) {
      return;
    }

    const gh = this.$github;

    const resp = await gh.get_issue(parseInt(id));

    console.log(resp);

    this.article = resp.repository.issue;
  },
  computed: {
    html() {
      if (this.article == null) {
        return;
      }

      return this.article.bodyHTML;
    }
  }
};
</script>