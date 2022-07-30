function isString(string) {
  if ((typeof string == 'string') && string.constructor == String) {
      return true
  }
  return false
}

function numberIndex(address) {
  var n = address.search(/\d/g);
  return n
}

function letterIndex(address) {
  var n = address.search(/[a-zA-Z]/g);
  return n
}

// 必须先比对+86的手机号，防止+86被单独分割。在确定没有+86后，才能继续判断是否为手机号码。中间可包含空格
function x86PhoneIndex(address) {
  var n = address.search(/(\(\s*)?\+86(\s*\))?\s*-?\s*1\d{10}/g);
  return n
}

function phoneIndex(address) {
  var n = address.search(/1\d{10}/g);
  return n
}

function telePhoneIndex(address) {
  // 座机正则 无区号, 010 xxxxxxx, 
  var n = address.search(/(\(\s*)?0\d{2,3}\s*\)?\s*-?\s*\d{7,8}/g);
  return n
}

function phoneEndIndex(address) {
  var n = address.search(/\d{7}\D/g); // 7位数（确定是电话号码的一部分），加非数字结尾（确定电话号码边界）
  // 警告，这里返回的n是末尾段的起始位置！！！而不是结束位置！！
  if (n == -1) {
      return -1
  }
  return n + (7 - 1)
}

// 可见字符
function visibleChar(address) {
  var n = address.search(/\S/g);
  return n
}

// module.exports的方法，里面方便切调用换内部方法
function testFunc(string) {
  return removeQuotationMarks(string)
}

// 只要是以下面这些关键词为起始字符的，都认定为地址值。
function isAddress(address) {
  let items = ["中国",
      "河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "台湾",
      "内蒙古", "广西", "西藏", "宁夏", "新疆",
      "北京", "天津", "上海", "重庆",
      "深圳"
  ]
  for (var i = 0; i < items.length; i++) {
      let item = items[i]
      if (address.startsWith(item)) {
          return true
      }
  }
  return false
}

// 传入一个包含姓名、电话、地址的字符串（可以只包含1样，或2样，或3样），返回一个对象 {name: xx, phone: xx, address: xx}，无对应属性则为undefined
function processAddress(address) {
  let address0 = address
  if (typeof(address0) != 'string') {
      return undefined
  }
  // address0.replace(/(^\s*)|(\s*$)/g, "");        // 去掉前后不可见字符
  address0 = removeQuotationMarks(address0)   
  if (!isString(address0)) {
      return undefined
  }
  if (address0.length < 5 && numberIndex(address0) > -1) { // 长度 < 5，不包含数字，当做姓名
      return {
          name: address0,
          count: 1
      }
  }
  var phoneIndexInString = -1 // 电话号码在（分割后）字符串中的位置
  let array0 = address0.split(",")
  var array1 = []
  for (var i = 0; i < array0.length; i++) {
      let arr = array0[i].split("，") //中文逗号
      array1.push.apply(array1, arr)
  }
  var array2 = []
  for (var i = 0; i < array1.length; i++) {
      let arr = array1[i].split(";")
      array2.push.apply(array2, arr)
  }
  var array3 = []
  for (var i = 0; i < array2.length; i++) {
      let arr = array2[i].split("；") //中文分号
      array3.push.apply(array3, arr)
  }
  var array40 = []
  for(var i = 0; i < array3.length; i++) {
      let arr = array3[i].split(":")
      array40.push.apply(array40, arr)
  }
  var array4 = []
  for(var i = 0; i < array40.length; i++) {
      let arr = array40[i].split("：")
      array4.push.apply(array4, arr)
  }
  var array50 = []
  for (var i = 0; i < array4.length; i++) {
      let arr = array4[i].split("\n")
      array50.push.apply(array50, arr)
  }
  var array51 = []
  for (var i = 0; i < array50.length; i++) {
      let arr = array50[i].split("、")
      array51.push.apply(array51, arr)
  }
  var array5 = []
  for (var i = 0; i < array51.length; i++) {
      let string = array51[i]
      if (visibleChar(string) == -1) {
          continue;   // 没有可见字符，继续下一个
      }
      array5.push(string)
  }
  var array6 = []
  var phoneIndexInArray = -1 // 电话号码在数组中的位置
  for (var i = 0; i < array5.length; i++) {
      // 不能直接用空格切割，因为手机号码 "+86 15888888888" "+86 -15888888888"中间可能有空格！
      let string = array5[i]
      
      phoneIndexInString = x86PhoneIndex(string)
      if (phoneIndexInString == -1) {
          phoneIndexInString = phoneIndex(string)
      }
      if (phoneIndexInString == -1) {
          phoneIndexInString = telePhoneIndex(string)
      }
      if (phoneIndexInString != -1) {
          let phoneEnd = phoneEndIndex(string)
          if (phoneIndexInString != 0) {
              // 号码前有字符串
              let preString = string.substring(0, phoneIndexInString)
              var n = preString.search(/\S/g); // 是否包含可见字符
              if (n != -1) {
                  let arr = preString.split(" ")
                  array6.push.apply(array6, arr)
              }
          }
          if (phoneEnd == -1) { // 号码在末尾
              let phoneStr = string.substring(phoneIndexInString, string.length)
              phoneIndexInArray = array6.length
              array6.push(phoneStr)
          } else { // 号码之后还有字符
              let phoneStr = string.substring(phoneIndexInString, phoneEnd + 1)
              phoneIndexInArray = array6.length
              array6.push(phoneStr)
              let suffixString = string.substring(phoneEnd + 1, string.length)
              var n = suffixString.search(/\S/g); // 是否包含可见字符
              if (n != -1) {
                  let arr = suffixString.split(" ")
                  array6.push.apply(array6, arr)
              }
          }
      } else {
          // 不包含任何形式电话号码
          let arr = string.split(" ")
          array6.push.apply(array6, arr)
      }
  }
  var array61 = []
  for (var i = 0; i < array6.length; i++) {
      let string = array6[i]
      if (visibleChar(string) == -1) {
          continue;   // 没有可见字符，继续下一个
      }
      array61.push(string)
  }
  return processPatrs(array61, phoneIndexInArray)
}

// 去掉字符串前后的（中\英文）单、双引号
function removeQuotationMarks(address) {
  let address0 = address
  if (typeof(address0) != 'string') {
      return undefined
  }
  address0 = address0.replace(/(^\s*)|(\s*$)/g, "");        // 去掉前后不可见字符。警告，原字符串不变，返回运算结果。所以要重新赋值。
  let firstChar =  address0.substr(0, 1)
  if (firstChar == "\"" || 
  firstChar == "'" || 
  firstChar == "”") { // 中英文左单，双引号
      address0 = address0.substr(1, address0.length - 1)
  }
  let lastChar = address0.substr(address0.length - 1, 1)
  if (lastChar == "\"" || 
  lastChar == "'" || 
  lastChar == "“") {
      address0 = address0.substr(0, address0.length - 1)
  }
  return address0
}

// arr：已经按分隔符或空格切割好的碎片；phoneIndexInArray：电话号码在arr中的下标，如果不存在则 =-1
function processPatrs(arr, phoneIndexInArray) {
  if (arr.length > 0) {
      var result = {}
      // 当只有3部分，且中间部分为电话号码时，如 [part0 , phone , part2]，则把part0，part2中较长部分当地址，较短部分当姓名
      if (arr.length == 3 && phoneIndexInArray == 1) {
          var part0 = arr[0]
          var part2 = arr[2]
          result.phone = arr[1]
          if (part0.length <= part2.length) {
              result.name = part0
              result.address = part2
          } else {
              result.name = part2
              result.address = part0
          }
          result.count = 3
      } else {
          var address = ""
          var count = 0
          for (var i = 0; i < arr.length; i++) {
              let part = arr[i]
              if (isAddress(part)) {
                  address = address + part
              } else if (part.length >= 2 && part.length <= 4 && numberIndex(part) == -1 && letterIndex(part) == -1) {
                  // 姓名不能包含数字，字母
                  result.name = part
                  count++
              } else if (phoneIndex(part) != -1 || telePhoneIndex(part) != -1) {
                  // 手机或座机
                  result.phone = part
                  count++
              } else {
                  //
                  address = address + part
              }
          }
          if (address.length > 1) {
              result.address = address
              count++
          }
          result.count = count
      }
      return result
  } else {
      return undefined
  }
}

// 注意，province必须是【标准】省份、自治区、直辖市【全称】
function removeProvinceName(address, province) {
  let address0 = address
  if (address0.startsWith("中国")) {
      address0 = address0.substr(2, address0.length - 2)
  }
  // 省份全称
  if (address0.startsWith(province)) {
      // 包含标准省份全称
      address0 = address0.substr(province.length, address0.length - province.length)
      return {
          address: address0,
          result: true
      }
  } else {
      // 可能不是标准的省份全称
      if (province.indexOf("省")) {
          let shortProvince = province.replace("省", "")
          if (address0.startsWith(shortProvince)) {
              // 包含【非】标准省份全称
              address0 = address0.substr(shortProvince.length, address0.length - shortProvince.length)
              return {
                  address: address0,
                  result: true
              }
          } else {
              return {
                  address: address0,
                  result: false
              }
          }
      } else {
          return removeInformalAutonomousRegionName(address)
      }
  }
}

// 如果存在，则移除自治区、直辖市（不标准、不正确的名称，不含省）；返回{address:xxx, result:false}，有移除操作，则 result = true，否则false
function removeInformalAutonomousRegionName(address) {
  // 以下名称有头有尾，且包含常见错误、不规则写法。注意，没有自治区、省后缀的词必须放在有自治区、省后缀的词后面。
  // 否则可能在返回的address里遗留‘自治区’，‘省’字
  let items2 = ["广西自治区", "西藏藏族自治区", "宁夏自治区", "新疆维吾尔自治区", "新疆自治区",
      "内蒙古省", "广西省", "西藏省", "宁夏省", "新疆省",
      "内蒙古", "广西", "西藏", "宁夏", "新疆",
      "北京", "天津", "上海", "重庆"
  ]
  for (var i = 0; i < items2.length; i++) {
      let item = items2[i]
      if (address.startsWith(item)) {
          let address0 = address
          address0 = address0.substr(item.length, address0.length - item.length)
          return {
              address: address0,
              result: true
          }
      }
  }
  return {
      address: address0,
      result: false
  }
}

// address必须是以城市名开头才有效果
function removeCityName(address, city) {
  let address0 = address
  // 城市全称
  if (address0.startsWith(city)) {
      // 包含标准城市全称
      address0 = address0.substr(city.length, address0.length - city.length)
      return {
          address: address0,
          result: true
      }
  } else {
      // 可能不是标准的城市全称
      if (city.indexOf("市")) {
          let shortCity = city.replace("市", "")
          if (address0.startsWith(shortCity)) {
              // 包含【非】标准城市全称
              address0 = address0.substr(shortCity.length, address0.length - shortCity.length)
              return {
                  address: address0,
                  result: true
              }
          } 
      }
  }
  return {
      address: address0,
      result: false
  }
}

// address必须是以城区名开头才有效果
function removeDistrictName(address, district) {
  let address0 = address
  // 城区全称
  if (address0.startsWith(district)) {
      // 包含标准城区全称
      address0 = address0.substr(district.length, address0.length - district.length)
      return {
          address: address0,
          result: true
      }
  } 
  return {
      address: address0,
      result: false
  }
}

module.exports = {
  processAddress: processAddress,
  isAddress: isAddress,
  removeProvinceName: removeProvinceName,
  removeCityName: removeCityName,
  removeDistrictName: removeDistrictName,
  testFunc: testFunc
}