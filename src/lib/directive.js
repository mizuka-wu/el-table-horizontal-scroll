/**
 * 创建一个scroller的dom
 */
import { throttle } from 'lodash'
class Scroller {
  constructor () {
    const scroller = document.createElement('div')
    scroller.classList.add('el-scrollbar')
    scroller.style.width = '100%'
    scroller.style.height = '6px'
    scroller.style.position = 'fixed'
    scroller.style.bottom = 0

    this.dom = scroller

    const bar = document.createElement('div')
    bar.classList.add('el-scrollbar__bar', 'is-horizontal')
    bar.style.opacity = 1
    scroller.appendChild(bar)

    const thumb = document.createElement('div')
    thumb.classList.add('el-scrollbar__thumb')
    bar.appendChild(thumb)
    this.thumb = thumb
  }

  /**
   * 自动设置宽度
   * @param {Element} tableBodyWrapper
   */
  autoSetBarWidth (tableBodyWrapper) {
    const widthPercentage = (tableBodyWrapper.clientWidth * 100 / tableBodyWrapper.scrollWidth)
    const thumbWidth = Math.min(widthPercentage, 100)

    this.thumb.style.width = `${thumbWidth}%`
  }

  show () {
    this.dom.style.display = 'initial'
  }

  hide () {
    this.dom.style.display = 'none'
  }
}

/** @type {Vue.DirectiveOptions} */
export const directive = {
  inserted (tableWrapper) {
    const tableBodyWrapper = tableWrapper.querySelector('.el-table__body-wrapper')
    const scroller = new Scroller()
    tableWrapper.appendChild(scroller.dom)

    // 初始化
    setTimeout(() => {
      scroller.autoSetBarWidth(tableBodyWrapper)
    }, 1000)

    /**
     * 判断是否滚动到底了
     */
    const checkIsScrollBottom = throttle(function () {
      const viewHeight = window.innerHeight || document.documentElement.clientHeight
      const { bottom } = tableBodyWrapper.getBoundingClientRect()
      if (bottom <= viewHeight) {
        scroller.hide()
      } else {
        scroller.show()
      }
    }
    , 1000 / 60)
    tableBodyWrapper.checkIsScrollBottom = checkIsScrollBottom
    document.addEventListener('scroll', checkIsScrollBottom)
  },
  unbind (el) {
    document.removeEventListener('scroll', el.checkIsScrollBottom)
  }
}

/**
 * 插件
 * @type {VuePlugin}
 */
export const Plugin = {
  install (Vue) {
    Vue.directive('horizontalScroll', directive)
  }
}

export default Plugin
