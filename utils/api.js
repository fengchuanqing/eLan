// const domain = 'http://192.168.14.78:8090';
const domain = 'https://szsn.lx.gov.cn/agriculturalProductDockingServer';
// const api = domain+'/system'
const api = domain+'/app'
const apiObj={
  domain:'https://szsn.lx.gov.cn',
  getAllOrderCount:api+'/order/getAllOrderCount',
  addClickNum:api+'/store/addClickNum',
  addShareNum:api+'/store/addShareNum',
  xcxLogin:api+'/user/xcxLogin',
  userLogin:api+'/user/checkCodeByMobile',
  getCodeByMobile:api+'/user/getCodeByMobile',
  addressDetails:api+'/address/',
  addressList:api+'/address/list',
  myOrderList:api+'/order/selectOrderByUserId',
  myOrderDeatils:api+'/order/getOrderByUserId',
  myOrderUpdate:api+'/order/update',
  myOrderDel:domain+'/agricultural/order/',
  updateLookGoods:api+'/media/',
  lookGoodsList:api+'/media/list',
  addOfflineOrder:api+'/offlineOrder',
  offlineOrderList:api+'/offlineOrder/list',
  merchantGetDbsx:api+'/order/getDbsx',
  merchantGetFhdd:api+'/order/getFhdd',
  merchantGetAllCount:api+'/order/getAllCount',
  merchantGetSubjectType:api+'/business/getSubjectType',
  merchantUpdateUserInfo:api+'/business',
  merchantUserInfo:api+'/business/detail',
  merchantActivityDeatil:api+'/agricultural/',
  merchantActivityList:api+'/agricultural/list',
  merchantOrderList:api+'/order/list',
  merchantGoodsList:api+'/goods/list',
  merchantGoodsUp:api+'/goods',
  merchantGoodsDeatil:api+'/goods/',
  merchantOrderDeatil:api+'/order/',
  merchantOrderUpdate:api+'/order/update',
  evaluateList:api+'/order/evaluateList',
  upload:domain+'/common/upload',
  guide:domain+'/agricultural/guide/list',
  guideDetails:domain+'/agricultural/guide'
}
module.exports=apiObj