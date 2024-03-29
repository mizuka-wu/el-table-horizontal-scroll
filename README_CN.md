# el-table-horizontal-scroll

> 让el-table支持横向滚动条一直在底部显示

支持vue2 + vue3

## 使用方法

![](./res.gif)

### 安装

```
npm install el-table-horizontal-scroll
```

### 注册全局指令

```
import horizontalScroll from 'el-table-horizontal-scroll'

# vue2
Vue.use(horizontalScroll)

# vue3
app.use(horizontalScroll)
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

## bar显示模式

可选方法为`always`和`hover`

不输入的情况下默认为`hover`即鼠标移入`table`的`el`才显示

可以改为`always`让`bar`一直显示

例子

```
<el-table
  :data="data"
  v-horizontal-scroll="'always'"
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

## 修改滚动条高度方案

目前采用了el-scroller的class
直接给table下的`.el-table-horizontal-scrollbar`增加对应的style即可

例如，如果你觉得鼠标移动上去显示区域太小，你可以增加

```css
.el-table-horizontal-scrollbar:hover {
  transform: scaleY(1.5);
  filter: brightness(0.1);
  transform: scaleY(1.75) translateY(-10%);
}
```
