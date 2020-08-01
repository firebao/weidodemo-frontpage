///javascript
//#***********************************************
//#
//#      Filename: tests/unit/sessionStorage.spec.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: loaclStorage类单元测试
//#        Create: 2020-07-28 11:29:37
//# Last Modified: 2020-07-28 11:29:37
//#***********************************************
import { expect } from "chai";
import sessionStorage from "../../src/utils/clientData/sessionStorage";

const object = new sessionStorage();
let testToken = {
  name: "Token",
  expires: new Date().getTime() + 100 * 24 * 3600
};
describe("封装的sessionStorage类测试", function() {
  global.window.sessionStorage.clear();
  global.window.sessionStorage.setItem("name", "XXX");
  global.window.sessionStorage.setItem("token", JSON.stringify(testToken));
  for (let i = 0, j = 10; i < j; i++) {
    global.window.sessionStorage.setItem(String.fromCharCode(65 + i), i);
  }
  describe("构造函数测试", function() {
    it("构造函数返回正确返回对象", function() {
      const object = new sessionStorage();
      expect(object).to.be.an("object");
      expect(object).to.be.an.instanceof(sessionStorage);
    });
  });
  describe("setItem与getItem方法测试", function() {
    it("getItem('name')返回strint", function() {
      expect(object.getItem("name")).to.be.a("string");
      expect(object.getItem("name")).to.be.equal("XXX");
    });
    it("getItem('token')返回JSON对象", function() {
      expect(object.getItem("token")).to.be.an("object");
      expect(object.getItem("token")).to.deep.equal(testToken);
    });
    it("getItem('age')返回null", function() {
      expect(object.getItem("age")).to.be.null;
    });
    it("setItem('age', 18)设置不存在的项目", function() {
      expect(object.length()).to.be.equal(12);
      object.setItem("age", 18);
      expect(object.length()).to.be.equal(13);
      expect(object.getItem("age")).to.be.equal("18");
    });
    it("setItem('name', 'YYY')更改已存在的项目", function() {
      expect(object.length()).to.be.equal(13);
      object.setItem("name", "YYY");
      expect(object.length()).to.be.equal(13);
      expect(object.getItem("name")).to.be.equal("YYY");
      object.setItem("name", "XXX");
    });
    it("setItem('token', object)更改已存在的项目的对象", function() {
      expect(object.length()).to.be.equal(13);
      testToken.name = "token";
      object.setItem("token", testToken);
      expect(object.length()).to.be.equal(13);
      expect(object.getItem("token")).to.deep.equal(testToken);
    });
  });
  describe("removeItem方法测试", function() {
    it("removeItem('age')", function() {
      expect(object.length()).to.be.equal(13);
      expect(object.getItem("age")).to.be.equal("18");
      object.removeItem("age");
      expect(object.getItem("age")).to.be.null;
      expect(object.length()).to.be.equal(12);
    });
  });
  describe("getAll方法测试", function() {
    it("getAll()", function() {
      expect(object.getAll())
        .to.have.property("length")
        .that.equal(12);
      expect(object.getAll()[2]).to.have.property("key", "A");
      expect(object.getAll()[2]).to.have.deep.property("value", "0");
      expect(object.getAll()[11]).to.have.deep.property("key", "J");
      expect(object.getAll()[11]).to.have.deep.property("value", "9");
    });
  });
  describe("key方法测试", function() {
    it("key(n)", function() {
      expect(object.key(0)).to.be.equal("name");
      expect(object.key(11)).to.be.equal("J");
      expect(object.key(1)).to.be.equal("token");
    });
  });
  describe("length方法测试", function() {
    it("length()", function() {
      expect(object.length()).to.be.equal(12);
    });
  });
  describe("has方法测试", function() {
    it("has('name')返回true", function() {
      expect(object.has("name")).to.be.true;
    });
    it("has('age')返回false", function() {
      expect(object.has("age")).to.be.false;
    });
  });
  describe("forEach方法测试", function() {
    it("forEach(cb)将项目值是字符串在console输出", function() {
      let count = 0;
      const cb = function(item) {
        if (typeof item === "string") {
          count++;
        }
      };
      object.forEach(cb);
      expect(count).to.be.equal(11);
    });
  });
  describe("deleteAllExpires方法测试", function() {
    it("deleteAllExpires()删除所有过期项目", function() {
      expect(object.length()).to.be.equal(12);
      testToken.expires = new Date().getTime() - 10000;
      object.setItem("token1", testToken);
      expect(object.length()).to.be.equal(13);
      object.deleteAllExpires();
      expect(object.getItem("token1")).to.be.null;
      expect(object.length()).to.be.equal(12);
    });
  });
  describe("clear方法测试", function() {
    it("clear()", function() {
      expect(object.length()).to.be.equal(12);
      object.clear();
      expect(object.length()).to.be.equal(0);
    });
  });
  describe("getMaxSpace方法测试", function() {
    it("getMaxSpace()", function() {
      //object.getMaxSpace();
    });
  });
  describe("getUsedSpace方法测试", function() {
    it("getUsedSpace()", function() {
      object.getUsedSpace();
    });
  });
});
