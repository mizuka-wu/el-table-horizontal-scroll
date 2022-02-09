<template>
  <div id="app">
    <el-row :gutter="8">
      <el-col :span="12">
        <h3>有fixed</h3>
        <el-table
          :data="data"
          v-h-scroll
        >
          <el-table-column
            fixed="left"
            label="a"
            prop="a"
          ></el-table-column>
          <el-table-column
            label="b"
            prop="b"
          ></el-table-column>
          <el-table-column
            label="c"
            prop="c"
          ></el-table-column>
          <el-table-column
            label="d"
            prop="d"
            width="1600"
          ></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <h3>无fixed</h3>
        <el-table
          :data="data"
          v-h-scroll
        >
          <el-table-column
            label="a"
            prop="a"
          ></el-table-column>
          <el-table-column
            label="b"
            prop="b"
          ></el-table-column>
          <el-table-column
            label="c"
            prop="c"
          ></el-table-column>
          <el-table-column
            label="d"
            prop="d"
            width="1600"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
