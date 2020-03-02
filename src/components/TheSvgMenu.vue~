<template>
  <svg
    width="1200"
    height="700"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
  >
    <!-- main menu -->
    <g id="main-menu">
      <!-- center random selector -->
      <g>
        <path
          id="path"
          d="m450.00005,350c0,-82.87293 67.12707,-150 150,-150c82.87293,0 150,67.12707 150,150c0,82.87293 -67.12707,150 -150,150c-82.87293,0 -150,-67.12707 -150,-150z"
          stroke-linecap="null"
          stroke-linejoin="null"
          stroke-dasharray="null"
          stroke-width="5"
          stroke="#7fba00"
          fill="none"
        />
        <!-- pointer -->
        <circle
          stroke="#000000"
          id="pointer"
          r="10"
          cy="350"
          cx="750"
          fill="#aabf77"
        />
        <!-- end pointer -->
        <circle
          stroke="#000000"
          stroke-opacity="0"
          id="svg_1"
          r="100"
          cy="350"
          cx="600"
          stroke-width="5"
          fill="#7fba00"
        />
        <icon-svg
          icon-class="dice"
          :x-axis="560"
          :y-axis="270"
          :width="80"
          :height="80"
        ></icon-svg>
        <!-- random select button -->
        <g id="random-selector">
          <a xlink-href="" @click="randomSelect()">
            <rect x="555" y="365" width="90" height="30" />
            <text x="572" y="385">随便逛逛</text>
          </a>
        </g>
        <!-- end random select button -->
      </g>
      <!-- end -->
      <!-- fruits shops -->
      <a xlink-href="" id="fruits" @click="catSelect('fruits')">
        <g class="category category-fruits">
          <circle id="svg_11" r="40" cy="350" cx="350" />
          <icon-svg
            icon-class="fruits"
            :x-axis="325"
            :y-axis="323"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end -->
      <!-- vegetables shops -->
      <a xlink-ref="" id="vegetables" @click="catSelect('vegetables')">
        <g class="category category-vegetables">
          <circle id="svg_13" r="40" cy="173" cx="423" />
          <icon-svg
            icon-class="vegetables"
            :x-axis="399"
            :y-axis="148"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end -->
      <!-- kitchen-goods shops -->
      <a xlink-href="" id="kitchen-goods" @click="catSelect('kitchen-goods')">
        <g class="category category-kitchen-goods">
          <circle id="svg_14" r="40" cy="173" cx="777" />
          <icon-svg
            icon-class="kitchen-goods"
            :x-axis="753"
            :y-axis="148"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end -->
      <!-- frozen-food shops -->
      <a xlink-href="" id="frozen-food" @click="catSelect('frozen-food')">
        <g class="category category-frozen-food">
          <circle id="svg_15" r="40" cy="350" cx="850" />
          <icon-svg
            icon-class="frozen-food"
            :x-axis="825"
            :y-axis="325"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end -->
      <!-- rices shops -->
      <a xlink-href="" id="rices" @click="catSelect('rices')">
        <g class="category category-rices">
          <circle id="svg_16" r="40" cy="527" cx="777" />
          <icon-svg
            icon-class="rices"
            :x-axis="752"
            :y-axis="502"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end -->
      <!-- fishes shops -->
      <a xlink-href="" id="fishes" @click="catSelect('fishes')">
        <g class="category category-fishes">
          <circle id="svg_17" r="40" cy="600" cx="600" />
          <icon-svg
            icon-class="fishes"
            :x-axis="576"
            :y-axis="575"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end -->
      <!-- meats shops -->
      <a xlink-href="" id="meats" @click="catSelect('meats')">
        <g class="category category-meats">
          <circle id="svg_18" r="40" cy="527" cx="423" />
          <icon-svg
            icon-class="meats"
            :x-axis="398"
            :y-axis="502"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end -->
      <!-- more  -->
      <a xlink-href="" id="more" @click="catSelect('more')">
        <g class="category category-more">
          <circle id="svg_18" r="40" cy="100" cx="600" />
          <icon-svg
            icon-class="more"
            :x-axis="575"
            :y-axis="75"
            :width="50"
            :height="50"
          ></icon-svg>
        </g>
      </a>
      <!-- end more-->
    </g>
    <!-- end main-menu -->
  </svg>
</template>
<script>
export default {
  name: "svgMenu",
  data() {
    return {
      //中心点
      center: {
        x: 600,
        y: 350
      },
      //商品分类
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
      //菜单激活标志
      menuActiveFlag: false,
      //圆点旋转半径
      pathRadius: 150,
      //圆点选装路径
      path: [],
      //圆点dom
      pointer: "",
      counter: 0,
      indexCounter: null,
      //定时器
      timer: ""
    };
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
    this.pointer = document.querySelector("#pointer");
    //启动定时器
    this.timer = this.runTimer(200, this.pointerAnimate);
    this.timer.startTimer();
  },
  methods: {
    //菜单项选择
    catSelect(category) {
      let mainMenuGroup = document.querySelector("#main-menu");
      let categoryGroup = document.querySelector(".category-" + category);
      let arrayClass = categoryGroup.getAttribute("class").split(" ");
      //点击的菜单项不是激活状态
      if (arrayClass.indexOf("active") < 0) {
        //移除原有的激活菜单项的激活状态
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
        this.$store.commit("setActiveCategory", { category: category });
      } else {
        //点击的菜单项已经是激活状态,再次点击取消激活状态
        arrayClass.pop("active");
        this.menuActiveFlag = false;
        //重启圆点旋转动画
        this.timer = this.runTimer(200, this.pointerAnimate);
        this.timer.startTimer();
        //设置vuex
        this.$store.commit("cancelActiveCategory");
      }
      categoryGroup.setAttribute("class", arrayClass.join(" "));
      let mainMenuClass = this.menuActiveFlag ? "active" : "";
      mainMenuGroup.setAttribute("class", mainMenuClass);
    },
    //圆点移动到category指定菜单项
    pointerMove(category) {
      let index = this.categoryArray.indexOf(category);
      let counts = ((index + 4) % 8) * 4 - this.counter;
      counts = counts < 0 ? counts + 32 : counts;
      console.log(counts);
      this.timer = this.runTimer(200, this.pointerAnimate, counts);
      this.timer.startTimer();
    },
    //圆点旋转动画
    pointerAnimate() {
      this.counter = (this.counter + 1) % this.path.length;
      this.pointer.setAttribute("cx", this.path[this.counter].x);
      this.pointer.setAttribute("cy", this.path[this.counter].y);
    },
    //随便逛逛
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
    //优化定时器函数
    //@animateTime: 定时器时间间隔
    //@callback: 定时器执行函数
    //@counts: 指定执行多少次后停止
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
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base";
svg {
  #main-menu {
    transition: all 0.5s ease-in;
    #pointer {
      transition: all 0.2s linear;
      fill: red;
      stroke: none;
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
      transform: scale(0.6) translate(0px, 233px);
    }
  }
}
</style>
