<template>
  <el-container class="full left">
    <el-tree
      class="full-width"
      :data="data"
      :props="defaultProps"
      :highlight-current="true"
      icon-class="el-icon-arrow-right"
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }">
        <i
          :class="{'el-icon-folder':data.children != null,'el-icon-document':data.children == null}"
        ></i>
        {{data.label}}
      </span>
    </el-tree>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style scoped>
.left {
  border-right: 1px solid #e1e4e8 !important;
}
</style>