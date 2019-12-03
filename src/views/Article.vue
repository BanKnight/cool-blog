<template>
  <el-container direction="vertical" v-loading="loading">
    <el-card v-if="article" shadow="never">
      <div slot="header">
        <h1>{{article.title}}</h1>
        <span>
          <el-tag
            v-for="label in article.labels.nodes"
            :key="label.name"
            type="info"
            effect="dark"
          >{{ label.name }}</el-tag>
        </span>
      </div>
      <div class="markdown-body" v-html="article.bodyHTML" />
    </el-card>
    <div ref="comment" />
  </el-container>
</template>

<script>
// import marked from "marked";

export default {
  data() {
    return {
      article: null,
      loading: false
    };
  },
  async mounted() {
    let params = this.$route.params;

    let id = params.id;

    if (id == null) {
      return;
    }

    id = parseInt(id);

    this.loading = true;

    const gh = this.$github;

    const is_comment_ok = gh.attach_comment(this.$refs.comment, id);

    const resp = await gh.get_issue(parseInt(id));

    this.article = resp.repository.issue;

    this.$title(this.article.title);

    this.loading = false;

    await is_comment_ok;
  }
};
</script>

