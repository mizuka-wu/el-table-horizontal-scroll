# el-table-horizontal-scroll
〉 让el-table支持横向滚动条一直在底部显示
## 使用方法

### 安装
```
npm install el-table-horizontal-scroll
```

### 注册全局指令
```
import horizontalScroll from 'el-table-horizontal-scroll'
Vue.use(horizontalScroll)
```

### 局部指令
```
import horizontalScroll from 'el-table-horizontal-scroll'

export default {
    directives: {
        horizontalScroll
    }
}
```

### 使用

```
<el-table
  :data="data"
  v-horizontal-scroll
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
```

