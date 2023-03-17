<template>
  <div>
    <h3>fixed</h3>
    <el-table :data="data" v-horizontal-scroll>
      <el-table-column fixed="left" label="a" prop="a"></el-table-column>
      <el-table-column label="b" prop="b"></el-table-column>
      <el-table-column label="c" prop="c"></el-table-column>
      <el-table-column label="d" prop="d" width="500"></el-table-column>
    </el-table>
    <div style="height: 100vh"></div>
  </div>
</template>
<script>
import data from './data'
export default {
  data () {
    return data
  }
}
</script>
