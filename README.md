## react项目中使用mocha结合chai断言库进行单元测试

##### 项目搭建
`create-react-app react-mocha-test` 创建一个名称为 `react-mocha-test` 的react项目

进入 `react-mocha-test` 安装 `Mocha` 为了操作的方便，请在全面环境也安装一下`Mocha`

`npm install -g mocha`

##### 编写测试脚本

1.进入`src`目录，新建`tool.js`文件存放我们的需要测试的函数，函数的具体作用这里就不需要解释了。
```
function checkSex (idcard) {
  if (idcard === undefined || idcard === null) {
    return '男'
  }
  if (parseInt(idcard.substr(16, 1)%2, 10) === 1) {
    return '男'
  } else {
    return '女'
  }
}

function add(x, y) {
  return x + y
}

function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   /*eslint no-useless-escape: */
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}
module.exports = {
  checkSex,
  add,
  getParameterByName
}

```
2.在根目录中 `test` 中建立测试脚本文件，列如： `index.js`

在文件中引入我们要测试的函数

`let {checkSex, add, getParameterByName} = require('../src/tool/tool.js')`

我们还用到了`chai`断言库,详情请了解 [chai](https://www.chaijs.com/)

所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。

使用`npm install chai`安装

通过`let expect = require('chai').expect` 引入

接下来我们就开始写断言测试，这里只写一种

测试第一个函数`checkSex`

```
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
```
这里举例四种测试用例，根据身份证号码辨别该用户的性别和我们预期的是否一致。

基本上，`expect`断言的写法都是一样的。头部是`expect`方法，尾部是断言方法，比如`equal`、`a/an`、`ok`、`match`等。两者之间使用`to`或`to.be`连接。

如果`expect`断言不成立，就会抛出一个错误。事实上，只要不抛出错误，测试用例就算通过。

在项目根目录执行`npm test`进行单元测试，可以看到测试结果
