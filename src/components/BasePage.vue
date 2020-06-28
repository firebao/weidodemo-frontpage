<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/BasePage.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: BasePage分页组件
#        Create: 2020-06-28 16:59:23
# Last Modified: 2020-06-28 16:59:23
#***********************************************
-->
<template>
  <!-- 普通版分页 -->
  <ul :class="simpleWrapClasses" :style="styles" v-if="mode === 'simple'">
    <li></li>
  </ul>
  <!-- end普通版分页 -->
  <!-- 滚动版分页 -->
  <div :class="scrollWrapClasses" :style="styles" v-else-if="mode === 'scroll'">
    <!--向前移动控制面板-->
    <div :class="[prefixCls + '-control-back']" v-if="isShowControl">
      <ul>
        <!--item第一页-->
        <li title="首页" :class="[prefixCls + '-item']" @click="firstPage">
          首页
        </li>
        <!--end item第一页-->
        <!--item前移-->
        <li
          title="前移"
          :class="[prefixCls + '-item', prefixCls + '-scroll-item']"
          @mouseover="moveLeft"
          @mouseout="stopMove"
        >
          <icon-svg icon-class="three-left" class="i16"></icon-svg>
        </li>
        <!--end item前移-->
      </ul>
    </div>
    <!--end向前移动控制面板-->
    <!--分页项-->
    <div
      :class="[prefixCls + '-items']"
      ref="pageItems"
      :style="pageItemStyles"
    >
      <ul>
        <li
          :title="n"
          :class="itemsClasses(n)"
          @click="changePage(n)"
          v-for="n in allPages"
          :key="n"
        >
          {{ n }}
        </li>
      </ul>
    </div>
    <!--end 分页项-->
    <!--向后移动控制面板-->
    <div :class="[prefixCls + '-control-front']" v-if="isShowControl">
      <ul>
        <!--item后移-->
        <li
          title="后移"
          :class="[prefixCls + '-item', prefixCls + '-scroll-item']"
          @mouseover="moveRight"
          @mouseout="stopMove"
        >
          <icon-svg icon-class="three-right" class="i16"></icon-svg>
        </li>
        <!--end item后移-->
        <!--item最后一页-->
        <li title="尾页" :class="[prefixCls + '-item']" @click="lastPage">
          尾页
        </li>
        <!--end item最后一页-->
      </ul>
    </div>
    <!--end向后移动控制面板-->
  </div>
  <!-- end滚动版分页 -->
  <!-- 简洁版分页 -->
  <ul :class="wrapClasses" :style="styles" v-else>
    <!--数据总数-->
    <span :class="[prefixCls + '-total']" v-if="showTotal">
      <slot>共{{ total }}条</slot>
    </span>
    <!--end数据总数-->
    <!--item上一页-->
    <li title="上一页" :class="prevClasses" @click="prev">
      <a>
        <template v-if="prevText !== ''">{{ prevText }}</template>
        <i v-else class="icon-arrow-back"></i>
      </a>
    </li>
    <!--end item上一页-->
    <!--item第一页-->
    <li title="1" :class="firstPageClasses" @click="changePage(1)">
      <a>1</a>
    </li>
    <!--end item第一页-->
    <!--item 向前5页-->
    <li
      title="向前5页"
      :class="[prefixCls + '-item-jump-prev']"
      @click="fastPrev"
      v-if="currentPage"
    >
      <a><i class="icon-fast-back"></i></a>
    </li>
    <!--end item 向前5页-->
    <li
      title="currentPage - 3"
      v-if="currentPage === 5"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 3)"
    >
      <a>{{ currentPage - 3 }}</a>
    </li>
    <li
      title="currentPage - 2"
      v-if="currentPage - 2 > 1"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 2)"
    >
      <a>{{ currentPage - 2 }}</a>
    </li>
    <li
      title="currentPage - 1"
      v-if="currentPage - 1 > 1"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 1)"
    >
      <a>{{ currentPage - 1 }}</a>
    </li>
    <li
      title="currentPage"
      v-if="currentPage != 1 && currentPage != allPages"
      :class="[prefixCls + '-item', prefixCls + '-item-active']"
      @click="changePage(currentPage)"
    >
      <a>{{ currentPage }}</a>
    </li>
    <li
      title="currentPage + 1"
      v-if="currentPage + 1 < allPages"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 1)"
    >
      <a>{{ currentPage + 1 }}</a>
    </li>
    <li
      title="currentPage + 2"
      v-if="currentPage + 2 < allPages"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 2)"
    >
      <a>{{ currentPage + 2 }}</a>
    </li>
    <li
      title="currentPage + 3"
      v-if="allPages - currentPage === 4"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 3)"
    >
      <a>{{ currentPage + 3 }}</a>
    </li>
    <!--item 向后5页-->
    <li
      title="向后5页"
      v-if="allPages - currentPage >= 5"
      :class="[prefixCls + '-item-jump-next']"
      @click="fastNext"
    >
      <a><i class="icon-fast-next"></i></a>
    </li>
    <!--end item 向后5页-->
    <!--item最后一页-->
    <li
      :title="allPages"
      v-if="allPages > 1"
      :class="lastPageClasses"
      @click="changePage(allPages)"
    >
      <a>{{ allPages }}</a>
    </li>
    <!--end item最后一页-->
    <!--item下一页-->
    <li title="下一页" :class="nextClasses" @click="next">
      <a>
        <template v-if="nextText !== ''">{{ nextText }}</template>
        <i v-else class="icon-forward"></i>
      </a>
    </li>
    <!--end item下一页-->
  </ul>
  <!-- end简洁版分页 -->
</template>
<script>
const prefixCls = "wd-page";
export default {
  name: "BasePage",
  props: {
    //当前页码
    current: {
      type: Number,
      default: 1
    },
    //数据总数
    total: {
      type: Number,
      default: 0
    },
    //每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    //每页条数切换配置
    pageSizeOpts: {
      type: Array,
      default() {
        return [10, 20, 30, 40];
      }
    },
    //条数切换弹窗的展开方向
    placement: {
      validator(value) {
        //indexOf在IE的某些版本中不支持，最好再封装一下indexOf函数
        return ["top", "bottom"].indexOf(value) >= 0 ? true : false;
      },
      default: "bottom"
    },
    //迷你模式
    size: {
      validator(value) {
        return ["small"].indexOf(value) >= 0 ? true : false;
      }
    },
    //选择使用简洁版、滚动版或普通版的分页
    mode: {
      validator(value) {
        return ["simple", "scroll", "common"].indexOf(value) >= 0
          ? true
          : false;
      },
      default: "common"
    },
    //显示总数
    showTotal: {
      type: Boolean,
      default: false
    },
    //显示快速切换页
    showElevator: {
      type: Boolean,
      default: false
    },
    //显示分页
    showSizer: {
      type: Boolean,
      default: false
    },
    //自定义class名称
    className: {
      type: String
    },
    //自定义style样式
    styles: {
      type: Object
    },
    //替换图标显示上一页文字
    prevText: {
      type: String,
      default: ""
    },
    //替换图标显示下一页文字
    nextText: {
      type: String,
      default: ""
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: this.current,
      currentPageSize: this.pageSize,
      prefixCls: prefixCls,
      domPageItems: null,
      scrollPageWidth: null,
      interval: null
    };
  },
  watch: {
    total(val) {
      let maxPage = Math.ceil(val / this.currentPageSize);
      if (maxPage < this.currentPage) {
        this.currentPage = maxPage === 0 ? 1 : maxPage;
      }
    },
    current(val) {
      this.currentPage = val;
    },
    pageSize(val) {
      this.currentPageSize = val;
    }
  },
  computed: {
    isSmall() {
      return !!this.size;
    },
    allPages() {
      const allPage = Math.ceil(this.total / this.currentPageSize);
      return allPage === 0 ? 1 : allPage;
    },
    //计算简洁版分页的ul类名
    simpleWrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-simple`,
        {
          [`${this.className}`]: !!this.className
        }
      ];
    },
    scrollWrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-scroll`,
        {
          [`${this.className}`]: !!this.className
        }
      ];
    },
    //计算普通版分页的ul类名
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${this.className}`]: !!this.className,
          [`${prefixCls}-with-disabled`]: this.disabled,
          mini: !!this.size
        }
      ];
    },
    //计算普通版分页的上一页li类名
    prevClasses() {
      return [
        `${prefixCls}-prev`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === 1 || this.disabled,
          [`${prefixCls}-custom-text`]: this.prevText !== ""
        }
      ];
    },
    //计算普通版分页的上一页li类名
    nextClasses() {
      return [
        `${prefixCls}-next`,
        {
          [`${prefixCls}-disabled`]:
            this.currentPage === this.allPages || this.disabled,
          [`${prefixCls}-custom-text`]: this.nextText !== ""
        }
      ];
    },
    //计算普通版第一页li类名
    firstPageClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === 1
        }
      ];
    },
    //计算普通版最后一页li类名
    lastPageClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === this.allPages
        }
      ];
    },
    //计算滚动版页码li类名
    itemsClasses() {
      return n => {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.currentPage === n
          }
        ];
      };
    },
    //计算滚动版page-items style
    pageItemStyles() {
      const maxWidth = this.scrollPageWidth - 164 + "px";
      return {
        maxWidth: maxWidth
      };
    },
    //计算是否显示control-back与control-front
    isShowControl() {
      return Math.floor((this.scrollPageWidth - 164) / 18) < this.allPages
        ? true
        : false;
    }
  },
  methods: {
    //更改当前页码
    changePage(page) {
      if (this.disabled) return;
      if (this.currentPage != page) {
        this.currentPage = page;
        this.$emit("update:vurrent", page);
        this.$emit("on-change", page);
      }
    },
    //上一页
    prev() {
      if (this.disabled) return;
      const current = this.currentPage;
      if (current <= 1) {
        return false;
      }
      this.chagePage(current - 1);
    },
    //下一页
    next() {
      if (this.disabled) return;
      const current = this.currentPage;
      if (current >= this.allPages) {
        return false;
      }
      this.chagePage(current + 1);
    },
    //上5页
    fastPrev() {
      if (this.disabled) return;
      const page = this.currentPage - 5;
      if (page > 0) {
        this.chagePage(page);
      } else {
        this.changePage(1);
      }
    },
    //下5页
    fastNext() {
      if (this.disabled) return;
      const page = this.currentPage + 5;
      if (page > this.allPages) {
        this.changePage(this.allPages);
      } else {
        this.chagePage(page);
      }
    },
    //向左滚动
    moveLeft() {
      const _this = this;
      this.interval = setInterval(() => {
        _this.$refs.pageItems.scrollLeft = _this.$refs.pageItems.scrollLeft - 1;
      }, 20);
    },
    //向右滚动
    moveRight() {
      const _this = this;
      this.interval = setInterval(() => {
        _this.$refs.pageItems.scrollLeft = _this.$refs.pageItems.scrollLeft + 1;
      }, 20);
    },
    //停止滚动
    stopMove() {
      clearInterval(this.interval);
    },
    //滚动版首页
    firstPage() {
      this.$refs.pageItems.scrollLeft = 0;
      this.changePage(1);
    },
    //滚动版尾页
    lastPage() {
      this.$refs.pageItems.scrollLeft = this.$refs.pageItems.scrollWidth;
      this.changePage(this.allPages);
    }
  },
  mounted() {
    if (this.mode === "scroll") {
      this.domPageItems = document.getElementById(`${prefixCls}-items`);
      this.$nextTick(function() {
        this.scrollPageWidth = document.querySelector(
          `.${prefixCls}-scroll`
        ).clientWidth;
      });
    }
  }
};
</script>
<style scoped lang="scss">
.wd-page {
}
.wd-page-scroll {
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  ul {
    display: flex;
  }
  .wd-page-items {
    overflow: hidden;
  }
  .wd-page-item {
    display: inline-block;
    height: 19px;
    line-height: 15px;
    margin-right: 4px;
    padding: 2px 5px;
    text-align: center;
    color: rgb(136, 136, 136);
    background-color: rgb(238, 238, 238);
    user-select: none;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: black;
      background-color: rgb(207, 207, 207);
    }
  }
  .wd-page-item-active {
    color: black;
    background-color: rgb(207, 207, 207);
  }
}
</style>
