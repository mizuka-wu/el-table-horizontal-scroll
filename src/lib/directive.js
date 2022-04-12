/* eslint-disable no-unused-vars */
/**
 * 创建一个scroller的dom
 */
import { throttle } from 'lodash'
class Scroller {
  /**
   * 给tableBody创建一个scroller
   * @param {Element} targetTableWrapperEl
   */
  constructor (targetTableWrapperEl) {
    if (!targetTableWrapperEl) {
      throw new Error('need have table element')
    }
    this.targetTableWrapperEl = targetTableWrapperEl
    this.fullwidth = false

    /**
     * 创建相关dom
     */
    const scroller = document.createElement('div')
    scroller.classList.add('el-scrollbar')
    scroller.style.height = '12px'
    scroller.style.position = 'fixed'
    scroller.style.bottom = 0
    scroller.style.zIndex = 3

    this.dom = scroller
    this.resetScroller()

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
    const instance = this
    this.checkIsScrollBottom = throttle(function () {
      const viewHeight = window.innerHeight || document.documentElement.clientHeight
      const { bottom } = targetTableWrapperEl.getBoundingClientRect()
      if (bottom <= viewHeight) {
        instance.hideScroller()
      } else {
        instance.showScroller()
      }
    }
    , 1000 / 60)
    document.addEventListener('scroll', this.checkIsScrollBottom) // 全局判断是否需要显示scroller

    // 自动同步,table => scroller
    targetTableWrapperEl.addEventListener('scroll', throttle(function () {
      instance.resetThumbPosition()
    }, 1000 / 60))

    // 自动同步 scroller => table
    this.syncDestoryHandler = this.initScrollSyncHandler()

    // 监听table的dom变化，自动重新设置
    this.tableElObserver = new MutationObserver(function () {
      setTimeout(() => {
        instance.resetBar()
        instance.resetScroller()
        instance.resetThumbPosition()
        instance.checkIsScrollBottom()
      })
    })
    this.tableElObserver.observe(targetTableWrapperEl.querySelector('.el-table__body'), {
      attributeFilter: ['style']
    })
    // bar宽度自动重制
    setTimeout(() => {
      this.resetBar()
    })
  }

  /**
   * 自动设置Bar
   */
  resetBar () {
    const { targetTableWrapperEl } = this
    const widthPercentage = (targetTableWrapperEl.clientWidth * 100 / targetTableWrapperEl.scrollWidth)
    const thumbWidth = Math.min(widthPercentage, 100)
    this.thumb.style.width = `${thumbWidth}%`

    if (thumbWidth >= 100) {
      this.fullwidth = true
      this.hideScroller()
    } else {
      this.fullwidth = false
      this.checkIsScrollBottom()
    }
  }

  resetThumbPosition () {
    this.thumb.style.transform = `translateX(${this.moveX}%)`
  }

  resetScroller () {
    const { targetTableWrapperEl, dom } = this
    const boundingClientRect = targetTableWrapperEl.getBoundingClientRect()
    dom.style.left = boundingClientRect.left + 'px'
    dom.style.width = boundingClientRect.width + 'px'
  }

  get moveX () {
    const { targetTableWrapperEl } = this
    return ((targetTableWrapperEl.scrollLeft * 100) / targetTableWrapperEl.clientWidth)
  }

  /**
   * 让scroller的拖动行为和table的同步
   * 处理类似element-ui的拖拽处理
   */
  initScrollSyncHandler () {
    let cursorDown = false
    let tempClientX = 0
    let rate = 1

    const { thumb, targetTableWrapperEl, bar } = this

    function getRate () {
      // 计算一下变换比例，拖拽走的是具体数字，但是这个实际上应该是按照比例变的
      return bar.offsetWidth / thumb.offsetWidth
    }

    const mouseMoveDocumentHandler = throttle(
      /** @param {MouseEvent} e */
      function (e) {
        if (cursorDown === false) {
          return
        }
        const { clientX } = e
        const offset = clientX - tempClientX
        const originTempClientX = tempClientX
        tempClientX = clientX

        const tempScrollleft = targetTableWrapperEl.scrollLeft
        targetTableWrapperEl.scrollLeft += offset * rate
        if (tempScrollleft === targetTableWrapperEl.scrollLeft) {
          tempClientX = originTempClientX
        }
      }, 1000 / 60)
    /** @param {MouseEvent} e */
    function mouseUpDocumentHandler () {
      cursorDown = false
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
      document.onselectstart = null
    }

    /**
     * 拖拽处理
     * @param {MouseEvent} e
     */
    function startDrag (e) {
      e.stopImmediatePropagation()
      cursorDown = true
      document.addEventListener('mousemove', mouseMoveDocumentHandler)
      document.addEventListener('mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    thumb.onmousedown = function (e) {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return
      }

      const { clientX } = e
      tempClientX = clientX
      rate = getRate()
      startDrag(e)
    }

    /**
     * 点击槽快速移动
     * @param {PointerEvent} e
     */
    bar.onclick = function (e) {
      const { target } = e
      if (target !== bar) {
        return
      }
      rate = getRate()
      const { clientX } = e
      let offset = 0
      const thumbPosition = thumb.getBoundingClientRect()
      if (thumbPosition.left >= clientX) {
        offset = (clientX - thumbPosition.left)
      } else {
        offset = clientX - thumbPosition.left - thumbPosition.width
      }

      const targetScrollLeft = targetTableWrapperEl.scrollLeft + offset * rate
      targetTableWrapperEl.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      })
    }

    return function () {
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
    }
  }

  /**
   * 显示整体
   */
  showScroller () {
    if (!this.fullwidth) {
      this.dom.style.display = 'initial'
    }
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
    this.tableElObserver.disconnect()
    document.removeEventListener('scroll', this.checkIsScrollBottom)
    this.syncDestoryHandler()
  }
}

/** @type {Vue.DirectiveOptions} */
export const directive = {
  inserted (el, binding) {
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
