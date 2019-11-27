<template>
  <el-container class="full">
    <el-aside width="200px">
      <nav-left />
    </el-aside>
    <el-container>
      <articles />
    </el-container>
  </el-container>
</template>

<script>
import NavLeft from "@/components/NavLeft";
import Articles from "@/components/Articles";

export default {
  name: "home",
  components: { NavLeft, Articles }
};
</script>
