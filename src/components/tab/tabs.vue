<!--
#***********************************************
#
#      Filename: src/components/tab/tabs.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: xxx
#        Create: 2020-06-20 11:17:20
# Last Modified: 2020-06-20 11:17:20
#***********************************************
-->
<template>
  <!-- 标签页 -->
  <div :class="classes">
    <!-- 选项卡 -->
    <div :class="[prefixCls + '-bar']">
      <!-- 选项卡右侧extra插槽 -->
      <div :class="[prefixCls + '-nav-right']" v-if="showSlot">
        <slot name="extra"></slot>
      </div>
      <!-- end选项卡右侧extra插槽 -->
      <!-- 选项卡容器 -->
      <div
        :class="[prefixCls + '-nav-container']"
        tabindex="0"
        ref="navContainer"
        @keydown="handleTabKeyNavigation"
        @keydown.space.prevent="handleTabKeyborderSelect(false)"
      >
        <!-- 选项卡wrap -->
        <div
          ref="navWrap"
          :class="[
            prefixCls + '-nav-wrap',
            scrollable ? prefixCls + '-nav-scrollable' : ''
          ]"
        >
          <!-- 向前滚动 -->
          <span
            :class="[
              prefixCls + '-nav-prev',
              scrollable ? '' : prefixCls + '-nav-scroll-disabled'
            ]"
            @click="scrollPrev"
          >
            <icon-svg iconClass="three-left" class="i20"></icon-svg>
          </span>
          <!-- end向前滚动 -->
          <!-- 向后滚动 -->
          <span
            :class="[
              prefixCls + '-nav-next',
              scrollable ? '' : prefixCls + '-nav-scroll-disabled'
            ]"
            @click="scrollNext"
          >
            <icon-svg iconClass="three-right" class="i20"></icon-svg>
          </span>
          <!-- end向后滚动 -->
          <!-- 滚动区域 -->
          <div
            ref="navScroll"
            :class="[prefixCls + '-nav-scroll']"
            @DOMMouseScroll="handleScroll"
            @mousewheel="handleScroll"
          >
            <div ref="nav" :class="[prefixCls + '-nav']" :style="navStyle">
              <!-- 用于指示选项卡激活的横线 -->
              <div :class="barClasses" :style="barStyle"></div>
              <!-- end用于指示选项卡激活的横线 -->
              <!-- 选项卡 -->
              <div
                :class="tabCls(item)"
                v-for="(item, index) in navList"
                @click="handleChange(index)"
                :key="index"
              >
                <icon-svg
                  v-if="item.icon !== ''"
                  :iconClass="item.icon"
                ></icon-svg>
                <base-render
                  v-if="item.labelType === 'function'"
                  :render="item.label"
                ></base-render>
                <template v-else>{{ item.label }}</template>
                <icon-svg
                  v-if="showClose(item)"
                  iconClass="close"
                  class="i20"
                  @click.native.stop="handleRemove(index)"
                ></icon-svg>
              </div>
              <!-- end选项卡 -->
            </div>
          </div>
          <!-- end滚动区域 -->
        </div>
        <!-- end选项卡wrap -->
      </div>
      <!-- end选项卡容器 -->
    </div>
    <!-- end选项卡 -->
    <!-- 标签页内容插槽 -->
    <div ref="panes" :style="contentStyle" :class="contentClasses">
      <slot></slot>
    </div>
    <!-- end标签页内容插槽 -->
  </div>
  <!-- end标签页 -->
</template>
<script>
import { findComponentsDownward } from "@/utils/assist.js";
import BaseRender from "@/components/BaseRender";
import elementResizeDetectorMaker from "element-resize-detector";

const transitionTime = 300;
const prefixCls = "wd-tabs";

/**
 * @desc: 获取下一个标签,如果下一个标签为disabled，跳过此标签
 * @param: {array} list 标签列表
 * @param: {string} activeKey 激活标签名称
 * @param: {number} direction 获取的标签方向 -1代表前一个,1代表后一个
 * @return: {object} 标签（选项卡）element
 */
const getNextTab = (list, activeKey, direction) => {
  const currentIndex = list.findIndex(tab => tab.name === activeKey);
  const nextIndex = (currentIndex + direction + list.length) % list.length;
  const nextTab = list[nextIndex];
  if (nextTab.disabled) {
    return getNextTab(list, nextTab.name, direction);
  } else {
    return nextTab;
  }
};
/**
 * @desc: 使元素获得焦点，element==root element的第一个子元素获得焦点
 * @param: {object} element 要获得焦点元素的元素
 * @param: {object} root 要获得焦点的元素的根元素
 * @return: {boolean} true成功|false失败
 */
const focusFirst = (element, root) => {
  try {
    element.focus();
  } catch (err) {
    //empty
  }
  if (document.activeElement == element && element !== root) {
    return true;
  }
  const candidates = element.children;
  for (let candidate of candidates) {
    if (focusFirst(candidate, root)) return true;
  }
  return false;
};

export default {
  name: "Tabs",
  components: {
    BaseRender
  },
  provide() {
    return { TabsInstance: this };
  },
  props: {
    //当前激活标签的name
    value: {
      type: [String, Number]
    },
    //Tab的类型，有两种：简单式与卡片式
    type: {
      validator(value) {
        return ["simple", "cart"].indexOf(value) !== -1 ? true : false;
      },
      default: "simple"
    },
    //Tab的大小，普通型和mini型，仅在简单式类型有效
    size: {
      validator(value) {
        return ["small", "default"].indexOf(value) !== -1 ? true : false;
      },
      default: "default"
    },
    //动画开关
    animated: {
      type: Boolean,
      default: true
    },
    //Tabs内的表单控件是否自动获得焦点捕获焦点
    captureFocus: {
      type: Boolean,
      default: false
    },
    //可关闭,仅在卡片式类型有效
    closable: {
      type: Boolean,
      default: false
    },
    //关闭前的函数
    beforeRemove: Function,
    //嵌套使用Tabs时，指定name区分层级
    name: {
      type: String
    }
  },
  data() {
    return {
      //类前缀
      prefixCls: prefixCls,
      //标签列表
      navList: [],
      //bar宽度
      barWidth: 0,
      //bar偏移量
      barOffset: 0,
      //激活的标签
      activeKey: this.value,
      //获取焦点的标签
      focusedKey: this.value,
      //是否显示extra slot
      showSlot: false,
      //标签样式
      navStyle: {
        transform: ""
      },
      //标签是否可滚动
      scrollable: false,
      //标志位，是否正在更换选项卡
      transitioning: false
    };
  },
  computed: {
    //标签类属性
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-card`]: this.type === "card",
          [`${prefixCls}-mini`]:
            this.size === "small" && this.type === "simple",
          [`${prefixCls}-no-animation`]: !this.animated
        }
      ];
    },
    //标签内容的类属性
    contentClasses() {
      return [
        `${prefixCls}-content`,
        {
          [`${prefixCls}-content-animated`]: this.animated
        }
      ];
    },
    //标签内容的样式属性
    contentStyle() {
      const x = this.getTabIndex(this.activeKey);
      const p = x === 0 ? "0%" : `-${x}00%`;
      let style = {};
      if (x > -1) {
        style = {
          transform: `translateX(${p}) translateZ(0px)`
        };
      }
      return style;
    },
    //tab的类属性
    tabCls() {
      return item => {
        return [
          `${prefixCls}-tab`,
          {
            [`${prefixCls}-tab-disabled`]: item.disabled,
            [`${prefixCls}-tab-active`]: item.name === this.activeKey,
            [`${prefixCls}-tab-focused`]: item.name === this.focusedKey
          }
        ];
      };
    },
    //激活的标签下的横线的类属性
    barClasses() {
      return [
        `${prefixCls}-ink-bar`,
        {
          [`${prefixCls}-ink-bar-animated`]: this.animated
        }
      ];
    },
    //激活的标签下的横线的样式
    barStyle() {
      let style = {
        visibility: "hidden",
        width: `${this.barWidth}px`
      };
      if (this.type === "simple") style.visibility = "visible";
      if (this.animated) {
        style.transform = `translate3d(${this.barOffset}px, 0px, 0px)`;
      } else {
        style.left = `${this.barOffset}px`;
      }
      return style;
    }
  },
  methods: {
    //获取所有标签项(TabPane)Components的列表
    getTabs() {
      const AllTabPanes = findComponentsDownward(this, "TabPane");
      const TabPanes = [];

      AllTabPanes.forEach(item => {
        //当嵌套使用时，item的tab属性设置指向对应tabs的name字段
        if (item.tab && this.name) {
          if (item.tab === this.name) {
            TabPanes.push(item);
          }
        } else {
          TabPanes.push(item);
        }
      });
      //当TabPane使用v-if时，并不会按照预先的顺序渲染，这时可设置index，并从小到大排序（需要大于0）
      TabPanes.sort((a, b) => {
        if (a.index && b.index) {
          return a.index > b.index ? 1 : -1;
        }
      });
      return TabPanes;
    },
    //更新标签列表
    updateNav() {
      this.navList = [];
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          //标签类型 String|Function
          labelType: typeof pane.label,
          //标签头显示文字
          label: pane.label,
          //标签头显示图标
          icon: pane.icon || "",
          //用于标识当前面板，对应value，默认为其索引值
          name: pane.currentName || index,
          disabled: pane.disabled,
          closable: pane.closable
        });
        //标签没有props name属性，索引值代替
        if (!pane.currentName) pane.currentName = index;
        //Tabs没有激活的标签，将第一个标签设置为激活状态
        if (index === 0) {
          if (!this.activeKey) this.activeKey = pane.currentName || index;
        }
      });
    },
    /**
     * @desc: 刷新Bar（用于显示选项卡激活状态的横线）
     * @returns: void
     */
    updateBar() {
      this.$nextTick(() => {
        const index = this.getTabIndex(this.activeKey);
        if (!this.$refs.nav) return;
        const prevTabs = this.$refs.nav.querySelectorAll(`.${prefixCls}-tab`);
        const tab = prevTabs[index];
        this.barWidth = tab ? parseFloat(tab.offsetWidth) : 0;

        if (index > 0) {
          let offset = 0;
          const gutter = this.size === "small" ? 0 : 16;
          for (let i = 0; i < index; i++) {
            offset += parseFloat(prevTabs[i].offsetWidth) + gutter;
          }
          this.barOffset = offset;
        } else {
          this.barOffset = 0;
        }
        this.updateNavScroll();
      });
    },
    //更新标签激活状态
    updateStatus() {
      const tabs = this.getTabs();
      tabs.forEach(
        tab => (tab.show = tab.currentName === this.activeKey || this.animated)
      );
    },
    /**
     * @desc: 选择选项卡
     * @param: {number} index 选项卡index
     * @return: void
     */
    handleChange(index) {
      if (this.transitioning) return;
      this.transitioning = true;
      setTimeout(() => (this.transitioning = false), transitionTime);
      const nav = this.navList[index];
      if (nav.disabled) return;
      this.activeKey = nav.name;
      this.$emit("input", nav.name);
      this.$emit("on-click", nav.name);
    },
    /**
     * @desc: 选项卡容器键盘事件,左右方向键会改变当前选项卡的焦点
     * @param: {object event} e 事件对象
     * @return: void
     */
    handleTabKeyNavigation(e) {
      if (e.keyCode !== 37 && e.keyCode !== 39) return;
      const direction = e.keyCode === 39 ? 1 : -1;
      const nextTab = getNextTab(this.navList, this.focusedKey, direction);
      this.focusedKey = nextTab.name;
    },
    /**
     * @desc: 选项卡容器空格按键按下的键盘事件
     * @param: {boolean} [init=false] 初始化标志 ture不进行操作
     * @return: void
     */
    handleTabKeyboardSelect(init = false) {
      if (init) return;
      const focused = this.focusedKey || 0;
      const index = this.getTabIndex(focused);
      this.handleChange(index);
    },
    //移除按钮点击事件
    handleRemove(index) {
      if (!this.beforeRemove) {
        return this.handleRemoveTab(index);
      }
      const before = this.beforeRemove(index);
      if (before && before.then) {
        before.then(() => {
          this.handleRemoveTab(index);
        });
      } else {
        this.handleRemoveTab(index);
      }
    },
    //移除标签
    handleRemoveTab(index) {
      const tabs = this.getTabs();
      const tab = tabs[index];
      tab.$destroy();

      if (tab.currentName === this.activeKey) {
        const newTabs = this.getTabs();
        let activeKey = -1;

        if (newTabs.length) {
          const leftNoDisabledTabs = tabs.filter(
            (item, itemIndex) => !item.disabled && itemIndex < index
          );
          const rightNoDisabledTabs = tabs.filter(
            (item, itemIndex) => !item.disabled && itemIndex > index
          );
          if (rightNoDisabledTabs.length) {
            activeKey = rightNoDisabledTabs[0].currentName;
          } else if (leftNoDisabledTabs.length) {
            activeKey =
              leftNoDisabledTabs[leftNoDisabledTabs.length - 1].currentName;
          } else {
            activeKey = newTabs[0].currentName;
          }
        }
        this.activeKey = activeKey;
        this.$emit("input", activeKey);
      }
      this.$emit("on-tab-remove", tab.currentName);
      this.updateNav();
    },
    //标签栏向前滚动
    scrollPrev() {
      const containerWidth = this.$refs.naScroll.offsetWidth;
      const currentOffset = this.getCurrentScrollOffset();
      if (!currentOffset) return;
      let newOffset =
        currentOffset > containerWidth ? currentOffset - containerWidth : 0;
      this.setOffset(newOffset);
    },
    //标签栏向后滚动
    scrollNext() {
      const navWidth = this.$refs.nav.offsetWidth;
      const containerWidth = this.$refs.navScroll.offsetWidth;
      const currentOffset = this.getCurrentScrollOffset();
      if (navWidth - currentOffset <= containerWidth) return;
      let newOffset =
        navWidth - currentOffset > containerWidth * 2
          ? currentOffset + containerWidth
          : navWidth - containerWidth;
      this.setOffset(newOffset);
    },
    /**
     * @desc: 获取当前nav的偏移量
     * @return: {number}
     */
    getCurrentScrollOffset() {
      const { navStyle } = this;
      return navStyle.transform
        ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
        : 0;
    },
    /**
     * @desc: 通过选项卡的名称返回index
     * @param: {string} name 选项卡名称
     * @return: {number} -1表示没有找到name对应的选项卡
     */
    getTabIndex(name) {
      return this.navList.findIndex(nav => nav.name === name);
    },
    /**
     * @desc: 设置nav的偏移量
     * @param: {number} value nav的偏移量
     * @return: void
     */
    setOffset(value) {
      this.navStyle.transform = `translateX(-${value}px)`;
    },
    //是否显示标签上的关闭按钮
    showClose(item) {
      //只有在卡片式标签上才能有关闭按钮
      if (this.type === "card") {
        if (item.closable !== null) {
          return item.closable;
        } else {
          return this.closable;
        }
      } else {
        return false;
      }
    },
    //滚动到激活的标签
    scrollToActiveTab() {
      if (!this.scrollable) return;
      const nav = this.$refs.nav;
      const activeTab = this.$el.querySelector(`.${prefixCls}-tab-active`);
      if (!activeTab) return;

      const navScroll = this.$refs.navScroll;
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = navScroll.getBoundingClientRect();
      const navBounding = nav.getBoundingClientRect();
      const currentOffset = this.getCurrentScrollOffset();
      let newOffset = currentOffset;

      if (navBounding.right < navScrollBounding.right) {
        newOffset = nav.offsetWideth - navScrollBounding.width;
      }

      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset =
          currentOffset - (navScrollBounding.left - activeTabBounding.left);
      } else if (activeTabBounding.right > navScrollBounding.right) {
        newOffset =
          currentOffset + activeTabBounding.right - activeTabBounding.right;
      }

      if (currentOffset !== newOffset) {
        this.setOffset(Math.max(newOffset, 0));
      }
    },
    /**
     * @desc: 刷新navScroll元素
     * @return: void
     */
    updateNavScroll() {
      const navWidth = this.$refs.nav.offsetWidth;
      const containerWidth = this.$refs.navScroll.offsetWidth;
      const currentOffset = this.getCurrentScrollOffset();

      if (containerWidth < navWidth) {
        this.scrollable = true;
        if (navWidth - currentOffset < containerWidth) {
          this.setOffset(navWidth - containerWidth);
        }
      } else {
        this.scrollable = false;
        if (currentOffset > 0) {
          this.setOffset(0);
        }
      }
    },
    //滚动事件
    handleScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      const type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      if (delta > 0) {
        this.scrollPrev();
      } else {
        this.scrollNext();
      }
    },
    /**
     * @desc: 监听器element-resize-detector监听navWrap元素大小变化后的回调
     * @return: void
     */
    handleResize() {
      this.updateNavScroll();
    },
    /**
     * @desc: 判断本组件是否是影藏节点的子节点
     * @return: {boolean|object} false 不是影藏节点的子节点|object Element影藏节点DOM
     */
    isInsideHiddenElement() {
      let parentNode = this.$el.parentNode;
      while (parentNode && parentNode !== document.body) {
        if (parentNode.style && parentNode.style.display === "none") {
          return parentNode;
        }
        parentNode = parentNode.parentNode;
      }
      return false;
    },
    /**
     * @desc: 更新tabpane插槽的内容
     * @param: {number} index 选项卡的序列
     * @return: void
     */
    updateVisibility(index) {
      [...this.$refs.panes.querySelectorAll(`.${prefixCls}-tabpane`)].forEach(
        (el, i) => {
          if (index === i) {
            [...el.children]
              .filter(child => child.classList.contains(`${prefixCls}-tabpane`))
              .forEach(child => (child.style.visibility = "visible"));
            if (this.captureFocus) {
              setTimeout(() => focusFirst(el, el), transitionTime);
            }
          } else {
            setTimeout(() => {
              [...el.children]
                .filter(child =>
                  child.classList.contains(`${prefixCls}-tabpane`)
                )
                .forEach(child => (child.style.visibility = "hidden"));
            }, transitionTime);
          }
        }
      );
    }
  },
  watch: {
    value(val) {
      this.activeKey = val;
      this.focusedKey = val;
    },
    activeKey(val) {
      this.focusedKey = val;
      this.updateBar();
      this.updateStatus();
      //this.broadcast("Table", "on-visible-change", true);
      this.$nextTick(() => {
        this.scrollToActiveTab();
      });

      const nextIndex = Math.max(this.getTabIndex(this.focusedKey), 0);
      this.updateVisibility(nextIndex);
    }
  },
  mounted() {
    /*当vue实例被挂载
     *1.根据extra插槽有没有内容，配置插槽是否渲染
     *2.配置监听navwrap元素的大小变化,navwrap的大小变化会影响navscroll元素
     *3.本组件的父节点是影藏元素，监听影藏节点的显影变化，刷新Bar
     *4.更新tabpane内容
     */
    this.showSlot = this.$slots.extra !== undefined;
    this.observer = elementResizeDetectorMaker();
    this.observer.listenTo(this.$refs.navWrap, this.handleResize);
    const hiddenParentNode = this.isInsideHiddenElement();
    if (hiddenParentNode) {
      this.mutationObserver = new MutationObserver(() => {
        if (hiddenParentNode.style.display !== "none") {
          this.updateBar();
          this.MutationObserver.disconnect();
        }
      });
      this.mutationObserver.observer(hiddenParentNode, {
        attributes: true,
        childList: true,
        characterData: true,
        attributeFilter: ["style"]
      });
    }
    this.updateVisibility(this.getTabIndex(this.activeKey));
  },
  beforeDestroy() {
    this.observer.removeListener(this.$refs.navWrap, this.handleResize);
    if (this.mutationObserver) this.mutationObserver.disconnect();
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.wd-tabs {
  position: relative;
  overflow: hidden;
  color: $secondary-text-color;
  .wd-tabs-bar {
    border-bottom: 1px solid #dcdee2;
    margin-bottom: 16px;
    .wd-tabs-nav-right {
      float: right;
      margin-left: 5px;
    }
    .wd-tabs-nav-container {
      outline: none; //必须有outline否则会出现默认的黑框
      margin-bottom: -1px;
      line-height: 1.5;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      position: relative;
      .wd-tabs-nav-wrap {
        position: relative;
        .wd-tabs-nav-next,
        .wd-tabs-nav-prev {
          width: 32px;
          text-align: center;
          position: absolute;
          line-height: 32px;
          cursor: pointer;
        }
        .wd-tabs-nav-prev {
          left: 0;
        }
        .wd-tabs-nav-next {
          right: 0;
        }
        .wd-tabs-nav-scroll-disabled {
          display: none;
        }
        .wd-tabs-nav-scroll {
          overflow: hidden;
          white-space: nowrap;
          .wd-tabs-nav {
            padding-left: 0;
            margin: 0;
            float: left;
            list-style: none;
            position: relative;
            transition: transform 0.5s ease-in-out;
            .wd-tabs-ink-bar {
              height: 2px;
              background-color: $accent-color;
              position: absolute;
              left: 0;
              bottom: 1px;
              transition: transform 0.3s ease-in-out;
            }
          }
          .wd-tabs-tab {
            display: inline-block;
            height: 100%;
            padding: 8px 16px;
            margin-right: 16px;
            cursor: pointer;
            position: relative;
            transition: color 0.3s ease-in-out;
            &.wd-tabs-tab-active {
              color: $accent-color;
            }
          }
        }
      }
    }
  }
  .wd-tabs-content {
    display: flex;
    flex-direction: row;
    will-change: transform;
    transition: transform 0.3s ease-in-out;
    .wd-tab-pane {
      flex-shrink: 0;
      width: 100%;
      transition: opacity 0.3s;
      opacity: 1;
      outline: 0;
    }
  }
}
</style>
