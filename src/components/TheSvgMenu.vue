<!--
#***********************************************
#
#      Filename: src/components/TheSvgMenu.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: SvgMenu组件
#        Create: 2020-07-19 09:04:35
# Last Modified: 2020-07-19 09:04:35
#***********************************************
-->
<template>
  <svg
    width="1170"
    height="700"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
    ref="svg"
  >
    <defs>
      <filter id="shadow">
        <feGaussianBlur
          in="SourceAlpha"
          stdDeviation="5"
          result="OUT1"
        ></feGaussianBlur>
        <feOffset in="OUT1" dx="4" dy="4" result="OUT2"></feOffset>
        <feMerge>
          <feMergeNode in="OUT2"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <!-- 主菜单 -->
    <g id="main-menu" ref="mainMenu" filter="url(#shadow)">
      <!-- 中部随机选择区域（包括旋转的指针与指针的环形轨迹） -->
      <g>
        <!-- 指针的环形轨迹 -->
        <circle id="circle-path" cx="600" cy="350" r="150" />
        <!-- end 指针的环形轨迹 -->
        <!-- 指针 -->
        <circle id="pointer" ref="pointer" cx="750" cy="350" r="10" />
        <!-- end 指针 -->
        <!-- 随便逛逛圆形 -->
        <circle id="center-circle" cx="600" cy="350" r="100" />
        <!-- end 随便逛逛圆形 -->
        <!-- 色子图形 -->
        <icon-svg
          icon-class="dice"
          :x-axis="560"
          :y-axis="270"
          :width="80"
          :height="80"
        ></icon-svg>
        <!-- end筛子图形 -->
        <!-- 随便逛逛 button -->
        <g id="random-selector">
          <a xlink-href="" @click="randomSelect()">
            <rect x="555" y="365" rx="5" ry="5" width="90" height="30" />
            <text x="572" y="385">随便逛逛</text>
          </a>
        </g>
        <!-- end随便逛逛 button -->
      </g>
      <!-- end 中部随机选择区域（包括旋转的指针与指针的环形轨迹） -->
      <!-- 新鲜水果 -->
      <a id="fruits" @click="catSelect('fruits')">
        <g class="category category-fruits">
          <title>新鲜水果</title>
          <circle r="40" cy="350" cx="350" />
          <icon-svg
            icon-class="fruits"
            :x-axis="325"
            :y-axis="323"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end 新鲜水果 -->
      <!-- 新鲜蔬菜 -->
      <a id="vegetables" @click="catSelect('vegetables')">
        <g class="category category-vegetables">
          <title>新鲜蔬菜</title>
          <circle r="40" cy="173" cx="423" />
          <icon-svg
            icon-class="vegetables"
            :x-axis="399"
            :y-axis="148"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end 新鲜蔬菜 -->
      <!-- 厨房用品 -->
      <a id="kitchen-goods" @click="catSelect('kitchen-goods')">
        <g class="category category-kitchen-goods">
          <title>厨房用品</title>
          <circle r="40" cy="173" cx="777" />
          <icon-svg
            icon-class="kitchen-goods"
            :x-axis="753"
            :y-axis="148"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end 厨房用品 -->
      <!-- 冷冻食品 -->
      <a id="frozen-food" @click="catSelect('frozen-food')">
        <g class="category category-frozen-food">
          <title>冷冻食品</title>
          <circle r="40" cy="350" cx="850" />
          <icon-svg
            icon-class="frozen-food"
            :x-axis="825"
            :y-axis="325"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end 冷冻食品 -->
      <!-- 米面粮油 -->
      <a id="rices" @click="catSelect('rices')">
        <g class="category category-rices">
          <title>米面粮油</title>
          <circle r="40" cy="527" cx="777" />
          <icon-svg
            icon-class="rices"
            :x-axis="752"
            :y-axis="502"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end 米面粮油 -->
      <!-- 海鲜水产 -->
      <a id="fishes" @click="catSelect('fishes')">
        <g class="category category-fishes">
          <title>海鲜水产</title>
          <circle r="40" cy="600" cx="600" />
          <icon-svg
            icon-class="fishes"
            :x-axis="576"
            :y-axis="575"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end 海鲜水产 -->
      <!-- 肉禽蛋奶 -->
      <a id="meats" @click="catSelect('meats')">
        <g class="category category-meats">
          <tilte>肉禽蛋奶</tilte>
          <circle r="40" cy="527" cx="423" />
          <icon-svg
            icon-class="meats"
            :x-axis="398"
            :y-axis="502"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end 肉禽蛋奶 -->
      <!-- 更多 -->
      <a id="more" @click="catSelect('more')">
        <g class="category category-more">
          <tilte>更多</tilte>
          <circle r="40" cy="100" cx="600" />
          <icon-svg
            icon-class="more"
            :x-axis="575"
            :y-axis="75"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end 更多 -->
    </g>
    <!-- end 主菜单 -->
  </svg>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import {
  SET_ACTIVE_CATEGORY,
  CANCEL_ACTIVE_CATEGORY
} from "@/store/mutationTypes";

const { mapMutations } = createNamespacedHelpers("menu");
const animateTime = 200;

/**
 * SvgMenu组件，HOME页面中SVG Men
 * @vuedoc
 * @exports component/TheSvgMenu
 */
export default {
  name: "svgMenu",
  data: function() {
    return {
      /**
       * 整个svg的中心点
       */
      center: {
        x: 600,
        y: 350
      },
      /**
       * menu数组
       */
      categoryArray: [
        "fruits",
        "vegetables",
        "more",
        "kitchen-goods",
        "frozen-food",
        "rices",
        "fishes",
        "meats"
      ],
      /**
       * 菜单激活标志
       */
      menuActiveFlag: false,
      /**
       * 圆点旋转半径
       */
      pathRadius: 150,
      /**
       * 圆点选择路径
       */
      path: [],
      /**
       * 圆点位置计数
       */
      counter: 0,
      /**
       * 定时器对象
       */
      timer: ""
    };
  },
  methods: {
    ...mapMutations({
      setActiveCategory: SET_ACTIVE_CATEGORY,
      cancelActiveCategory: CANCEL_ACTIVE_CATEGORY
    }),
    /**
     * 菜单项选择
     * @param {string} category 菜单项名称
     * @return void
     */
    catSelect(category) {
      const mainMenuGroup = this.$refs.mainMenu;
      const categoryGroup = mainMenuGroup.querySelector(
        ".category-" + category
      );
      let arrayClass = categoryGroup.getAttribute("class").split(" ");

      //点击的菜单项不是激活状态
      if (arrayClass.indexOf("active") < 0) {
        //移除别的激活菜单项的激活状态
        let activeCategory = mainMenuGroup.querySelector(".active");
        if (activeCategory) {
          let oldClass = activeCategory.getAttribute("class").split(" ");
          oldClass.pop("active");
          activeCategory.setAttribute("class", oldClass.join(" "));
        }
        arrayClass.push("active");

        //设置菜单为激活状态
        mainMenuGroup.setAttribute("class", "active");
        this.menuActiveFlag = true;

        //停止圆点旋转动画，开启一段短动画移动到选择菜单项
        this.timer.clearTimer();
        this.pointerMove(category);

        //设置vuex
        this.setActiveCategory({ category: category });
      } else {
        //点击的菜单项已经是激活状态,再次点击取消激活状态
        arrayClass.pop("active");
        this.menuActiveFlag = false;

        //重启圆点旋转动画
        this.timer = this.runTimer(animateTime, this.pointerAnimate);
        this.timer.startTimer();

        //设置vuex
        this.cancelActiveCategory();
      }
      categoryGroup.setAttribute("class", arrayClass.join(" "));
      let mainMenuClass = this.menuActiveFlag ? "active" : "";
      mainMenuGroup.setAttribute("class", mainMenuClass);
    },
    /**
     * 圆点预定到category指定菜单项动画
     * @param {string} category 菜单项名称
     * @return void
     */
    pointerMove(category) {
      //动画path数组的与category之间有180度的相位差，需要调整
      let index = this.categoryArray.indexOf(category);
      let counts = ((index + 4) % 8) * 4 - this.counter;
      counts = counts < 0 ? counts + 32 : counts;
      this.timer = this.runTimer(animateTime, this.pointerAnimate, counts);
      this.timer.startTimer();
    },
    /**
     * 圆点旋转动画
     * @return void
     */
    pointerAnimate() {
      this.counter = (this.counter + 1) % this.path.length;
      this.$refs.pointer.setAttribute("cx", this.path[this.counter].x);
      this.$refs.pointer.setAttribute("cy", this.path[this.counter].y);
    },
    /**
     * 随便逛逛
     * @return void
     */
    randomSelect() {
      let random, randomCategory, activeCategory;
      do {
        random = Math.floor(Math.random() * this.categoryArray.length);
        randomCategory = this.categoryArray[random];
        if (this.menuActiveFlag) {
          activeCategory = document
            .querySelector("#main-menu .active")
            .getAttribute("class");
        } else {
          break;
        }
      } while (activeCategory.indexOf(randomCategory) >= 0);
      this.catSelect(this.categoryArray[random]);
    },
    /**
     *优化定时器函数
     *@param {int} animateTime: 定时器时间间隔
     *@param {Function} callback: 定时器执行函数
     *@param {int} counts: 指定执行多少次后停止
     *@return {object} {clearTimer. startTimer}
     */
    runTimer(animateTime, callback, counts = "disabled") {
      //记录开始时间
      let counter = 0;
      let startTime = getTime();
      let timer = [];
      //获取当前时间
      function getTime() {
        return new Date().getTime();
      }
      //定时器主函数,
      //@diffTime: 为保证定时器间隔一定，diffTime为此次执行需要减少的时间
      function timeout(diffTime) {
        let runtime = animateTime - diffTime;
        timer.push(
          setTimeout(() => {
            if (counter == counts && counts != "disabled") {
              clearTimer();
              return;
            }
            let tmp = startTime;
            callback();
            counter++;
            startTime = getTime();
            diffTime = startTime - tmp - animateTime;
            timeout(diffTime);
          }, runtime)
        );
      }
      //计时器停止
      function clearTimer() {
        timer.forEach(function(timer) {
          clearTimeout(timer);
        });
        timer = [];
      }
      //计时器开始
      function startTimer() {
        timeout(0);
      }
      return { clearTimer, startTimer };
    }
  },
  mounted: function() {
    //计算圆点旋转路径
    for (let i = 0; i < 32; i++) {
      let x = Math.round(
        this.center.x + this.pathRadius * Math.cos((i * Math.PI) / 16)
      );
      let y = Math.round(
        this.center.y + this.pathRadius * Math.sin((i * Math.PI) / 16)
      );
      this.path.push({ x: x, y: y });
    }
    //启动定时器
    this.timer = this.runTimer(animateTime, this.pointerAnimate);
    this.timer.startTimer();
  },
  destroyed() {
    this.cancelActiveCategory();
    this.timer.clearTimer();
  }
};
</script>
<style lang="scss">
@import "@/assets/css/base";
svg {
  #main-menu {
    transition: all 0.5s ease-in;
    #circle-path {
      fill: none;
      stroke-width: 5px;
      stroke: #aabf77;
    }
    #pointer {
      transition: all 0.2s linear;
      fill: red;
      stroke: none;
    }
    #center-circle {
      fill: #aabf77;
      stroke: #a9a9a9;
    }
    #random-selector {
      a {
        rect {
          fill: $aux-color-yellow-base;
          stroke-width: 2;
          stroke: #000000;
        }
        &:hover {
          rect {
            fill: $aux-color-green-base;
          }
        }
      }
    }
    a {
      circle {
        fill: $primary-color-base;
        stroke: black;
        stroke-width: 2;
      }
      .active {
        transition: all 0.25s ease-in;
        circle {
          fill: $accent-color;
        }
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    #fruits {
      .active {
        transform: scale(1.1) translate(-32px, -32px);
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    #vegetables {
      .active {
        transform: scale(1.1) translate(-38px, -16px);
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    #kitchen-goods {
      .active {
        transform: scale(1.1) translate(-71px, -15px);
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    #frozen-food {
      .active {
        transform: scale(1.1) translate(-77px, -32px);
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    #rices {
      .active {
        transform: scale(1.1) translate(-70px, -48px);
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    #fishes {
      .active {
        transform: scale(1.1) translate(-55px, -55px);
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    #meats {
      .active {
        transform: scale(1.1) translate(-38px, -48px);
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    #more {
      .active {
        transform: scale(1.1) translate(-55px, -9px);
      }
      &:hover {
        g {
          @extend .active;
        }
      }
    }
    &.active {
      transform: scale(0.6) translate(-230px, 233px);
    }
  }
}
</style>
