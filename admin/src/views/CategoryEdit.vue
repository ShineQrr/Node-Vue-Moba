<template>
  <div>
    <h1>{{ id? '编辑': '创建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  created() {
    // 如果是编辑分类，则获取当前分类的名称
    this.id && this.fetch();
  },
  methods: {
    // 需要请求接口，提交数据
    async save() {
      let res;
      // 新建分类时用post，编辑分类用put
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/categories", this.model);
      }
      console.log(res);
      // 跳转到分类列表
      this.$router.push("/categories/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    // 获取当前id对应的分类名称
    async fetch() {
      const res = await this.$http.get(`categories/edit/${this.id}`);
      this.model = res.data;
    }
  }
};
</script>

<style>
</style>