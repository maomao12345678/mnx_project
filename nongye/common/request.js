// 初始化
wx.cloud.init()
// import Axios from 'axios'

/**
 * 请求云函数
 * @param {String} api 请求接口名
 */
export default function apiRequest(api, params) {
	try {
		return new Promise(resolve => {
			wx.cloud.callFunction({
				name: api,
				data: params
			}).then(res => {
				resolve(res.result)
			})
		})
	} catch (err) {
		console.error(err)
	}
}