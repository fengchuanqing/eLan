import {
    requset
} from "../utils/request.js"
// 保存地块信息
export const saveMassif = (data) => {
    return requset({
        url: '/xcx/elmg/saveMassif',
        data,
        method: 'post'
    })
}
// 获取农场基地信息
export const getFarmBase = (data) => {
    return requset({
        url: '/xcx/elmg/getFarmBase',
        data: {
            ...data,
            // openid: wx.getStorageSync('thirdSession').openid || 'o6JSs5AHrQqEvKm8D5v-3g40RGkE',
            openid: wx.getStorageSync('thirdSession').openid || '',
        },
    })
}
// 搜索地块信息
export const searchMassif = (data) => {
    return requset({
        url: '/xcx/elmg/searchMassif',
        data: {
            ...data,
            // openid: wx.getStorageSync('thirdSession').openid || 'o6JSs5AHrQqEvKm8D5v-3g40RGkE',
            openid: wx.getStorageSync('thirdSession').openid || '',
        },
    })
}
// 保存农事操作记录
export const saveFarmingRecord = (data) => {
    return requset({
        url: '/xcx/elmg/saveFarmingRecord',
        data: {
            ...data,
            // openid: wx.getStorageSync('thirdSession').openid || 'o6JSs5AHrQqEvKm8D5v-3g40RGkE',
            openid: wx.getStorageSync('thirdSession').openid || '',
        },
        method: 'post'
    })
}
// 获取农事操作记录类型
export const getFarmingRecordTypes = (data) => {
    return requset({
        url: '/xcx/elmg/getFarmingRecordTypes',
        data,
    })
}
// 获取农事操作记录
export const getFarmingRecords = (data) => {
    return requset({
        url: '/xcx/elmg/getFarmingRecords',
        data: {
            ...data,
            // openid: wx.getStorageSync('thirdSession').openid || 'o6JSs5AHrQqEvKm8D5v-3g40RGkE',
            openid: wx.getStorageSync('thirdSession').openid || '',
        },
    })
}
// 我的农场-物联网设备-温室宝点位信息
export const wsbxx = (data) => {
    return requset({
        url: '/zlb/wdnc/wsbxx',
        data: {
            ...data,
        },
    })
}
// 我的农场-物联网设备-温室宝详情
export const wsbxq = (data) => {
    return requset({
        url: '/zlb/wdnc/wsbxq',
        data: {
            ...data,
        },
    })
}
// 我的农场-物联网设备
export const wlwsb = (data) => {
    return requset({
        url: '/zlb/wdnc/wlwsb',
        data: {
            ...data,
        },
    })
}
// /zlb/wdnc/jdxx
// 我的农场-物联网设备-基地信息
export const jdxx = (data) => {
    return requset({
        url: '/zlb/wdnc/jdxx',
        data: {
            ...data,
        },
    })
}
// /zlb/wdnc/cqcbd
// 我的农场-物联网设备-虫情测报灯信息
export const cqcbd = (data) => {
    return requset({
        url: '/zlb/wdnc/cqcbd',
        data: {
            ...data,
        },
    })
}
// 我的农场-物联网设备-虫情测报灯详情
export const cqcbdxq = (data) => {
    return requset({
        url: '/zlb/wdnc/cqcbdxq',
        data: {
            ...data,
        },
    })
}
// 我的农场-物联网设备全部数据  搜索
export const wlwsbz = (data) => {
    return requset({
        url: '/zlb/wdnc/wlwsbz',
        data: {
            ...data,
        },
    })
}