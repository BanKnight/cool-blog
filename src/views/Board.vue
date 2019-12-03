<template>
  <el-main direction="vertical" v-loading="loading">
    <div ref="board" />
  </el-main>
</template>

<script>
// import marked from "marked";

export default {
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    this.loading = true;

    const gh = this.$github;

    await gh.attach_board(this.$refs.board);

    this.loading = false;
  }
};
</script>

