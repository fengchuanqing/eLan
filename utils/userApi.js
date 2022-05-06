const domain = 'https://szsn.lx.gov.cn/agriculturalProductDockingServer';
// const domain = 'http://192.168.14.50:86'; 
const api = domain+'/agricultural'
const apiObj={
  domain:'https://szsn.lx.gov.cn',
  ymSearchList:api+'/cxx/list',
  getEwm:api+'/activity/getEwm',
  ymSearchCon:api+'/pzwhqxx/list',
  addEvaluation:api+'/evaluation/add',
  evaluationList:api+'/evaluation/list',
  activityList:api+'/activity/list',
  getIndexActivity:api+'/activity/getIndexActivity',
  activityDetails:api+'/activity/',
  getAccessToken:api+'/activity/getAccessToken',
  addActivityOrder:domain+'/app/order/addActivityOrder',
  storeList:domain+'/app/store/list',
  goodsList:api+'/goods/getByStoreId',
  goodsDetail:api+'/goods/',
  orderAddress:domain+'/app/address/list/',
  addOrder:api+'/order',
}
module.exports=apiObj