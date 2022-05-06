import {
    requset
} from "../utils/request.js"
export const gygjsglx = (data) => {
    return requset({
        url: '/xcx/gygjsglx',
        data
    })
}
// 果园管家_安全用药
export const gygjaqyy = (data) => {
    return requset({
        url: '/xcx/gygjaqyy',
        data
    })
}
// 果园管家_周期列表
export const gygjaqyyzqlb = (data) => {
    return requset({
        url: '/xcx/gygjaqyyzqlb',
        data
    })
}
// 虫情识别
export const cqsb = (data) => {
    return requset({
        url: '/xcx/gygj/cqsb',
        data
    })
}
// 推荐用药
export const tjsf = (data) => {
    return requset({
        url: '/xcx/gygj/tjsf',
        data
    })
}
export const domain = 'https://szsn.lx.gov.cn'
// export const domain = 'http://172.16.2.50:89/'