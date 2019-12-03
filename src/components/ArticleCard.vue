<template>
  <el-container class="full-width article-card" direction="vertical">
    <span>
      <router-link :to="'/article/' + value.number" class="el-link el-link--default">
        <h2>{{value.title}}</h2>
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



