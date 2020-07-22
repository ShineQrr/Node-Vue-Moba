<template>
  <div>
    <h1>创建分类</h1>
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
  data() {
    return {
      model: {}
    };
  },
  methods: {
    // 需要请求接口，提交数据
    async save() {
      const res = await this.$http.post("/categories", this.model);
      console.log(res);
      // 跳转到分类列表
      this.$router.push("/categories/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    }
  }
};
</script>

<style>
</style>