/* eslint-disable no-unused-vars */
/**
 * 创建一个scroller的dom
 */
import { throttle } from 'throttle-debounce'

const THROTTLE_TIME = 1000 / 60

class Scroller {
  /**
   * 给tableBody创建一个scroller
   * @param {Element} targetTableWrapperEl
   * @param {string} mode
   */
  constructor (targetTableWrapperEl, mode = 'hover') {
    if (!targetTableWrapperEl) {
      throw new Error('need have table element')
    }
    this.targetTableWrapperEl = targetTableWrapperEl
    this.fullwidth = false
    this.mode = mode
    this.isVisible = false

    /**
     * 创建相关dom
     */
    const scroller = document.createElement('div')
    scroller.classList.add('el-scrollbar', 'el-table-horizontal-scrollbar')
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
    this.checkIsScrollBottom = throttle(THROTTLE_TIME, function () {
      if (!instance.isVisible) {
        instance.hideScroller()
        return
      }
      const viewHeight = window.innerHeight || document.documentElement.clientHeight
      const { bottom } = targetTableWrapperEl.getBoundingClientRect()
      if (bottom <= viewHeight) {
        instance.hideScroller()
        instance.hideBar()
      } else {
        // 需要重新设置一次当前宽度
        instance.resetBar(false)

        // 显示当前的bar
        instance.showScroller()

        if (instance.mode === 'always') {
          instance.showBar()
        }
      }
    }
    )
    document.addEventListener('scroll', this.checkIsScrollBottom) // 全局判断是否需要显示scroller

    // 自动同步,table => scroller
    targetTableWrapperEl.addEventListener('scroll', throttle(THROTTLE_TIME, function () {
      instance.resetThumbPosition()
    }))

    // 自动同步 scroller => table
    this.syncDestoryHandler = this.initScrollSyncHandler()

    this.tableElObserver = null

    if (MutationObserver) {
      // 监听table的dom变化，自动重新设置
      this.tableElObserver = new MutationObserver(() => this.forceUpdate())
      this.tableElObserver.observe(
        targetTableWrapperEl.querySelector('.el-table__body'),
        {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style']
        }
      )
    }

    this.tableResizeObserver = null

    if (ResizeObserver) {
      this.tableResizeObserver = new ResizeObserver(() => this.forceUpdate())
      this.tableResizeObserver.observe(targetTableWrapperEl)
    }

    this.tableIn = null
    if (IntersectionObserver) {
      this.tableIntersectionObserver = new IntersectionObserver(([entry]) => {
        this.isVisible = entry.intersectionRatio > 0
        this.forceUpdate()
      })
      this.tableIntersectionObserver.observe(targetTableWrapperEl)
    }

    // bar宽度自动重制
    this.forceUpdate()
  }

  /**
   * 自动设置Bar
   * @param {boolean} changeScrollerVisible 是否开启自动设置滚动条显示与否
   */
  resetBar (changeScrollerVisible = true) {
    const { targetTableWrapperEl } = this
    const widthPercentage = (targetTableWrapperEl.clientWidth * 100 / targetTableWrapperEl.scrollWidth)
    const thumbWidth = Math.min(widthPercentage, 100)
    this.thumb.style.width = `${thumbWidth}%`

    this.fullwidth = thumbWidth >= 100

    if (changeScrollerVisible) {
      if (this.fullwidth) {
        this.hideScroller()
      } else {
        this.checkIsScrollBottom()
      }
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

  forceUpdate () {
    setTimeout(() => {
      this.resetBar()
      this.resetScroller()
      this.resetThumbPosition()
      this.checkIsScrollBottom()
    }, THROTTLE_TIME)
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
      THROTTLE_TIME,
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
      })
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
    if (!this.isVisible) {
      return
    }
    this.bar.style.opacity = 1
  }

  /**
   * 隐藏滚动条
   */
  hideBar () {
    if (!this.isVisible) {
      this.bar.style.opacity = 0
      return
    }
    if (this.mode === 'always') {
      this.bar.style.opacity = 1
    } else {
      this.bar.style.opacity = 0
    }
  }

  destory () {
    document.removeEventListener('scroll', this.checkIsScrollBottom)
    this.tableElObserver && this.tableElObserver.disconnect()
    this.tableResizeObserver && this.tableResizeObserver.disconnect()
    this.tableIntersectionObserver && this.tableIntersectionObserver.disconnect()
    this.syncDestoryHandler()
  }
}

/** @type {Vue.DirectiveOptions} */
export const directiveVue2 = {
  inserted (el, binding) {
    const { value = 'hover' } = binding
    const tableBodyWrapper = el.querySelector('.el-table__body-wrapper')
    const scroller = new Scroller(tableBodyWrapper, value)

    el.appendChild(scroller.dom)
    el.horizontalScroll = scroller

    if (value === 'hover') {
      el.addEventListener('mouseover', scroller.showBar.bind(scroller))
      el.addEventListener('mouseleave', scroller.hideBar.bind(scroller))
    } else {
      scroller.showBar()
    }
  },
  unbind (el) {
    el.horizontalScroll.destory()
  }
}

export const directiveVue3 = {
  mounted (el, binding) {
    const { value = 'hover' } = binding
    const tableBodyWrapper = el.querySelector('.el-table__body-wrapper .el-scrollbar__wrap')
    if (!tableBodyWrapper) {
      console.info('未找到可挂载的对象')
      return
    }
    const scroller = new Scroller(tableBodyWrapper, value)

    el.appendChild(scroller.dom)
    el.horizontalScroll = scroller

    if (value === 'hover') {
      el.addEventListener('mouseover', scroller.showBar.bind(scroller))
      el.addEventListener('mouseleave', scroller.hideBar.bind(scroller))
    } else {
      scroller.showBar()
    }
  },
  unmounted (el) {
    el.horizontalScroll && el.horizontalScroll.destory()
  }
}

/**
 * 插件
 * @type {VuePlugin}
 */
export const Plugin = {
  install (Vue) {
    Vue.directive('horizontalScroll', {
      ...directiveVue2,
      ...directiveVue3
    })
  }
}

export default Plugin
