///javascript
//#***********************************************
//#
//#      Filename: clientData.spec.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: clientData工厂类测试
//#        Create: 2020-07-31 15:13:36
//# Last Modified: 2020-07-31 15:13:36
//#***********************************************

import ClientData from "../../src/utils/clientData/clientData";
import LocalStorage from "../../src/utils/clientData/localStorage";
import SessionStorage from "../../src/utils/clientData/sessionStorage";
import Cookie from "../../src/utils/clientData/cookie";
import { expect } from "chai";

describe("clientData工厂类测试", function() {
  it("ClientData.getStorage()返回localStorage实例对象", function() {
    expect(ClientData.getStorage()).to.be.instanceof(LocalStorage);
  });
  it("ClientData.getStorage('local')", function() {
    expect(ClientData.getStorage("local")).to.be.instanceof(LocalStorage);
  });
  it("ClientData.getStorage('session')", function() {
    expect(ClientData.getStorage("session")).to.be.instanceof(SessionStorage);
  });
  it("ClientData.getStorage('cookie')", function() {
    expect(ClientData.getStorage("cookie")).to.be.instanceof(Cookie);
  });
  it("ClientData.getStorage('other')", function() {
    expect(ClientData.getStorage.bind(ClientData, "other")).to.throw(Error);
  });
});
