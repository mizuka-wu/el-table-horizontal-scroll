<template>
  <div id="app">
    <el-table v-h-scroll :data="data">
      <el-table-column fixed="left" label="a" prop="a"></el-table-column>
      <el-table-column label="b" prop="b"></el-table-column>
      <el-table-column label="c" prop="c"></el-table-column>
      <el-table-column label="d" width="1600" prop="d"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { directive } from './lib/directive'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      data: Array.from(new Array(200)).map(() => ({
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }))
    }
  },
  directives: {
    hScroll: directive
  }
}
</script>

<style lang="scss">
</style>
