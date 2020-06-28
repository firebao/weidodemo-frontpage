<!--
#***********************************************
#
#      Filename: Record.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: xxx
#        Create: 2020-06-23 13:52:25
# Last Modified: 2020-06-23 13:52:25
#***********************************************
-->
<template>
  <div class="record">
    <role-manager></role-manager>
    <div class="role-record">
      <div class="block">
        <div class="label">营养需求表:</div>
        <div class="info">
          <table>
            <tr>
              <th>需求营养/月</th>
              <th>标准摄入</th>
              <th>来自围兜</th>
            </tr>
            <tr>
              <td>蛋白质</td>
              <td>88</td>
              <td>58</td>
            </tr>
            <tr>
              <td>糖</td>
              <td>88</td>
              <td>58</td>
            </tr>
            <tr>
              <td>脂肪</td>
              <td>88</td>
              <td>58</td>
            </tr>
            <tr>
              <td>维生素</td>
              <td>88</td>
              <td>58</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="block">
        <div class="label">建议:</div>
        <div class="info">减少糖类的摄入，增加蛋白质摄入</div>
      </div>
    </div>
  </div>
</template>
<script>
import RoleManager from "@/components/TheRoleManager";
export default {
  name: "Record",
  data() {
    return {};
  },
  components: {
    RoleManager
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.record {
  padding: 20px;
  .role-record {
    padding: 20px;
    border: 2px solid #ccc;
    .block {
      padding: 10px 0;
      display: grid;
      grid-template-columns: 1fr 5fr;
      .label {
        text-align: right;
      }
      .info {
        padding-left: 10px;
        text-align: left;
        table {
          width: 60%;
          border-collapse: collapse;
        }
        table,
        tr,
        th,
        td {
          padding: 2px 5px;
          border: 2px solid #ccc;
        }
        th {
          color: $secondary-text-color;
          font-weight: 600;
        }
        td {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
