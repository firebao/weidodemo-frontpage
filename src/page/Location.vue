<template>
  <div>
    <mall-header></mall-header>
    <main>
      <div class="main-container">
        <div class="location-input">
          <div class="user-center flex h-right" ref="topNav">
            <router-link class="button-dashed item" to="/user/login">
              登录
            </router-link>
            <router-link class="button-dashed item" to="/user/register">
              注册
            </router-link>
            <router-link class="button-dashed item" to="/usercenter">
              我的小家
            </router-link>
          </div>
          <div
            class="input-box flex h-space v-middle"
            :class="{ active: isInputFocus }"
            ref="inputBox"
          >
            <div
              class="select-area flex h-middle v-middle"
              @click="dropdownSwitch"
            >
              <span class="city" v-if="locationInfo">
                {{ locationInfo.city }}
              </span>
              <span
                class="dropdown"
                :class="!this.dropdown ? 'arrow-left' : 'arrow-bottom'"
              >
              </span>
            </div>
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
            <div
              class="city-list-area"
              v-show="dropdown"
              @scroll="handleScroll"
            >
              <div
                class="city-list-phantom"
                :style="{ height: contentHeight }"
              ></div>
              <div class="city-list-header">
                <span class="guess">猜您在</span>
                <span class="city-name" v-if="locationInfo">
                  {{ locationInfo.city }}
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
                        data-cid="item.city_id"
                        data-pinyin="item.pimyin"
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
          </div>
          <map-container
            :search-keywords="searchKeywords"
            :city="locationInfo ? locationInfo.city : ''"
            v-if="mapWrapShow"
            :map="map ? map : {}"
          ></map-container>
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
import AMapLoader from "@amap/amap-jsapi-loader";
import { VUE_APP_AMAP_KEY } from "@/utils";
//异步加载AMap UI
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
export default {
  name: "Location",
  data: function() {
    return {
      //地址输入框是否获得焦点
      isInputFocus: false,
      dropdown: false,
      //地区列表
      cityList: null,
      data: [],
      start: "",
      lastMeasuredIndex: -1,
      sizeAndOffsetCache: {},
      visibleData: [],
      clientHeight: 400,
      showSearchList: false,
      searchList: [],
      searchValue: "",
      searchKeywords: "",
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
      map: "",
      mapUI: "",
      locationList: "",
      mapWrapShow: false
    };
  },
  created() {
    const _this = this;
    //axios获取地区列表
    this.$Http.getCityList().then(result => {
      this.cityList = result;
      this.data = this.cityList.cityGroup;
      const payload = {
        cId: this.cityList.guess_cityid,
        pinyin: this.cityList.guess_pinyin,
        city: this.cityList.guess
      };
      //更新store中的locationInfo信息
      this.$store.commit("UPDATE_LOCATIONINFO", payload);
      this.updateVisibleData();
    });
    //加载高德地图
    AMapLoader.load({
      key: VUE_APP_AMAP_KEY,
      version: "2.0"
    })
      .then(AMap => {
        _this.map = AMap;
        loadUIAMap().then(() => {
          window.initAMapUI();
          _this.mapUI = window.AMapUI;
        });
      })
      .catch(e => {
        console.log(e);
      });
    //加载高德地图UI组件
  },
  computed: {
    //计算城市列表的总高度
    contentHeight() {
      //list-header有70px高度,hr有2px高度
      let total = 70 + 2;
      for (let i = 0, j = this.data.length; i < j; i++) {
        total += this.itemSizeGetter(this.data, i);
      }
      return total + "px";
    },
    //计算store中的locationInfo信息
    locationInfo() {
      return this.$store.state.user.locationInfo;
    }
  },
  components: {
    MallHeader,
    MallFooter,
    MapContainer
  },
  methods: {
    //区域列表显示影藏切换
    dropdownSwitch() {
      this.dropdown = !this.dropdown;
    },
    //scroll滚动事件处理
    handleScroll(event) {
      const scrollTop = event.target.scrollTop;
      this.updateVisibleData(scrollTop);
    },
    //获取区域条目的高度（区域条目对应A、B、···、Z）
    itemSizeGetter(item, index) {
      const padding = 21;
      let lines = Math.ceil(item[index].length / 5);
      if (lines <= 1) {
        return 51;
      }
      return padding + lines * 25;
    },
    //更新viewport条目的内容
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      //取得viewport的起始列表的数据索引
      this.start = this.findNearestItemIndex(scrollTop);
      //取得viewport的结束列表的数据索引
      const end = this.findNearestItemIndex(scrollTop + this.clientHeight);
      //计算viewport对应的显示数据
      this.visibleData = this.data.slice(
        this.start,
        Math.min(end + 1, this.data.length)
      );
      //把viewport的top设置为起始元素在整个列表中的位置（使用transform是为了更好的性能）
      this.$refs.content.style.webkitTransform = `translate3d(0, 
        ${this.getItemSizeAndOffset(this.start).offset}px, 0)`;
    },
    //根据滚动条滚动量计算虚拟滚动带开始index
    findNearestItemIndex(scrollTop) {
      const { lastMeasuredIndex, binarySearch, exponentialSearch } = this;
      const lastMeasuredOffset = this.getLastMeasuredSizeAndOffset().offset;
      if (lastMeasuredOffset > scrollTop) {
        return binarySearch(0, lastMeasuredIndex, scrollTop);
      } else {
        return exponentialSearch(scrollTop);
      }
    },
    //获取虚拟滚动item的尺寸和偏移量带缓存效果
    getItemSizeAndOffset(index) {
      const {
        lastMeasuredIndex,
        sizeAndOffsetCache,
        data,
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
        const size = itemSizeGetter(data, i);
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
    getLastMeasuredSizeAndOffset() {
      const { lastMeasuredIndex, sizeAndOffsetCache } = this;
      return lastMeasuredIndex >= 0
        ? sizeAndOffsetCache[lastMeasuredIndex]
        : { offset: 0, size: 0 };
    },
    //二分查找已缓存的item的index
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
    //指数法查找未缓存的item的index
    exponentialSearch(scrollTop) {
      const {
        data,
        lastMeasuredIndex,
        getItemSizeAndOffset,
        binarySearch
      } = this;
      let bound = 1;
      const start = lastMeasuredIndex >= 0 ? lastMeasuredIndex : 0;
      while (
        start + bound < data.length &&
        getItemSizeAndOffset(start + bound).offset < scrollTop
      ) {
        bound = bound * 2;
      }
      return binarySearch(
        start + Math.floor(bound / 2),
        Math.min(start + bound, data.length - 1),
        scrollTop
      );
    },
    //选择城市
    setCity(event) {
      const cId = event.target.dataset.cid;
      const pinyin = event.target.dataset.pinyin;
      const city = event.target.innerText;
      let payload = {
        cId,
        pinyin,
        city
      };
      this.$store.commit("UPDATE_LOCATIONINFO", payload);
      this.showSearchList = false;
      this.dropdown = false;
      this.searchValue = "";
    },
    //搜索城市
    searchCity(event) {
      const { data } = this;
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
        return false;
      }
      //搜索itemList
      this.showSearchList = true;
      this.searchList = [];
      for (let val of data.values()) {
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
        return false;
      }

      const limitedCity = this.locationInfo.cId;
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
    //打开地图
    openMap() {
      this.$refs.inputBox.style.webkitTransform = "translate3d(-270px, 0, 0)";
      this.$refs.topNav.style.display = "none";
      this.mapWrapShow = true;
    },
    //地址输入框获得焦点
    inputFocus() {
      this.isInputFocus = true;
      this.dropdown = false;
    },
    //地址输入框失去焦点
    inputBlur() {
      this.isInputFocus = false;
    },
    setLocation(event) {
      const keywords = event.target.querySelector(".name").innerText;
      this.searchKeywords = keywords;
      this.locationList = null;
      this.openMap();
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.location-input {
  min-height: 560px;
  width: 100%;
  .user-center {
    width: 630px;
    margin: 180px auto 0;
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
    &:hover,
    &.active {
      border-color: $accent-color;
      .select-area {
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
      margin: 5px;
      width: 20%;
      padding: 0 20px;
      border-right: 3px solid #ccc;
      z-index: 1;
      font-weight: 600;
      color: $secondary-text-color;
      &:hover {
      }

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
