<template>
  <el-container>
    <el-main v-if="article">
      <h1>{{article.title}}</h1>
      <div class="markdown-body" v-html="article.bodyHTML" />
      <div ref="comment" />
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

    id = parseInt(id);

    const gh = this.$github;

    const resp = await gh.get_issue(parseInt(id));

    console.log(resp);

    this.article = resp.repository.issue;

    this.$nextTick(() => {
      gh.attach_comment(this.$refs.comment, this.article.number);
    });
  }
};
</script>

<style scoped>
.utterances {
  max-width: 100%;
}
</style>