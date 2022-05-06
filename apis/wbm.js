import {
    requset
} from "../utils/request.js"
// 微保姆_类型
export const wbmlx = (data) => {
    return requset({
        url: '/xcx/wbmlx',
        data
    })
}
// 微保姆_列表农资店//快递点
export const wbm = (data) => {
    return requset({
        url: '/xcx/wbm',
        data
    })
}
// 微保姆_保鲜库
export const wbmbxk = (data) => {
    return requset({
        method: 'post',
        url: '/xcx/wbmbxk?pageNum=' + data,
    })
}
// 微保姆_服务队列表
export const fwd = (data) => {
    return requset({
        method: 'post',
        url: '/xcx/fwd?pageNum=' + data,
    })
}

// 微保姆_服务队列表不分页
export const fwdlb = (data) => {
    return requset({
        method: 'post',
        url: '/xcx/fwdlb',
    })
}
// 微保姆_服务队_用户信息查询
export const fwdyhxxcx = (data) => {
    return requset({
        method: 'post',
        url: '/xcx/fwdyhxxcx?openid=' + data,
    })
}
// 微保姆_服务队_用户信息修改
export const fwdyhxxxg = (data) => {
    console.log(data);
    return requset({
        method: 'post',
        data,
        url: '/xcx/fwdyhxxxg',
    })
}
// 微保姆_服务队_用户信息新增
export const fwdyhxxxz = (data) => {
    return requset({
        method: 'post',
        data,
        url: '/xcx/fwdyhxxxz',
    })
}
// 微保姆_服务队_查询用户是否已经评价
export const fwdyhsfpj = (data) => {
    return requset({
        // method: 'post',
        data,
        url: '/xcx/fwdyhsfpj',
    })
}
// 微保姆_服务队_用户评价
export const fwdyhpj = (data) => {
    return requset({
        method: 'post',
        data,
        url: '/xcx/fwdyhpj',
    })
}
export const domain = "https://szsn.lx.gov.cn"