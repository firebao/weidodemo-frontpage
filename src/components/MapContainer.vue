<!--
#***********************************************
#
#      Filename: src/components/MapContainer.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: MapContainer组件
#        Create: 2020-08-13 10:19:59
# Last Modified: 2020-08-13 10:19:59
#***********************************************
-->
<template>
  <!-- MapContainer wrap -->
  <div
    class="wrap flex"
    :style="{
      'z-index': $parent.locationList || $parent.dropdown ? -1 : 1
    }"
  >
    <!-- poi-list -->
    <div class="poi-list">
      <div class="total-addr">共{{ poiList ? poiList.count : 0 }}个地址</div>
      <ul>
        <li
          v-for="(item, index) in poiList.pois"
          :key="index"
          class="poiItem"
          :class="{ active: index % 10 === 0 }"
          @click="setPoi(index)"
          :data-id="index"
        >
          <span class="tag">{{
            ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"][index]
          }}</span>
          <span class="name">{{ item.name }}</span>
        </li>
      </ul>
      <base-page
        :total="poiList.count"
        className="poi-list-page"
        @on-change="changePoiListPage"
        mode="scroll"
      >
      </base-page>
    </div>
    <!-- end poi-list -->
    <!-- 地图 -->
    <div
      class="container"
      id="amap-container"
      :style="{
        'z-index': $parent.locationList || $parent.dropdown ? -1 : 1
      }"
    ></div>
    <!-- end 地图 -->
    <!-- 当前位置 -->
    <div class="current-location" v-if="locationDetail">
      <span class="label">当前地址：</span>
      <div :title="locationDetail.detail" class="address">
        {{ locationDetail.detail }}
      </div>
      <div class="button-dashed" @click="submitLocation">确定</div>
    </div>
    <!-- end 当前位置 -->
  </div>
  <!-- end MapContainer wrap -->
</template>
<script>
import BasePage from "@/components/BasePage";
import { LOCATION_INFO } from "@/store/mutationTypes";
import { createNamespacedHelpers } from "vuex";

const { mapMutations, mapState } = createNamespacedHelpers("user");
const indexAlpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

/**
 * MapContainer组件
 * @vuedoc
 * @exports compontent/MapContainer
 */
export default {
  name: "MapContainer",
  data: function() {
    return {
      /**
       * poi信息列表
       */
      poiList: {},
      /**
       * 地图对象
       */
      amap: null,
      /**
       * 地图上的点标记
       */
      marker: null,
      /**
       * 用户在地图上的标记点
       */
      selfMarker: null,
      /**
       * 用户地址信息
       */
      locationDetail: null,
      /**
       * 当前页码
       */
      currentIndex: 0
    };
  },
  props: {
    /**
     * 地址搜索关键词
     */
    searchKeywords: String,
    /**
     * 选定的城市信息
     */
    city: String,
    /**
     * 地图对象
     */
    map: Object
  },
  components: {
    BasePage
  },
  watch: {
    searchKeywords: function() {
      this.getPoiList(this.searchKeywords, this.city);
    },
    city: function() {
      this.getPoiList(this.searchKeywords, this.city);
    }
  },
  computed: {
    ...mapState({
      locationInfo: state => state.locationInfo
    })
  },
  methods: {
    ...mapMutations({
      setLocationInfo: LOCATION_INFO
    }),
    /**
     * 获取poi地址列表
     * @param {string} searchKeywords 地址关键字
     * @param {string} city 目标城市
     * @param {int} pageIndex 页码
     * @return void
     */
    getPoiList(searchKeywords, city, pageIndex = 1) {
      const _this = this;
      if (Object.keys(this.map).length !== 0) {
        this.map.plugin(["AMap.PlaceSearch", "AMap.AtuoComplete"], () => {
          const placeSearch = new _this.map.PlaceSearch({
            city,
            cityLimit: true,
            pageIndex
          });
          placeSearch.search(_this.searchKeywords, (status, result) => {
            _this.poiList = result.poiList;
            _this.amap.setCenter(_this.poiList.pois[0].location);
            //移除原有的Marker
            _this.amap.clearMap();
            //创建点标记Marker
            window.AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
              _this.marker = [];
              result.poiList.pois.forEach((item, key) => {
                _this.marker[key] = new SimpleMarker({
                  iconLabel: {
                    innerHTML: "<b>" + indexAlpha[key] + "</b>",
                    style: {
                      color: "#ffffff"
                    }
                  },
                  iconTheme: "fresh",
                  iconStyle: key === 0 ? "red" : "blue",
                  position: item.location
                });
              });
              _this.amap.add(_this.marker);
              _this.marker[0].setTop(true);
              _this.setLocationDetail(result.poiList.pois[0].location);
              _this.currentIndex = 0;
            });
          });
        });
      }
    },
    /**
     * 更改地址列表分页
     * @param {int} page 页码
     * @return void
     */
    changePoiListPage(page) {
      this.selfMarker && this.selfMarker.remove();
      this.selfMarker = null;
      this.getPoiList(this.searchKeywords, this.city, page);
      const domActiveItem = document.querySelector(".poiItem.active");
      domActiveItem && (domActiveItem.className = "poiItem");
      document.querySelectorAll(".poiItem")[0].className = "poiItem active";
    },
    /**
     * 选择poi地址为当前地址
     * @param {index} index poi地址在poi地址列表中的索引
     * @return void
     */
    setPoi(index) {
      this.selfMarker && this.selfMarker.remove();
      this.selfMarker = null;
      const domActiveItem = document.querySelector(".poiItem.active");
      domActiveItem && (domActiveItem.className = "poiItem");
      this.currentIndex && this.marker[this.currentIndex].setIconStyle("blue");
      this.currentIndex = index;
      this.marker[index].setIconStyle("red");
      this.marker[index].setTop(true);
      document.querySelectorAll(".poiItem")[index].className = "poiItem active";
      this.amap.setCenter(this.poiList.pois[index].location);
      this.setLocationDetail(this.poiList.pois[index].location);
    },
    /**
     * 在地图上标记自身位置
     * @param {Event} event
     * @retunr void
     */
    addSelfMarker(event) {
      const domActiveItem = document.querySelector(".poiItem.active");
      domActiveItem && (domActiveItem.className = "poiItem");
      this.currentIndex !== null &&
        this.marker[this.currentIndex].setIconStyle("blue");
      this.currentIndex = null;
      this.amap.setCenter(event.lnglat);
      this.setLocationDetail(event.lnglat);
      if (this.selfMarker) {
        this.selfMarker.setPosition(event.lnglat);
        return;
      }
      const _this = this;
      window.AMapUI.loadUI(["overlay/AwesomeMarker"], AwesomeMarker => {
        _this.selfMarker = new AwesomeMarker({
          awesomeIcon: "user",
          iconLabel: {
            style: {
              color: "#fff"
            }
          },
          iconStyle: "red",
          position: event.lnglat
        });
        _this.amap.add(_this.selfMarker);
      });
    },
    /**
     * 设置详细地址
     * @param {Object} lnglat lnglat对象
     * @return void
     */
    setLocationDetail(lnglat) {
      const _this = this;
      this.map.plugin("AMap.Geocoder", () => {
        const geocoder = new _this.map.Geocoder({
          city: _this.$parent.locationInfo.cId
        });
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            _this.locationDetail = {
              lng: lnglat.getLng(),
              lat: lnglat.getLat(),
              detail: result.regeocode.formattedAddress
            };
          }
        });
      });
    },
    /**
     * 地址确定按键事件
     * @return void
     */
    submitLocation() {
      const locationInfo = this.locationInfo;
      let payload = Object.assign({}, locationInfo, this.locationDetail);
      this.setLocationInfo(payload);
      window.history.go(-1);
    }
  },
  created: function() {
    this.$nextTick(function() {
      this.amap = new this.map.Map("amap-container");
      this.amap.setZoom(18);
      this.amap.on("click", this.addSelfMarker);
    });
    this.getPoiList(this.searchKeywords, this.city);
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.wrap {
  margin: 20px 0;
  position: relative;
  .poi-list {
    border: 1px solid #ccc;
    width: 25%;
    .total-addr {
      background: #999999;
      padding: 10px 20px;
      color: white;
    }
    ul {
      height: 500px;
    }
    li {
      padding: 10px 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      .tag {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 15px;
        background-color: #4196fc;
        color: white;
      }
      .name {
        padding-left: 20px;
        color: $secondary-text-color;
      }
      &:hover {
        background-color: #f4f4f4;
      }
      &.active {
        .tag {
          background-color: red;
        }
        .name {
          color: $text-color;
        }
      }
    }
    .poi-list-page {
      background: #e4e4e4;
      padding: 2px;
      height: 34px;
      color: #a5a5a5;
      font-size: small;
    }
  }
  .container {
    width: 75%;
  }
  .current-location {
    padding: 10px;
    position: absolute;
    top: -65px;
    right: 0;
    border: 3px dashed $accent-color;
    border-radius: 5px;
    display: flex;
    .label {
      color: $secondary-text-color;
      font-weight: 600;
    }
    .address {
      max-width: 400px;
      padding-right: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: $alternate-text-color;
    }
  }
}
</style>
