import {
  requset
} from "../utils/request.js"
export const qylb = (data) => {
  return requset({
      url: '/gylz/qylb',
      data
  })
}
export const tdlxlb = (data) => {
  return requset({
      url: '/gylz/tdlxlb',
      data
  })
}
export const nyydlb = (data) => {
  return requset({
      url: '/gylz/nyydlb',
      data
  })
}
export const lzxq = (data) => {
  return requset({
      url: '/gylz/lzxq',
      data
  })
}
export const wdfbgy = (data) => {
  return requset({
      url: '/gylz/wdfbgy',
      data,
      method:'post'
  })
}
export const wdgylb = (data) => {
  return requset({
      url: '/gylz/wdgylb',
      data
  })
}
export const gybjxq = (data) => {
  return requset({
      url: '/gylz/gybjxq',
      data
  })
}
export const wdgycxbj = (data) => {
  return requset({
      url: '/gylz/wdgycxbj',
      data,
      method:'post'
  })
}
export const wdhyqrlz = (data) => {
  return requset({
      url: '/gylz/wdhyqrlz',
      data
  })
}
export const gyxq = (data) => {
  return requset({
      url: '/gylz/gyxq',
      data
  })
}
export const wdgysc = (data) => {
  return requset({
      url: '/gylz/wdgysc',
      data
  })
}
export const wdfbxq = (data) => {
  return requset({
      url: '/gylz/wdfbxq',
      data,
      method:'post'
  })
}
export const cxbjxq = (data) => {
  return requset({
      url: '/gylz/cxbjxq',
      data,
      method:'post'
  })
}
export const xqbjxq = (data) => {
  return requset({
      url: '/gylz/xqbjxq',
      data
  })
}
export const xqxq = (data) => {
  return requset({
      url: '/gylz/xqxq',
      data
  })
}
export const xqqr = (data) => {
  return requset({
      url: '/gylz/xqqr',
      data
  })
}
export const getAllType = (data) => {
  return requset({
      url: '/api/elmg/zt/getAllType',
      data
  })
}
export const getAllTown = (data) => {
  return requset({
      url: '/api/elmg/zt/getAllTown',
      data
  })
}
export const getAllCountry = (data) => {
  return requset({
      url: '/api/elmg/zt/getAllCountry',
      data
  })
}
export const getZdcylx = (data) => {
  return requset({
      url: '/api/elmg/zt/getZdcylx',
      data
  })
}
export const getVarieties = (data) => {
  return requset({
      url: '/api/elmg/zt/getVarieties',
      data
  })
}
export const saveZtlx = (data) => {
  return requset({
      url: '/xcx/ztlx',
      data,
      method:'post'
  })
}
export const ckzt = (data) => {
  return requset({
    url: '/xcx/ckzt',
    method: 'get',
    data
  })
}
export const xgzt = (data) => {
  return requset({
    url: '/xcx/xgzt',
    method: 'post',
    data
  })
}

export const domain = 'https://szsn.lx.gov.cn/bs'