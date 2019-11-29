<template>
  <el-row class="full-width">
    <el-menu
      class="head"
      :default-active="activeIndex"
      :router="true"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fafbfc"
      text-color="#24292e"
      active-text-color="#e36209"
    >
      <el-menu-item index="/">首页</el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.head {
  background-color: #fafbfc;
  height: 60px;
  width: 100%;
}
</style>