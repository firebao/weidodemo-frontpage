<!--
#***********************************************
#
#      Filename: src/page/Location.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Location页面
#        Create: 2020-08-13 10:21:09
# Last Modified: 2020-08-13 10:21:09
#***********************************************
-->
<template>
  <div>
    <mall-header></mall-header>
    <main>
      <div class="main-container">
        <div class="location-input">
          <!-- 登录、注册、我的小家按钮 -->
          <div class="user-center" ref="topNav">
            <router-link class="button-dashed item" to="/user/login">
              登录
            </router-link>
            <router-link class="button-dashed item" to="/user/register">
              注册
            </router-link>
            <router-link class="button-dashed item" to="/user">
              我的小家
            </router-link>
          </div>
          <!-- end登录、注册、我的小家按钮 -->
          <!-- location信息输入框 -->
          <div
            class="input-box"
            :class="{ active: isInputFocus }"
            ref="inputBox"
          >
            <!-- 输入框前部城市选择 -->
            <div class="select-area" @click="dropdownSwitch">
              <div class="city">
                {{ gussedCity }}
              </div>
              <span
                class="dropdown"
                :class="!this.dropdown ? 'arrow-left' : 'arrow-bottom'"
              >
              </span>
            </div>
            <!-- end 输入框前部城市选择 -->
            <div class="input-area">
              <input
                id="searchLocation"
                type="text"
                @keyup="searchLocation"
                @focus="inputFocus"
                @blur="inputBlur"
                v-model="searchKeywords"
              />
            </div>
            <!-- 地址框下拉列表 -->
            <div class="location-list" v-if="locationList">
              <ul>
                <li
                  class="location-item"
                  v-for="(item, key) in locationList"
                  @click="setLocation"
                  :key="key"
                >
                  <span class="name"> {{ item.name }} </span>
                  <span class="address"> ({{ item.district }}) </span>
                </li>
              </ul>
            </div>
            <!-- end 地址框下拉列表 -->
            <!-- 城市列表 -->
            <div
              class="city-list-area"
              v-show="dropdown"
              @scroll="handleScroll"
            >
              <div
                class="city-list-phantom"
                v-bind:style="{ height: contentHeight }"
              ></div>
              <div class="city-list-header">
                <span class="guess">猜您在</span>
                <span class="city-name">
                  {{ gussedCity }}
                </span>
                <div class="city-input">
                  <input
                    type="text"
                    placeholder="城市名称或拼音"
                    @keyup="searchCity"
                    v-model="searchValue"
                  />
                  <div
                    class="search-list"
                    v-show="showSearchList"
                    v-if="searchList"
                  >
                    <ul>
                      <li
                        class="search-item"
                        v-for="(item, index) in searchList"
                        :key="index"
                        @click="setCity"
                        :data-cid="item.city_id"
                        :data-pinyin="item.pinyin"
                        :class="index == 0 ? 'active' : ''"
                      >
                        {{ item.real }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="city-list-content">
                <div class="list-body" ref="content">
                  <div
                    class="row"
                    v-for="(cityGroup, index) in visibleData"
                    :key="index"
                  >
                    <div class="index-alpha">
                      <div>{{ alpha[start + index] }}</div>
                    </div>
                    <div class="list" v-if="cityGroup.length">
                      <span
                        class="item"
                        v-for="(item, index1) in cityGroup"
                        :key="index1"
                        @click="setCity"
                        :data-cid="item.city_id"
                        :data-pinyin="item.pinyin"
                      >
                        {{ item.real }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end 城市列表 -->
          </div>
          <!-- end location信息输入框 -->
          <!-- 地图 -->
          <map-container
            :search-keywords="searchKeywords"
            :city="locationInfo ? locationInfo.city : ''"
            v-if="mapWrapShow"
            :map="map ? map : {}"
          ></map-container>
          <!-- end 地图 -->
        </div>
      </div>
    </main>
    <mall-footer></mall-footer>
  </div>
</template>
<script>
import MallHeader from "@/components/TheHeader";
import MallFooter from "@/components/TheFooter";
import MapContainer from "@/components/MapContainer";
import ClientData from "@/utils/clientData/clientData";
import AMapLoader from "@amap/amap-jsapi-loader";
import { VUE_APP_AMAP_KEY } from "@/utils";
import { GET_CITY_LIST } from "@/utils/request/requestTypes";
import { LOCATION_INFO } from "@/store/mutationTypes";
import { createNamespacedHelpers } from "vuex";

const { mapMutations, mapState } = createNamespacedHelpers("user");

/**
 * 异步加载高德地图UI组件
 * @return {Promise}
 */
function loadUIAMap() {
  return new Promise((resolve, reject) => {
    const parentNode = document.body || document.head;
    const UIScript = document.createElement("script");
    let src = "//webapi.amap.com/ui/1.1/main-async.js";
    UIScript.src = src;
    UIScript.type = "text/javascript";
    UIScript.async = true;
    parentNode.appendChild(UIScript);
    UIScript.onload = () => {
      setTimeout(resolve, 0);
    };
    UIScript.onerror = () => reject();
  });
}

/**
 * Location页面
 * @vuedoc
 * @exports page/Location
 */
export default {
  name: "Location",
  data: function() {
    return {
      /**
       * 地址输入框是否获得焦点
       */
      isInputFocus: false,
      /**
       * 下拉列表框是否展示
       */
      dropdown: false,
      /**
       * 城市列表
       */
      cityList: [],
      /**
       * 根据ip地址获取的地址
       */
      gussedCity: null,
      /**
       * 虚拟列表的条目的起始index
       */
      start: "",
      /**
       * 具有缓存的条目的index
       */
      lastMeasuredIndex: -1,
      /**
       * 缓存的条目的尺寸与偏移量
       */
      sizeAndOffsetCache: {},
      /**
       * 虚拟列表中的可视区域的条目数据
       */
      visibleData: [],
      /**
       * 虚拟列表可视区域高度
       */
      clientHeight: 400,
      /**
       * 显示影藏城市列表中的搜素城市的下拉列表
       */
      showSearchList: false,
      /**
       * 搜素城市匹配的列表
       */
      searchList: [],
      /**
       * 搜索城市输入框输入值
       */
      searchValue: "",
      /**
       * 搜索区域输入框输入值
       */
      searchKeywords: "",
      /**
       * 拼音索引
       */
      alpha: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      /**
       * 地图对象
       */
      map: "",
      /**
       * 地图UI对象
       */
      mapUI: "",
      /**
       * 匹配区域搜索列表
       */
      locationList: "",
      /**
       * 显示地图
       */
      mapWrapShow: false
    };
  },
  components: {
    MallHeader,
    MallFooter,
    MapContainer
  },
  computed: {
    ...mapState({
      locationInfo: state => state.locationInfo
    }),
    /**
     * 计算城市列表的总高度
     */
    contentHeight() {
      //list-header有70px高度,hr有2px高度
      let total = 70 + 2;
      for (let i = 0, j = this.cityList.length; i < j; i++) {
        total += this.itemSizeGetter(this.cityList, i);
      }
      return total + "px";
    }
  },
  methods: {
    ...mapMutations({
      setLocationInfo: LOCATION_INFO
    }),
    /**
     * 区域列表显示影藏切换
     * @return void
     */
    dropdownSwitch() {
      this.dropdown = !this.dropdown;
    },
    /**
     * scroll滚动事件处理
     * @param {Event} event 事件对象
     * @return void
     */
    handleScroll(event) {
      const scrollTop = event.target.scrollTop;
      this.updateVisibleData(scrollTop);
    },
    /**
     * 获取区域条目的高度（区域条目对应的A、B、...、Z）
     * @param {array} item 区域条目
     * @param {int} index 区域条目index
     * @return {int} 区域条目的显示高度
     */
    itemSizeGetter(item, index) {
      const padding = 21;
      let lines = Math.ceil(item[index].length / 5);
      if (lines <= 1) {
        return 51;
      }
      return padding + lines * 25;
    },
    /**
     * 更新虚拟列表可视窗口中条目的内容
     * @param {int} scrollTop 滚动条滚动量
     * @return void
     */
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      //取得viewport的起始列表的数据索引
      this.start = this.findNearestItemIndex(scrollTop);
      //取得viewport的结束列表的数据索引
      const end = this.findNearestItemIndex(scrollTop + this.clientHeight);
      //计算viewport对应的显示数据
      this.visibleData = this.cityList.slice(
        this.start,
        Math.min(end + 1, this.cityList.length)
      );
      //把viewport的top设置为起始元素在整个列表中的位置（使用transform是为了更好的性能）
      this.$refs.content.style.webkitTransform = `translate3d(0, 
        ${this.getItemSizeAndOffset(this.start).offset}px, 0)`;
    },
    /**
     * 根据滚动条滚动量计算虚拟列表指定滚动量对应的显示条目的index
     * @param {int} scrollTop 滚动条滚动量
     * @return {int} 条目索引index
     */
    findNearestItemIndex(scrollTop) {
      const { lastMeasuredIndex, binarySearch, exponentialSearch } = this;
      const lastMeasuredOffset = this.getLastMeasuredSizeAndOffset().offset;
      if (lastMeasuredOffset > scrollTop) {
        return binarySearch(0, lastMeasuredIndex, scrollTop);
      } else {
        return exponentialSearch(scrollTop);
      }
    },
    /**
     * 获取虚拟列表条目的尺寸和偏移量（带缓存效果）
     * @param {int} index 条目索引
     * @return {object} 具有尺寸和偏移量的对象
     */
    getItemSizeAndOffset(index) {
      const {
        lastMeasuredIndex,
        sizeAndOffsetCache,
        cityList,
        itemSizeGetter
      } = this;
      //存在缓存结果
      if (lastMeasuredIndex >= index) {
        return sizeAndOffsetCache[index];
      }
      let offset = 0;
      if (lastMeasuredIndex >= 0) {
        const lastMeasured = sizeAndOffsetCache[lastMeasuredIndex];
        if (lastMeasured) {
          offset = lastMeasured.offset + lastMeasured.size;
        }
      }
      for (let i = lastMeasuredIndex + 1; i <= index; i++) {
        const size = itemSizeGetter(cityList, i);
        sizeAndOffsetCache[i] = {
          size,
          offset
        };
        offset += size;
      }
      if (index > lastMeasuredIndex) {
        this.lastMeasuredIndex = index;
      }
      return sizeAndOffsetCache[index];
    },
    /**
     * 获取最后缓存条目的尺寸和偏移量对象
     * @return {object} 尺寸和偏移量对象
     */
    getLastMeasuredSizeAndOffset() {
      const { lastMeasuredIndex, sizeAndOffsetCache } = this;
      return lastMeasuredIndex >= 0
        ? sizeAndOffsetCache[lastMeasuredIndex]
        : { offset: 0, size: 0 };
    },
    /**
     * 二分法查找已缓存的条目的index
     * @param {int} low 二分法低位条目index
     * @param {int} high 二分法高位条目index
     * @param {int} offset 偏移量
     * @return {int} 条目index
     */
    binarySearch(low, high, offset) {
      const { getItemSizeAndOffset } = this;
      let index;
      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const middleOffset = getItemSizeAndOffset(middle).offset;
        if (middleOffset === offset) {
          index = middle;
          break;
        } else if (middleOffset > offset) {
          high = middle - 1;
        } else {
          low = middle + 1;
        }
      }

      if (low > 0) {
        index = low - 1;
      }
      if (typeof index === "undefined") {
        index = 0;
      }
      return index;
    },
    /**
     * 质数发查找未缓存的条目的index
     * @param {int} scrollTop 偏移量
     * @return {int} 条目index
     */
    exponentialSearch(scrollTop) {
      const {
        cityList,
        lastMeasuredIndex,
        getItemSizeAndOffset,
        binarySearch
      } = this;
      let bound = 1;
      const start = lastMeasuredIndex >= 0 ? lastMeasuredIndex : 0;
      while (
        start + bound < cityList.length &&
        getItemSizeAndOffset(start + bound).offset < scrollTop
      ) {
        bound = bound * 2;
      }
      return binarySearch(
        start + Math.floor(bound / 2),
        Math.min(start + bound, cityList.length - 1),
        scrollTop
      );
    },
    /**
     * 选择城市
     * @param {Event} event
     * @return void
     */
    setCity(event) {
      const cId = event.target.dataset.cid;
      const pinyin = event.target.dataset.pinyin;
      const city = event.target.innerText;
      let payload = {
        cId,
        pinyin,
        city
      };
      this.setLocationInfo(payload);
      this.gussedCity = city;
      this.showSearchList = false;
      this.dropdown = false;
      this.searchValue = "";
      this.searchKeywords = "";
    },
    /**
     * 搜索城市
     * @param {Event} event
     * @return void
     */
    searchCity(event) {
      const { cityList } = this;
      const keywords = event.target.value.trim().toLowerCase();
      const keyCode = event.keyCode;
      let itemNow = document.querySelector(".search-item.active");
      if (!itemNow && this.searchList.length !== 0) {
        itemNow = document.querySelector(".search-item");
        itemNow.className = "search-item active";
      }
      //没有输入或者输入为Esc，隐藏下拉列表
      if (!keywords.length || keyCode == 27) {
        //影藏下拉列表
        this.showSearchList = false;
      }
      //按键为回车，上下方向键
      if (keyCode == 13 || keyCode == 38 || keyCode == 40) {
        //处理城市选择
        const itemContainer = document.querySelector(".search-list");
        if (keyCode == 38) {
          let itemPrev = itemNow.previousSibling;
          if (itemPrev) {
            itemNow.className = "search-item";
            itemPrev.className = "search-item active";
            this.searchValue = itemPrev.innerText;
            itemContainer.scrollTo(0, itemContainer.scrollTop - 31);
          }
        } else if (keyCode == 40) {
          let itemNext = itemNow.nextSibling;
          if (itemNext) {
            itemNow.className = "search-item";
            itemNext.className = "search-item active";
            this.searchValue = itemNext.innerText;
            itemContainer.scrollTo(0, itemContainer.scrollTop + 31);
          }
        } else if (keyCode == 13) {
          itemNow.className = "search-item";
          var clickEvent = new Event("click");
          itemNow.dispatchEvent(clickEvent);
        }
        return;
      }
      //搜索itemList
      this.showSearchList = true;
      this.searchList = [];
      for (let val of cityList.values()) {
        for (let val1 of val.values()) {
          if (
            val1.pinyin.indexOf(keywords) == 0 ||
            val1.real.search(keywords) == 0
          ) {
            this.searchList.push(val1);
          }
        }
      }
    },
    /**
     * 搜索地址
     * @parma {Event} event
     * @return void
     */
    searchLocation(event) {
      const { map } = this;
      const _this = this;
      const keywords = event.target.value.trim().toLowerCase();
      const keyCode = event.keyCode;
      //按键上下方向键
      if (keyCode == 13 || keyCode == 38 || keyCode == 40) {
        //处理城市选择
        let itemNow = document.querySelector(".location-item.active");
        if (keyCode == 38) {
          let itemPrev = itemNow.previousSibling;
          if (itemPrev) {
            itemNow.className = "location-item";
            itemPrev.className = "location-item active";
            this.searchKeywords = itemPrev.firstElementChild.innerText;
          }
        } else if (keyCode == 40) {
          if (!itemNow && this.locationList.length !== 0) {
            itemNow = document.querySelector(".location-item");
            itemNow.className = "location-item active";
            this.searchKeywords = itemNow.innerText;
          } else {
            let itemNext = itemNow.nextSibling;
            if (itemNext) {
              itemNow.className = "location-item";
              itemNext.className = "location-item active";
              this.searchKeywords = itemNext.firstElementChild.innerText;
            }
          }
        } else if (keyCode == 13) {
          this.locationList = null;
          this.openMap();
          event.target.blur();
        }
        return;
      }

      const limitedCity = this.locationInfo.city;
      map.plugin("AMap.AutoComplete", () => {
        let autoOptions = {
          city: limitedCity,
          cityLimit: true
        };
        const autoComplete = new map.AutoComplete(autoOptions);
        autoComplete.search(keywords, (stateus, result) => {
          _this.locationList = result.tips;
        });
      });
    },
    /**
     * 显示地图
     * @return void
     */
    openMap() {
      this.$refs.inputBox.style.webkitTransform = "translate3d(-270px, 0, 0)";
      this.$refs.topNav.style.display = "none";
      this.mapWrapShow = true;
    },
    /**
     * 地址输入框获得焦点
     * @return void
     */
    inputFocus() {
      this.isInputFocus = true;
      this.dropdown = false;
    },
    /**
     * 地址输入框失去焦点
     * @return void
     */
    inputBlur() {
      this.isInputFocus = false;
    },
    /**
     * 设置地址
     * @param {Event} event
     * @return void
     */
    setLocation(event) {
      const keywords = event.target.querySelector(".name").innerText;
      this.searchKeywords = keywords;
      this.locationList = null;
      this.openMap();
    }
  },
  created() {
    const _this = this;
    //加载城市列表
    const clientData = ClientData.getStorage("session");
    if (!clientData.has("city-list")) {
      this.$Http[GET_CITY_LIST]()
        .then(res => {
          _this.cityList = res.data.cityGroup;
          clientData.setItem("city-list", _this.cityList);
          _this.$nextTick(() => _this.updateVisibleData());
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.cityList = clientData.getItem("city-list");
      _this.$nextTick(() => _this.updateVisibleData());
    }
    //加载高德地图
    AMapLoader.load({
      key: VUE_APP_AMAP_KEY,
      version: "2.0"
    })
      .then(AMap => {
        //根据IP查询城市
        AMap.plugin("AMap.CitySearch", function() {
          const citySearch = new AMap.CitySearch();
          citySearch.getLocalCity((status, result) => {
            if (status === "complete" && result.info === "OK") {
              // 查询成功，result即为当前所在城市信息
              _this.gussedCity = result.city;
            }
          });
        });
        _this.map = AMap;
        loadUIAMap().then(() => {
          window.initAMapUI();
          _this.mapUI = window.AMapUI;
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
<style lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/layout.scss";
.location-input {
  min-height: 560px;
  width: 100%;
  .user-center {
    width: 630px;
    margin: 180px auto 0;
    @include flex-layout($justify-content: flex-end);
    .item {
      margin: 0 10px;
      padding: 0 10px;
    }
  }

  .input-box {
    width: 630px;
    border: 3px solid #ccc;
    border-radius: 5px;
    margin: 20px auto 0;
    height: 40px;
    position: relative;
    @include flex-layout($justify-content: flex-start);
    &:hover,
    &.active {
      border-color: $accent-color;
      .select-area {
        @include flex-layout();
        border-right-color: $accent-color;
        color: $accent-color;
        .dropdown.arrow-left {
          border-left-color: $accent-color;
        }
        .dropdown.arrow-bottom {
          border-top-color: $accent-color;
        }
      }
    }

    .city-list-area {
      position: absolute;
      top: 40px;
      border: 2px solid #ccc;
      border-radius: 5px;
      margin: 20px auto 0;
      height: 400px;
      width: 630px;
      overflow: auto;
      &:before,
      &:after {
        display: block;
        width: 0;
        height: 0;
        content: "";
        border: solid transparent;
        position: absolute;
        bottom: 100%;
      }
      &:before {
        left: 20px;
        border-width: 10px;
        border-bottom-color: #ccc;
      }
      &:after {
        left: 21px;
        border-width: 9px;
        border-bottom-color: $bg-color;
      }

      .city-list-phantom {
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
        background-color: white;
      }
      .city-list-header {
        padding: 15px;
        height: 70px;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        border-bottom: 2px solid #ccc;
        background-color: #e4e4e4;
        color: $secondary-text-color;
        z-index: 1;
        .guess {
          margin-right: 15px;
        }
        .city-name {
          margin-right: 15px;
          padding: 5px 10px;
          background: $primary-color-base;
          border-radius: 5px;
          &:hover {
            background: #999999;
          }
        }
        .city-input {
          height: 30px;
          border-left: 2px solid #ccc;
          padding-left: 15px;
          input {
            height: 30px;
            padding: 0 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            color: $secondary-text-color;
            &:focus {
              border-color: $accent-color;
            }
          }
          .search-list {
            background: white;
            border: 1px solid #ccc;
            width: 185px;
            max-height: 300px;
            overflow-x: hidden;
            overflow-y: auto;
            .search-item {
              padding: 5px 0 5px 30px;
              &:hover,
              &.active {
                background: #ccc;
              }
            }
          }
        }
      }
      .city-list-content {
        padding: 0 10px 0 20px;
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
        background: white;
        .list-body {
          padding: 70px 0 15px 0;
          .row {
            padding: 10px 0;
            display: flex;
            align-items: center;
            border-bottom: 1px dashed #ccc;
            .index-alpha {
              padding: 0 30px 0 20px;
              div {
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #ccc;
                border-radius: 15px;
                font-size: medium;
                color: white;
                background-color: coral;
              }
            }
            .list {
              display: flex;
              flex-wrap: wrap;
              .item {
                width: 90px;
                margin: 0 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                line-height: 25px;
                color: $secondary-text-color;
                &:hover {
                  color: $accent-color;
                }
              }
            }
          }
        }
      }
    }
    .select-area {
      width: 20%;
      margin: 5px;
      font-weight: 600;
      color: $secondary-text-color;
      border-right: 3px solid #ccc;
      z-index: 1;
      @include flex-layout();

      .city {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        padding: 0 10px;
      }
      .dropdown {
        width: 0;
        height: 0;
        content: "";
        border: solid transparent;
        border-width: 5px;
        &.arrow-left {
          border-left-color: #ccc;
        }
        &.arrow-bottom {
          margin-top: 5px;
          border-top-color: #ccc;
        }
      }
    }

    .input-area {
      input {
        padding: 0 10px;
        width: 450px;
        height: 32px;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .location-list {
      width: 500px;
      position: absolute;
      top: 45px;
      left: 130px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: white;
      .location-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 10px;
        color: $secondary-text-color;
        cursor: pointer;
        &.active,
        &:hover {
          color: white;
          background: #ccc;
        }
        .address {
          color: $alternate-text-color;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
