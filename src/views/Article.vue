<template>
  <el-container>
    <el-main v-if="article">
      <h1>{{article.title}}</h1>
      <div class="markdown-body" v-html="html" />
    </el-main>
  </el-container>
</template>

<script>
import marked from "marked";

export default {
  data() {
    return {
      article: null
    };
  },
  mounted() {
    let params = this.$route.params;

    let id = params.id;

    if (id == null) {
      return;
    }

    const issues = this.issues();

    issues.getIssue(id).then(({ data }) => {
      this.article = {
        id,
        title: data.title,
        desc: "this is desc",
        body: data.body
      };
    });
  },
  computed: {
    html() {
      if (this.article == null) {
        return;
      }

      return marked(this.article.body);
    }
  }
};
</script>