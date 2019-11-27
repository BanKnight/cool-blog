<template>
  <el-container class="full-width article-card" direction="vertical">
    <h3>{{value.title}}</h3>
    <p>{{value.desc}}</p>
  </el-container>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.article-card {
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e1e4e8;
}

.article-card:first-child {
  padding-top: 0 !important;
}
</style>

