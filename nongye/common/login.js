import apiRequest from './request.js'

export default function login() {
	return new Promise(resolve=> { 
		uni.getUserProfile({
			desc:"用于完善用户信息",
			success: (res) => {
				console.log(res)
				//登录成功
				uni.setStorage({
					key: 'userInfo',
					data: res.userInfo,
					success: function() {
						uni.setStorage({
							key: 'unloadState',
							data: false
						});
						uni.setStorage({
							key: 'loadState',
							data: true
						});
						uni.setStorage({
							key: 'avatarUrl',
							data: res.userInfo.avatarUrl,
						});
						uni.setStorage({
							key: 'nickName',
							data: res.userInfo.nickName,
						});
						uni.setStorage({
							key: 'describe',
							data: '这个人很懒什么都没有写',
						})
						uni.setStorage({
							key: 'phoneNumber',
							data: '',
						})
						uni.setStorage({
							key: 'address',
							data: '',
						})
						apiRequest('getUserInfo')
							.then(data => {
								if(data.data.length!=0){// 已经注册
									console.log('用户信息获取成功')
									uni.setStorage({
										key: 'avatarUrl',
										data: data.data[0].headimage,
									});
									uni.setStorage({
										key: 'nickName',
										data: data.data[0].username,
									});
									uni.setStorage({
										key: 'describe',
										data: data.data[0].introduction,
									})
									uni.setStorage({
										key: 'phoneNumber',
										data: data.data[0].phone,
									});
									uni.setStorage({
										key: 'address',
										data: data.data[0].address,
									})
									console.log('用户信息获取成功')
								}else{
									//未注册
									apiRequest('insertUserInfo', {
										username: res.userInfo.nickName,
										headimage: res.userInfo.avatarUrl,
										introduction: '这个人很懒什么都没有写',
										phone: "",
									})
										.then(data => {
											console.log(data)
											console.log('用户信息插入成功')
										})
								}
								return resolve(true)
							})
					},
				});
			},
			fail: (err) => {
				console.log(err)
				return resolve(false)
			}  
		})
	})
}