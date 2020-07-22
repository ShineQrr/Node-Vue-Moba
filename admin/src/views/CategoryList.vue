<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    //   该组件默认进来就获取数据
    this.fetch();
  },
  methods: {
    // 获取分类列表
    async fetch() {
      const res = await this.$http.get("categories");
      this.items = res.data;
    },
    handleClick(row) {
      console.log(row);
      this.$router.push(`/categories/edit/${row._id}`);
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>