///javascript
//#***********************************************
//#
//#      Filename: tests/unit/cookie.spec.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: cookie测试文件
//#        Create: 2020-07-30 14:28:27
//# Last Modified: 2020-07-30 14:28:27
//#***********************************************

import { expect } from "chai";
import Cookie from "../../src/utils/clientData/cookie";

const object = new Cookie();

describe("封装的Cookie类测试", function() {
  describe("构造函数测试", function() {
    it("构造函数返回正确对象", function() {
      expect(object).to.be.an.instanceof(Cookie);
    });
  });
  describe("setItem与getItem方法测试", function() {
    it("setItem()key参数为空抛出错误", function() {
      expect(object.setItem.bind(object, "")).to.throw(Error);
    });
    it("setItem('expires', 'XXX')key为expires|max-age|path|domain|secure返回错误", function() {
      expect(object.setItem.bind(object, "expires")).to.throw(Error);
      expect(object.setItem.bind(object, "PATH")).to.throw(Error);
    });
    it("setItem('name', 'XXX')", function() {
      object.setItem("name", "XXX");
      expect(object.getItem("name")).to.be.equal("XXX");
    });
    it("setItem('age', '18', '1d')", function() {
      object.setItem("age", "18", "1d");
      expect(object.getItem("age")).to.be.equal("18");
    });
    it("setItem('sex', 'male', 86400)", function() {
      object.setItem("sex", "male", 86400);
      expect(object.getItem("sex")).to.be.equal("male");
    });
    it("setItem('object', {a : 1, b: 2})", function() {
      object.setItem("object", { a: 1, b: 2 });
      expect(object.getItem("object")).to.be.deep.equal({ a: 1, b: 2 });
    });
  });
  describe("removeItem方法测试", function() {
    it("removeItem('name')", function() {
      expect(object.removeItem("name")).to.be.true;
      expect(object.length()).to.be.equal(3);
    });
  });
  describe("getAll方法测试", function() {
    it("getAll()返回所有cookie数组", function() {
      expect(object.getAll()).to.have.length(3);
      expect(object.getAll()[0]).to.have.deep.property("value", "18");
    });
  });
  describe("key(n)方法测试", function() {
    it("key(0)返回name", function() {
      expect(object.key(0)).to.be.equal("age");
    });
  });
  describe("length方法测试", function() {
    it("length()返回3", function() {
      expect(object.length()).to.be.equal(3);
    });
  });
  describe("has方法测试", function() {
    it("has('age')返回true", function() {
      expect(object.has("age")).to.be.true;
    });
    it("has('token')返回false", function() {
      expect(object.has("token")).to.be.false;
    });
  });
  describe("forEach方法测试", function() {
    it("forEach(cb)", function() {
      let count = 0;
      const cb = function(item) {
        if (typeof item === "string") {
          count++;
        }
      };
      object.forEach(cb);
      expect(count).to.be.equal(3);
    });
  });
});
