import {
    requset
} from "../utils/request.js"
export const img = 'https://szsn.lx.gov.cn/bs'  
export const img2 = 'https://szsn.lx.gov.cn'  
// export const img = 'http://172.16.2.78:89/bs'
export const upload='https://szsn.lx.gov.cn/bs/common/upload'
// export const upload='http://172.16.2.78:89/bs/common/upload'

export const Jxsjlbt = (data) => {
    return requset({
        url: '/xcx/tczq/Jxsjlbt',
        data
    })
}
export const Jxsjlb = (data) => {
    return requset({
        url: '/xcx/tczq/Jxsjlb',
        data
    })
}


export const Rxtscplbt = (data) => {
    return requset({
        url: '/xcx/tczq/Rxtscplbt',
        data
    })
}
export const Rxtscplb = (data) => {
    return requset({
        url: '/xcx/tczq/Rxtscplb',
        data
    })
}
export const Spxq = (data) => {
    return requset({
        url: '/xcx/tczq/Spxq',
        data
    })
}
export const addOrder = (data) => {
    return requset({
        url: '/xcx/tczq/addOrder',
        method: 'post',
        data
    })
}
export const addressList = (data) => {
    return requset({
        url: '/xcx/addressList',
        data
    })
}
export const Hdzq = (data) => {
    return requset({
        url: '/xcx/tczq/Hdzq',
        data
    })
}
export const Dpxq = (data) => {
    return requset({
        url: '/xcx/tczq/Dpxq',
        data
    })
}
export const Hdxq = (data) => {
    return requset({
        url: '/xcx/tczq/Hdxq',
        data
    })
}
export const Sjgzm= (data) => {
    return requset({
        url: '/xcx/tczq/Sjgzm',
        data
    })
}
export const Zzlll= (id) => {
    return requset({
        url: `/xcx/tczq/Zzlll?id=${id}`,
        method:'post',
        
    })
}
export const Zzfxs= (id) => {
    return requset({
        url: `/xcx/tczq/Zzfxs?id=${id}`,
        method:'post',
    })
}
export const Xpcxlb= (data) => {
    return requset({
        url: '/xcx/tczq/Xpcxlb',
        data
    })
}
export const Yhddlb= (data) => {
    return requset({
        url: '/xcx/tczq/Yhddlb',
        data
    })
}
export const getEwm= (data) => {
    return requset({
        url: '/xcx/tczq/getEwm',
        data
    })
}
export const updateOrder= (data) => {
    return requset({
        url: '/xcx/tczq/sj/updateOrder',
        method:'post',
        data
    })
}
export const Syss= (params) => {
    return requset({
        url: '/xcx/tczq/Syss?temp='+params,
        method:'post',
    })
}
export const Gglb= (params) => {
    return requset({
        url: '/xcx/tczq/Gglb'
    
    })
}
export const yhddxq= (params) => {
    return requset({
        url: '/xcx/tczq/yhddxq'
    
    })
}
export const addShopCar= (data) => {
    return requset({
        url: '/xcx/tczq/addShopCar',
        method:'post',
        data
    })
}
export const ShopCar= (data) => {
    return requset({
        url: '/xcx/tczq/ShopCar',
        method:'get',
        data
    })
}
export const updateShopCar= (data) => {
    return requset({
        url: '/xcx/tczq/updateShopCar',
        method:'post',
        data
    })
}
export const ShopCarOrder= (data) => {
    return requset({
        url: '/xcx/tczq/ShopCarOrder',
        method:'post',
        data
    })
}
export const deleteShopCar= (data) => {
    return requset({
        url: '/xcx/tczq/deleteShopCar',
        method:'post',
        data
    })
}
export const Xpcx= (data) => {
    return requset({
        url: '/xcx/tczq/Xpcx',
        data
    })
}
export const goodsType= (data) => {
    return requset({
        url: '/xcx/tczq/goodsType',
        method:'post',
        data
    })
}
export const Syssgb= (data) => {
    return requset({
        url: '/xcx/tczq/Syssgb',
        method:'get',
        data
    })
}

export const ztdlb = (data) => {
  return requset({
      url: '/xcx/tczq/ztdlb',
      data
  })
}
export const xdztdlb = (data) => {
  return requset({
      url: '/xcx/tczq/xdztdlb',
      data
  })
}
export const gwcxdztdlb = (data) => {
  return requset({
      url: '/xcx/tczq/gwcxdztdlb',
      method:'post',
      data
  })
}



