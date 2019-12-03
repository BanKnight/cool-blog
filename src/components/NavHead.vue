<template>
  <el-row class="head" type="flex" justify="center">
    <el-row
      style="max-width:768px;width:100%;padding: 0 10px;"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <span>
        <router-link to="/" class="el-link el-link--default" style="color:#eef4fc">
          <h3>Cool Blog</h3>
        </router-link>
      </span>

      <el-row type="flex" justify="end" align="middle">
        <el-menu
          :default-active="current"
          :router="true"
          mode="horizontal"
          background-color="transparent"
          text-color="#bebfc1"
          active-text-color="white"
        >
          <el-menu-item v-for="route in routes" :key="route.name" :index="route.path">{{route.nav}}</el-menu-item>
        </el-menu>

        <el-input
          class="search"
          placeholder="请输入内容"
          v-model="keyword"
          clearable
          size="mini"
          prefix-icon="el-icon-search"
          @clear="on_clear"
          @keydown.enter.native.stop="on_search"
        ></el-input>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import { routes } from "@/router";

export default {
  data() {
    return {
      keyword: "",
      routes: []
    };
  },
  mounted() {
    this.routes = routes.filter(one => {
      return one.nav != null;
    });

    console.log(this.routes);

    if (this.$route.name == "search") {
      this.keyword = this.$route.query.keyword;
    }
  },
  computed: {
    current() {
      return this.$route.path;
    }
  },
  methods: {
    on_clear() {
      this.$router.push("/");
    },
    on_search() {
      if (
        this.$route.name == "search" &&
        this.$route.query.keyword == this.keyword
      ) {
        return;
      }

      this.$router.push({ name: "search", query: { keyword: this.keyword } });
    }
  }
};
</script>

<style>
.head {
  background-color: #3c4146;
  border-bottom: solid 1px #e6e6e6;
  height: 60px;
  width: 100%;
}

.el-menu {
  border-bottom: none;
}

.search {
  max-width: 200px;
  width: 100%;
  font-weight: 400;
  transition: width 0.3s ease-in-out 0s;
}

.search > input {
  background-color: #202326;
  outline: 0;
  color: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
}

.search > input:focus {
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075),
    0 0 6px rgba(0, 121, 209, 0.5);
}
</style>