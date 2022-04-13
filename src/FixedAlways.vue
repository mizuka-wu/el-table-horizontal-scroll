<template>
<div>
            <h3>always show bar</h3>
        <el-table
          :data="data"
          v-h-scroll="'always'"
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
