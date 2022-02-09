<template>
  <div id="app">
    <el-row>
      <h3>控制器</h3>
      <el-button @click="addColumn">增加一列</el-button>
    </el-row>
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
            :key="column + index"
            :label="column"
            :prop="column"
            v-for="(column, index) of columns"
            width="30"
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
      columns: [
        'a'
      ],
      data: Array.from(new Array(200)).map(() => ({
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }))
    }
  },
  methods: {
    addColumn () {
      this.columns.push('a')
    }
  },
  directives: {
    hScroll: directive
  }
}
</script>

<style lang="scss">
</style>
