<template>
  <el-container class="full-width article-card" direction="vertical">
    <span>
      <router-link :to="'/article/' + value.number" class="el-link el-link--default">
        <h3>{{value.title}}</h3>
      </router-link>
    </span>
    <p>{{value.createdAt}}</p>
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

<style>
.article-card {
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e1e4e8;
}

.article-card:first-child {
  padding-top: 0 !important;
}
</style>

