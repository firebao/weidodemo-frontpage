<!--
#***********************************************
#
#      Filename: vue-demo/src/components/tab/tabs.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: ---
#        Create: 2020-06-11 10:11:29
# Last Modified: 2020-06-11 10:11:29
#***********************************************
-->
-->
<template>
  <div :class="classes">
    <div :class="[prefixCls + '-bar']">
      <div :class="[prefixCls + '-nav-right']" v-if="showSlot">
        <slot name="extra"></slot>
      </div>
      <div
        :class="[prefixCls + '-nav-container']"
        tabindex="0"
        ref="navContainer"
        @keydown="handleTabKeyNavigation"
        @keydown.space.prevent="handleTabKeyborderSelect(false)"
      >
        <div
          ref="navWrap"
          :class="[
            prefixCls + '-nav-wrap',
            scrollable ? prefixCls + '-nav-scrollable' : ''
          ]"
        >
          <span
            :class="[
              prefixCls + '-nav-prev',
              scrollable ? '' : prefixCls + '-nav-scroll-disabled'
            ]"
            @click="scrollPrev"
          >
            <icon-svg iconClass="three-left" class="i20"></icon-svg>
          </span>
          <span
            :class="[
              prefixCls + '-nav-next',
              scrollable ? '' : prefixCls + '-nav-scroll-disabled'
            ]"
            @click="scrollNext"
          >
            <icon-svg iconClass="three-right" class="i20"></icon-svg>
          </span>
          <div
            ref="navScroll"
            :class="[prefixCls + '-nav-scroll']"
            @DOMMouseScroll="handleScroll"
            @mousewheel="handleScroll"
          >
            <div ref="nav" :class="[prefixCls + '-nav']" :style="navStyle">
              <div :class="barClasses" :style="barStyle"></div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="panes" :style="contentStyle" :class="contentClasses">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { findComponentsDownward } from "@/utils/assist.js";
import BaseRender from "@/components/BaseRender";
import elementResizeDetectorMaker from "element-resize-detector";

const transitionTime = 300;
const prefixCls = "wd-tabs";
//获取下一个标签
const getNextTab = (list, activeKey, direction, countDisabledAlso) => {
  const currentIndex = list.findIndex(tab => tab.name === activeKey);
  const nextIndex = (currentIndex + direction + list.length) % list.length;
  const nextTab = list[nextIndex];
  if (nextTab.disabled) {
    return getNextTab(list, nextTab.name, direction, countDisabledAlso);
  } else {
    return nextTab;
  }
};
//获取页面
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
    //捕获焦点
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
      barWidth: 0,
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
        style.transform = `translated3d(${this.barOffset}px, 0px, 0px)`;
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
    //更新Bar
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
    //标签点击事件
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
    //Tab键盘左右按键事件
    handleTabKeyNavigation(e) {
      if (e.keyCode !== 37 && e.keyCode !== 39) return;
      const direction = e.keyCode === 39 ? 1 : -1;
      const nextTab = getNextTab(this.navList, this.focusedKey, direction);
      this.focusedKey = nextTab.name;
    },
    //Tab键盘空格按键事件
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
    //获取当前标签栏的偏移量
    getCurrentScrollOffset() {
      const { navStyle } = this;
      return navStyle.transform
        ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
        : 0;
    },
    //获取当前激活标签的index
    getTabIndex(name) {
      return this.navList.findIndex(nav => nav.name === name);
    },
    //设置标签滚动的偏移量
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
    //更新标签滚动
    updateNavScroll() {
      const navWidth = this.$refs.nav.offsetWideth;
      const containerWidth = this.$refs.navScroll.offsetWideth;
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
    //resize事件
    handleResize() {
      this.updateNavScroll();
    },
    //是否是影藏元素
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
    //更新可见性
    updateVisibility(index) {
      [...this.$refs.panes.querySelectorAll(`.${prefixCls}-tabpane`)].forEach(
        (el, i) => {
          if (index === i) {
            [...el.children]
              .filter(child => child.classList.contains(`${prefixCls}-tabpane`))
              .forEach(child => (child.style.visibility = "visibel"));
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
    debugger;
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
    this.handleTabKeyboardSelect(true);
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
}
</style>
