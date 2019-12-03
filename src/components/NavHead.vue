<template>
  <el-row class="full-width head" type="flex" justify="space-around" align="middle">
    <el-menu
      :default-active="activeIndex"
      :router="true"
      mode="horizontal"
      @select="handleSelect"
      background-color="transparent"
      text-color="#bebfc1"
      active-text-color="white"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/message">留言</el-menu-item>
    </el-menu>

    <el-input
      placeholder="请输入内容"
      v-model="keyword"
      clearable
      size="mini"
      style="width:200px"
      suffix-icon="el-icon-search"
    ></el-input>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/",
      keyword: ""
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
  background-color: #303133;
  border-bottom: solid 1px #e6e6e6;
  height: 60px;
  width: 100%;
}

.el-menu {
  border-bottom: none;
}
</style>