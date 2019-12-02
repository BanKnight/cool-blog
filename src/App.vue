<template>
  <el-container id="app" direction="vertical" class="full">
    <nav-head />
    <transition name="el-fade-in">
      <router-view />
    </transition>
  </el-container>
</template>

<script>
import NavHead from "@/components/NavHead";

export default {
  components: { NavHead }
};
</script>

<style >
@import "~github-markdown-css";
@import "~nprogress/nprogress.css";

body,
html {
  width: 100%;
  height: 100%;

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0;
}

p {
  margin-top: 0;
  margin-bottom: 10px;
}

.full {
  width: 100%;
  height: 100%;
}

.full-width {
  width: 100%;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;
}

.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-scrollbar__view {
  height: 100%;
}
.el-tree {
  height: 100%;
  background-color: transparent;
  overflow-y: auto;
  overflow-x: auto;
}
.el-tree > .el-tree-node {
  width: 100%;
  display: inline-block;
}
</style>
