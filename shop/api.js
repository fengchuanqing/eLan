import {
  requset
} from "../utils/request.js"

export const zwlb = (data) => {
  return requset({
      url: '/api/elmg/yggl/zwlb',
      data
  })
}
export const yglb = (data) => {
  return requset({
      url: '/api/elmg/yggl/yglb',
      data
  })
}
export const xyjyzt = (data) => {
  return requset({
      url: '/api/elmg/yggl/xyjyzt',
      data
  })
}
export const scyg = (data) => {
  return requset({
      url: '/api/elmg/yggl/scyg',
      data
  })
}
export const ygxq = (data) => {
  return requset({
      url: '/api/elmg/yggl/ygxq',
      data
  })
}
export const xzyg = (data) => {
  return requset({
      url: '/api/elmg/yggl/xzyg',
      method:'post',
      data,
      headType:'application/x-www-form-urlencoded'
  })
}
export const xgyg = (data) => {
  return requset({
      url: '/api/elmg/yggl/xgyg',
      data
  })
}
export const ztdlb = (data) => {
  return requset({
      url: '/xcx/tczq/ztdlb',
      data
  })
}
export const ztdxq = (data) => {
  return requset({
      url: '/xcx/tczq/ztdxq',
      data
  })
}
export const scztd = (data) => {
  return requset({
      url: '/xcx/tczq/scztd',
      data
  })
}
export const tjztd = (data) => {
  return requset({
      url: '/xcx/tczq/tjztd',
      method:'post',
      data
  })
}



export const img = 'https://szsn.lx.gov.cn/bs'
export const uploadFile = 'https://szsn.lx.gov.cn/bsApi/common/upload'