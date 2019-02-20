function  checkSex (idcard) {
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

function KeepTwoDecimal (num) {
  if (num === null || num === '' || num === undefined){
    return null
  }
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    if (num.toString().split(".")[1].length ===1) {
      num = num.substring(0, 2 + index + 1) + '0'
    }
    num = num.substring(0, 2 + index + 1)
  } else {
    num = num.substring(0) + '.00'
  }
  return parseFloat(num)
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
  KeepTwoDecimal,
  getParameterByName
}
