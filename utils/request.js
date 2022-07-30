// const  domain = 'http://172.16.2.50:89'  //mdw
// const  domain = 'http://172.16.2.78:89'  //lh
// const  domain = 'http://172.16.2.31:89'  //shj
// const  domain = 'http://172.16.2.48:89'  //qyy
const domain = 'https://szsn.lx.gov.cn'
const baseUrl = domain + '/bs'
export const requset = (options) => {
	const {
		url,
		data,
		method,
		dataType,
    hideLoading,
    headType
	} = options
	//加载圈
	if (!hideLoading) {
		wx.showLoading({
			title: '加载中...'
		});
	}
	return new Promise((resolve, reject) => {
		wx.request({
			url: baseUrl + url,
			method: method || 'get',
      data,
      header: {
        'content-type': headType||'application/json'
      },
			dataType: dataType || "json",
			success: (res) => {
				if (!hideLoading) {
					wx.hideLoading();
        }
				// code判断:200成功,不等于200错误
				if (res.data.code != 200&&res.data.code != 1) {
					wx.showToast({
						title: res.data.msg||res.data.message,
						icon: 'none'
					});
					return;
				}
				// 将结果抛出
				resolve(res.data)
			},
			//请求失败
			fail: (e) => {
				if (!hideLoading) {
					wx.hideLoading();
				}
				resolve(e.data);
			}
		})
	})

}