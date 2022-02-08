<template>
  <div id="app">
    <el-table :data="data">
      <el-table-column label="a" prop="a"></el-table-column>
      <el-table-column label="b" prop="b"></el-table-column>
      <el-table-column label="c" prop="c"></el-table-column>
      <el-table-column label="d" prop="d"></el-table-column>
    </el-table>
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
