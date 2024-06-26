# el-table-horizontal-scroll

> let el-table show horizontal scroll-bar at bottom

support vue2 and vue3

[中文文档]('./README_CN.md')

## How to use

![](./res.gif)

### install

```
npm install el-table-horizontal-scroll
```

### register directive

```
import horizontalScroll from 'el-table-horizontal-scroll'

# vue2
Vue.use(horizontalScroll)

# vue3
app.use(horizontalScroll)
```

or

```
import horizontalScroll from 'el-table-horizontal-scroll'

export default {
    directives: {
        horizontalScroll
    }
}
```

### use

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

## props

you can use `always` or `hover` or `hidden`

default is `hover`, the bar will show when your mouse over the table

or you can change it to always, and make the bar always show

example

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

## How to change scrollbar‘s height

`.el-table-horizontal-scrollbarl`

manual add style to this class

if you think the scroller is so small when hover,
you can add this to the style

```css
.el-table-horizontal-scrollbar:hover {
  transform: scaleY(1.5);
  filter: brightness(0.1);
  transform: scaleY(1.75) translateY(-10%);
}
```
