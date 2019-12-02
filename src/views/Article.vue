<template>
  <el-container direction="vertical">
    <el-collapse-transition>
      <el-card v-if="article">
        <div slot="header">
          <h1>{{article.title}}</h1>
        </div>
        <div class="markdown-body" v-html="article.bodyHTML" />
      </el-card>
    </el-collapse-transition>

    <el-main v-loading="loading">
      <div ref="comment" />
    </el-main>
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

    gh.attach_comment(this.$refs.comment, id);

    const resp = await gh.get_issue(parseInt(id));

    this.article = resp.repository.issue;

    this.$title(this.article.title);

    this.loading = false;
  }
};
</script>

