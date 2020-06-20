<template>
  <div>
    <div
      class="wrap flex"
      :style="{
        'z-index': $parent.locationList || $parent.dropdown ? -1 : 1
      }"
    >
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
      <div
        class="container"
        id="amap-container"
        :style="{
          'z-index': $parent.locationList || $parent.dropdown ? -1 : 1
        }"
      ></div>
      <div class="current-location" v-if="locationDetail">
        <span class="label">当前地址：</span>
        <div :title="locationDetail.detail" class="address">
          {{ locationDetail.detail }}
        </div>
        <div class="button-dashed" @click="submitLocation">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import BasePage from "@/components/BasePage";
const indexAlpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export default {
  name: "MapContainer",
  data: function() {
    return {
      poiList: {},
      amap: null,
      //地图上的点标记
      marker: null,
      //用户在地图上的标记点
      selfMarker: null,
      //用户地址信息
      locationDetail: null,
      currentIndex: 0
    };
  },
  components: {
    BasePage
  },
  created: function() {
    this.$nextTick(function() {
      this.amap = new this.map.Map("amap-container");
      this.amap.setZoom(18);
      this.amap.on("click", this.addSelfMarker);
    });
    this.getPoiList(this.searchKeywords, this.city);
  },
  props: {
    searchKeywords: String,
    city: String,
    map: Object
  },
  watch: {
    searchKeywords: function() {
      this.getPoiList(this.searchKeywords, this.city);
    },
    city: function() {
      this.getPoiList(this.searchKeywords, this.city);
    }
  },
  methods: {
    //获取地址列表
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
    //更改地址列表分页
    changePoiListPage(page) {
      this.selfMarker && this.selfMarker.remove();
      this.selfMarker = null;
      this.getPoiList(this.searchKeywords, this.city, page);
      const domActiveItem = document.querySelector(".poiItem.active");
      domActiveItem && (domActiveItem.className = "poiItem");
      document.querySelectorAll(".poiItem")[0].className = "poiItem active";
    },
    //设置Poi地址
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
    //在地图上标记自身位置
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
    //设置详细地址
    setLocationDetail(lnglat) {
      const _this = this;
      this.map.plugin("AMap.Geocoder", () => {
        const geocoder = new _this.map.Geocoder({
          city: _this.$parent.locationInfo.cId
        });
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            console.log(result);
            _this.locationDetail = {
              lng: lnglat.getLng(),
              lat: lnglat.getLat(),
              detail: result.regeocode.formattedAddress
            };
          }
        });
      });
    },
    //地址确定
    submitLocation() {
      const locationInfo = this.$store.state.user.locationInfo;
      locationInfo.detail = this.locationDetail;
      this.$store.commit("UPDATE_LOCATIONINFO", locationInfo);
      window.history.go(-1);
    }
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
    position: absolute;
    top: -50px;
    right: 0;
    display: flex;
    .label {
      color: $secondary-text-color;
    }
    .address {
      padding-right: 20px;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: $alternate-text-color;
    }
  }
}
</style>
