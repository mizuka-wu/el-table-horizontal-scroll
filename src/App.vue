<template>
  <div id="app">
    <el-table :data="data">
      <el-table-column fixed="left" label="a" prop="a"></el-table-column>
      <el-table-column label="b" prop="b"></el-table-column>
      <el-table-column label="c" prop="c"></el-table-column>
      <el-table-column label="d" width="9000" prop="d"></el-table-column>
    </el-table>
    <el-scrollbar style="white-space: nowrap;">
      <el-tag v-for="(a, index) of data" :key="index">{{ index }}</el-tag>
    </el-scrollbar>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      data: Array.from(new Array(100)).map(() => ({
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }))
    }
  }
}
</script>

<style lang="scss">
</style>
