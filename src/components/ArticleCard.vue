<template>
  <el-container class="full-width article-card" direction="vertical">
    <span>
      <router-link :to="'/article/' + value.number" class="el-link el-link--default">
        <h2>{{value.title}}</h2>
      </router-link>
    </span>

    <span>
      <el-tag
        v-for="label in value.labels.nodes"
        :key="label.name"
        size="mini"
        type="info"
        effect="dark"
      >{{ label.name }}</el-tag>
    </span>

    <p>{{value.createdAt}}</p>
  </el-container>
</template>

<script>
import { utc_to_local } from "@/utils";

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    time() {
      return utc_to_local(this.value.createdAt);
    }
  }
};
</script>



