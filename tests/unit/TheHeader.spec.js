///javascript
//#***********************************************
//#
//#      Filename: TheHeader.spec.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: TheHeader组件单元测试
//#        Create: 2020-08-01 10:38:16
//# Last Modified: 2020-08-01 10:38:16
//#***********************************************

import { expect } from "chai";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import TheHeader from "@/components/TheHeader";
import Http from "@/utils/request/request";

const localVue = createLocalVue();
localVue.prototype.$Http = Http;
const wrapper = shallowMount(TheHeader, { localVue });
const vm = wrapper.vm;

console.log(wrapper);
