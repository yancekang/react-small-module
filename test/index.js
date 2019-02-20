let {checkSex, add, KeepTwoDecimal, getParameterByName} = require('../src/tool/tool.js');
let expect = require('chai').expect;

describe('根据身份证号码验证用户性别', function() {
  it('110101199003072615 男', function() {
    expect(checkSex('110101199003072615')).to.be.equal('男')
  })
  it('110101199003072156 男', function() {
    expect(checkSex('110101199003072156')).to.be.equal('男')
  })
  it('15010219900307442X 女', function() {
    expect(checkSex('15010219900307442X')).to.be.equal('女')
  })
  it('150102199003075385 女', function() {
    expect(checkSex('150102199003075385')).to.be.equal('女')
  })
})
describe('两个数字之和', function() {
  it('1+3=4', function() {
    expect(add(1,3)).to.be.equal(4)
  })
  it('1+5=6', function() {
    expect(add(1,5)).to.be.equal(6)
  })
})

describe('保留两位小数不四舍五入', function() {
  it('2.3333333 ～ 2.33', function() {
    expect(KeepTwoDecimal(2.333333)).to.be.equal(2.33)
  })
  it('1.23 ～ 1.23', function() {
    expect(KeepTwoDecimal(1.23)).to.be.equal(1.23)
  })
  it('1.2399999 ～ 1.23', function() {
    expect(KeepTwoDecimal(1.2399999)).to.be.equal(1.23)
  })
  it('9.999999999 ～ 1.23', function() {
    expect(KeepTwoDecimal(9.999999999)).to.be.equal(9.99)
  })
})

describe('获取url中的参数 url:http://www.baidu.com?ie=utf-8&code=48921312', function() {
  let url = 'http://www.baidu.com?ie=utf-8&code=48921312'
  it('ie:utf-8', function () {
    expect(getParameterByName('ie',url)).to.be.equal('utf-8')
  })
  it('code:48921312', function () {
    expect(getParameterByName('code',url)).to.be.equal('48921312')
  })
})
