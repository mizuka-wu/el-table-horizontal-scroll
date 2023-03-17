<template>
  <div>
    <h3>always show bar</h3>
    <div style="height: 100vh"></div>
    <el-table :data="data" v-horizontal-scroll="'always'">
      <el-table-column fixed="left" width="100" label="a" prop="a"></el-table-column>
      <el-table-column label="b" width="100" prop="b"></el-table-column>
      <el-table-column label="c" width="100" prop="c"></el-table-column>
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
