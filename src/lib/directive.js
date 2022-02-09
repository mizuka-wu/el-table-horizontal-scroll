/**
 * 创建一个scroller的dom
 */
import { throttle } from 'lodash'
class Scroller {
  /**
   * 给tableBody创建一个scroller
   * @param {Element} targetTableEl
   */
  constructor (targetTableEl) {
    if (!targetTableEl) {
      throw new Error('need have table element')
    }
    this.targetTableEl = targetTableEl

    /**
     * 创建相关dom
     */
    const scroller = document.createElement('div')
    scroller.classList.add('el-scrollbar')
    scroller.style.width = '100%'
    scroller.style.height = '8px'
    scroller.style.position = 'fixed'
    scroller.style.bottom = 0
    scroller.style.zIndex = 3

    this.dom = scroller

    const bar = document.createElement('div')
    bar.classList.add('el-scrollbar__bar', 'is-horizontal')
    this.bar = bar
    scroller.appendChild(bar)

    const thumb = document.createElement('div')
    thumb.classList.add('el-scrollbar__thumb')
    bar.appendChild(thumb)
    this.thumb = thumb

    /**
     * 初始化配置
     */
    this.checkIsScrollBottom = throttle(function () {
      const viewHeight = window.innerHeight || document.documentElement.clientHeight
      const { bottom } = targetTableEl.getBoundingClientRect()
      if (bottom <= viewHeight) {
        this.hideScroller()
      } else {
        this.showScroller()
      }
    }.bind(this)
    , 1000 / 60)
    document.addEventListener('scroll', this.checkIsScrollBottom)

    this.showBar()
    setTimeout(() => {
      this.resetBar()
    }, 1000)
  }

  /**
   * 自动设置Bar
   */
  resetBar () {
    const { targetTableEl } = this
    const widthPercentage = (targetTableEl.clientWidth * 100 / targetTableEl.scrollWidth)
    const thumbWidth = Math.min(widthPercentage, 100)
    this.thumb.style.width = `${thumbWidth}%`
  }

  /**
   * 显示整体
   */
  showScroller () {
    this.dom.style.display = 'initial'
  }

  /**
   * 隐藏整体
   */
  hideScroller () {
    this.dom.style.display = 'none'
  }

  /**
   * 显示滚动条
   */
  showBar () {
    this.bar.style.opacity = 1
  }

  /**
   * 隐藏滚动条
   */
  hideBar () {
    this.bar.style.opacity = 0
  }

  destory () {
    document.removeEventListener('scroll', this.checkIsScrollBottom)
  }
}

/** @type {Vue.DirectiveOptions} */
export const directive = {
  inserted (el) {
    const tableBodyWrapper = el.querySelector('.el-table__body-wrapper')
    const scroller = new Scroller(tableBodyWrapper)
    el.appendChild(scroller.dom)
    el.horizontalScroll = scroller
    el.addEventListener('mouseover', scroller.showBar.bind(scroller))
    el.addEventListener('mouseleave', scroller.hideBar.bind(scroller))
  },
  unbind (el) {
    el.horizontalScroll.destory()
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
