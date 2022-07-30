import {
    requset
} from "../utils/request.js"

export const dpqylx = (data) => {
    return requset({
        url: '/xcx/dpqylx',
        data
    })
}
export const getCodeByMobile = (data) => {
    return requset({
        url: '/xcx/getCodeByMobile',
        data
    })
}
export const checkCodeByMobileAndSubmit = (data) => {
    return requset({
        url: '/xcx/checkCodeByMobileAndSubmit',
        data
    })
}
export const saveAddress = (data) => {
    return requset({
        url: '/xcx/xgbcAddress',
        data,
        method: 'post'
    })
}
export const addressList = (data) => {
    return requset({
        url: '/xcx/addressList',
        data
    })
}
export const xzAddress = (data) => {
    return requset({
        url: '/xcx/xzAddress',
        data,
        method: 'post'
    })
}
export const scAddress = (data) => {
    return requset({
        url: '/xcx/scAddress',
        data,
        method: 'get'
    })
}
export const xqAddress = (data) => {
    return requset({
        url: '/xcx/xqAddress',
        data
    })
}
export const fwsf = (data) => {
    return requset({
        url: '/xcx/elmg/fwsf',
        data
    })
}
export const fklx = (data) => {
    return requset({
        url: '/xcx/elmg/fklx',
        data
    })
}
export const tjfkxx = (data) => {
    return requset({
        url: '/xcx/elmg/tjfkxx',
        data
    })
}
export const btlb = (data) => {
    return requset({
        url: '/xcx/elmg/btlb',
        data
    })
}
export const btlxlb = (data) => {
    return requset({
        url: '/xcx/elmg/btlxlb',
        data
    })
}
// 获取商家信息详细信息
export const sjDetail = () => {
    return requset({
        url: '/xcx/tczq/sj/detail?openid=' + wx.getStorageSync('thirdSession').openid,
        method: 'post'
    })
}
export const sjshopDetail = () => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/detail?openid=' + (bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid),
        method: 'post'
    })
}
// 修改商家信息
export const updateDetail = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/updateDetail',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
        method: 'post'
    })
}
// 添加订单
export const addOffOnline = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/addOffOnline',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// /xcx/tczq/sj/OffOnlineList
// 线下下单列表
export const OffOnlineList = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/OffOnlineList?openid=' + (bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid),
        data: {
            ...data,
            // openid: wx.getStorageSync('thirdSession').openid,
        },
    })
}
// 新增商品
export const addGoods = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/addGoods',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
        method: 'post'
    })
}
// 商品列表
export const GoodsList = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/GoodsList',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// 商品详情
export const GoodsDetail = (data) => {
    return requset({
        url: '/xcx/tczq/sj/GoodsDetail',
        data: {
            ...data,
        },
    })
}
// 修改该商品
export const updateGoods = (data) => {
    return requset({
        url: '/xcx/tczq/sj/updateGoods',
        data: {
            ...data,
        },
        method: 'post'
    })
}
// 删除商品
export const deleteGoods = (data) => {
    return requset({
        url: '/xcx/tczq/sj/deleteGoods',
        data: {
            ...data,
        },
    })
}
// 新增活动
export const addActivity = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/addActivity',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
        method: 'post'
    })
}
// 活动商品列表
export const activityList = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/activityList',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// 修改活动
export const updateActivity = (data) => {
    return requset({
        url: '/xcx/tczq/sj/updateActivity',
        data: {
            ...data,
        },
        method: 'post'
    })
}
// 删除活动
export const deleteActivity = (data) => {
    return requset({
        url: '/xcx/tczq/sj/deleteActivity',
        data: {
            ...data,
        },
    })
}
// 活动商品详情
export const activityDetail = (data) => {
    return requset({
        url: '/xcx/tczq/sj/activityDetail',
        data: {
            ...data,
        },
    })
}
// 订单列表
export const orderList = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/orderList',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// 修改订单
export const updateOrder = (data) => {
    return requset({
        url: '/xcx/tczq/sj/updateOrder',
        data: {
            ...data,
        },
        method: 'post'
    })
}
// 订单详情
export const orderDetail = (data) => {
    return requset({
        url: '/xcx/tczq/sj/orderDetail',
        data: {
            ...data,
        },
    })
}
// 评价列表
export const pjList = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/pjList',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// 店铺统计
export const count1 = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/count1',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// 店铺统计
export const hdsplb = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/hdsplb',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// 待办事项
export const dbsx = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/dbsx',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// 新增沉浸看货
export const xzcjkh = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/xzcjkh',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
        method: 'post'
    })
}
// 新增沉浸看货
export const khlb = (data) => {
  const bq = wx.getStorageSync('userInfo')?.bq
    return requset({
        url: '/xcx/tczq/sj/khlb',
        data: {
            ...data,
            openid: bq=='店长'?wx.getStorageSync('thirdSession').openid:wx.getStorageSync('thirdSession').dzopenid,
        },
    })
}
// 修改看货
export const xgkh = (data) => {
    return requset({
        url: '/xcx/tczq/sj/xgkh',
        data: {
            ...data,
        },
        method: 'post'
    })
}
// 看货详情
export const khxq = (data) => {
    return requset({
        url: '/xcx/tczq/sj/khxq',
        data: {
            ...data,
        },
    })
}
// 删除看货
export const deleteKh = (data) => {
    return requset({
        url: '/xcx/tczq/sj/deleteKh',
        data: {
            ...data,
        },
    })
}
// 获取分享二维码
export const getEwm = (data) => {
    return requset({
        url: '/xcx/tczq/getEwm',
        data: {
            ...data,
        },
    })
}
export const goodsType = (data) => {
    return requset({
        url: '/xcx/tczq/goodsType',
        method:'post',
        data: {
            ...data,
        },
    })
}
export const kdzlsqxq = (data) => {
    return requset({
        url: '/xcx/tczq/kdzlsqxq',
        data,
    })
}
export const getStoreOpenId = (data) => {
    return requset({
        url: '/api/elmg/yggl/getStoreOpenId',
        data
    })
}
export const uploadFile = 'https://szsn.lx.gov.cn/bsApi/common/upload'
export const getImgSize = 'https://szsn.lx.gov.cn/bsApi/common/getImgSize'
// export const uploadFile = 'http://172.16.2.78:89/bs/common/upload'
export const img = 'https://szsn.lx.gov.cn/bs'
// export const img = 'http://172.16.2.78:89/bs'