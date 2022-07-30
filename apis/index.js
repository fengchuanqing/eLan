import {
  requset
} from "../utils/request.js"

export const MxxxXxcs = (data) => {
  return requset({
    url: '/xcx/MxxxXxcs',
    data
  })
}

export const MxxxTp = (data) => {
  return requset({
    url: '/xcx/MxxxTp',
    data
  })
}

export const MxxxXxcs2 = (data) => {
  return requset({
    url: '/xcx/MxxxXxcs2',
    data
  })
}
export const AllNsczlx = (data) => {
  return requset({
    url: '/xcx/AllNsczlx',
    data
  })
}
export const MxxxXxrq = (data) => {
  return requset({
    url: '/xcx/MxxxXxrq',
    data
  })
}
export const MxxxTpLB = (data) => {
  return requset({
    url: '/xcx/MxxxTpLB',
    data
  })
}
export const addNsjl = (data) => {
  return requset({
    url: '/xcx/addNsjl',
    data,
    method: 'post'
  })
}
export const addYhdk = (data) => {
  return requset({
    url: '/xcx/addYhdk',
    data,
    method: 'post'
  })
}
export const XlycXlbblb = (data) => {
  return requset({
    url: '/xcx/XlycXlbblb',
    data,
  })
}
export const updateXlbb = (data) => {
  return requset({
    url: '/xcx/updateXlbb',
    data,
    method: 'post'
  })
}
export const saveXcxDiscernUser = (data) => {
  return requset({
    url: '/xcx/saveXcxDiscernUser',
    data,
    method: 'post'
  })
}
export const xldt = (data) => {
  return requset({
    url: '/xcx/xldt',
    data
  })
}
export const fhwIndex = (data) => {
  return requset({
    url: '/xcx/fhwIndex',
    data
  })
}
export const indexPageBanner = (data) => {
  return requset({
    url: '/xcx/indexPageBanner',
    data
  })
}
export const getInfoByOpenId = (data) => {
  return requset({
    url: '/xcx/getInfoByOpenId',
    data
  })
}
export const getCodeByMobile = (data) => {
  return requset({
    url: '/xcx/getCodeByMobile',
    data
  })
}
export const checkCodeByMobile = (data) => {
  return requset({
    url: '/xcx/checkCodeByMobile',
    data
  })
}
export const updateMobileByOpenid = (data) => {
  return requset({
    url: '/xcx/updateMobileByOpenid',
    data
  })
}
export const getXcxUserInfo = (data) => {
  return requset({
    url: '/xcx/elmg/getXcxUserInfo',
    data
  })
}
export const sfhxx = (data) => {
  return requset({
    url: '/xcx/sfhxx',
    data
  })
}
export const XlycXlcs = (data) => {
  return requset({
    url: '/xcx/XlycXlcs',
    data
  })
}
export const Qxzxx = (data) => {
  return requset({
    url: '/xcx/Qxzxx',
    data
  })
}
export const updateXlcsDz = (data) => {
  return requset({
    url: '/xcx/updateXlcsDz',
    data,
    method: 'post'
  })
}
export const sfhList = (data) => {
  return requset({
    url: '/xcx/sfhxx/sfhList',
    data
  })
}
export const sfhDataList = (data) => {
  return requset({
    url: '/xcx/sfhxx/sfhDataList',
    data
  })
}
export const getXlbWeekData = (data) => {
  return requset({
    url: '/xcx/sfhxx/getXlbWeekData',
    data
  })
}
export const zhfxData = (data) => {
  return requset({
    url: '/xcx/sfhxx/zhfxData',
    data
  })
}
export const getXlbZhfxData = (data) => {
  return requset({
    url: '/xcx/sfhxx/getXlbZhfxData',
    data
  })
}
export const getXlbDataCompare = (data) => {
  return requset({
    url: '/xcx/sfhxx/getXlbDataCompare',
    data
  })
}
export const dataCompare = (data) => {
  return requset({
    url: '/xcx/sfhxx/dataCompare',
    data
  })
}
export const Cqjczxx = (data) => {
  return requset({
    url: '/xcx/Cqjczxx',
    data
  })
}
export const hqdqsjzq = (data) => {
  return requset({
    url: '/xcx/hqdqsjzq',
    method: 'post',
    data
  })
}
export const hqdqzqcx = (data) => {
  return requset({
    url: '/xcx/hqdqzqcx?id=' + data,
    method: 'post',
  })
}
export const xlbbzxb = (data) => {
  return requset({
    url: '/xcx/xlbbzxb',
    data
  })
}
export const Zjdqxz = (data) => {
  return requset({
    url: '/xcx/Zjdqxz',
    data
  })
}
export const gxykxx = (data) => {
  return requset({
    url: '/xcx/gxykxx',
    data
  })
}
export const getOpenid = (data) => {
  return requset({
    url: '/xcx/getOpenid',
    data
  })
}
export const xmsb = (data) => {
  return requset({
    url: '/xcx/xmsb',
    data
  })
}
export const xldtxx = (data) => {
  return requset({
    url: '/xcx/xldtxx',
    data
  })
}
export const wdxxxgyd = (data) => {
  return requset({
    url: '/xcx/wdxx',
    data
  })
}
export const wdxxwdsl = (data) => {
  return requset({
    url: '/xcx/wdxxwdsl',
    data
  })
}
export const getNsjl = (data) => {
  return requset({
    url: '/xcx/getNsjl?openid=' + data,
    method: 'post',
  })
}
export const getWsblb = (data) => {
  return requset({
    url: '/xcx/wsblb?sfzhm=' + data,
    method: 'get',
  })
}
export const getMobileByCode = (data) => {
  return requset({
    url: '/xcx/getMobileByCode',
    method: 'get',
    data
  })
}
export const domain = 'https://szsn.lx.gov.cn'
// export const domain = 'http://172.16.2.50:89'

// 上传
export const uploadFile = domain + '/bsAPI/common/upload'

export const idUpload = 'https://szsn.lx.gov.cn/bsAPI/xcx/uploadIDCardImgAndDiscernNumber'
// export const idUpload = 'http://172.16.2.50:89/bs/xcx/uploadIDCardImgAndDiscernNumber'