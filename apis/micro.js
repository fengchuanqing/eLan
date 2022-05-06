import { requset } from "../utils/request.js"
export const url='https://szsn.lx.gov.cn/bsApi'
export const img='https://szsn.lx.gov.cn'
export const img2='https://szsn.lx.gov.cn/elmgServer'

export const sglx=(data)=>{
	return requset({
    url:'/xcx/sglx',
    data
	})
}
export const getJrjq=()=>{
	return requset({
    url:'/xcx/getJrjq',
    
	})
}

export const bdtklb=(data)=>{
	return requset({
    url:'/xcx/bdtklb',
    data
	})
}
export const bdtkxq=(data)=>{
	return requset({
    url:'/xcx/bdtkxq',
    data
	})
}
export const getjqlx=(data)=>{
	return requset({
    url:'/xcx/getjqlx',
    data
	})
}
export const getjqlb=(data)=>{
	return requset({
    url:'/xcx/getjqlb',
    data
	})
}
export const getjqxq=(data)=>{
	return requset({
    url:'/xcx/getjqxq',
    data
	})
}
export const getczlx=(data)=>{
	return requset({
    url:'/xcx/getczlx',
    data
	})
}
export const getyulslb=(data)=>{
	return requset({
    url:'/xcx/getyulslb',
    data
	})
}
export const lysmczjl=(data)=>{
	return requset({
    url:'/xcx/elmg/lysmczjl',
    data
	})
}
export const getDwByLx='/bs/api/elmg/ymfqy/getDwByLx'
export const zjzxlist='/technologyServer/zlb/zlbZjzx/zjzxlist?pageNum=1'