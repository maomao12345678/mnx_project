<template>
	<!--我的信息列表-->
	<!-- <view class="black"></view> -->
	<view class="MessageList-father">
		<MessageList  
			v-for="(item, index) in nameList"
			:key="index"
			:info="item"
			:index="index"
			:image="image"
			:myName="myName"
			:phone="phone"
			:describe="myDescribe"
			:address="address"
			class="MessageList"
			@clickMe="clickMe"
			@click="this.$emit('changeImage', image)"
		/>
	</view>
	
</template>

<script>
	//导入获取云函数的数据
	import apiRequest from '../../common/request.js'
	//名字转换
	import {
		myFilter
	} from '../../common/filter.js'
	import MessageList from "../../components/MessageList/MessageList.vue"
	import {uploadImage} from '../../common/oss.js'
	export default {
		name: "BasicMessage",
		components:{
			MessageList
		},
		// props: ['MyImage'],
		data() {
			return {
				nameList:[{
						name:'头像',

					}, {
						name:'用户名',

					}, {
						name:'电话',
						
					}, {
						name:'个人简介',

					}, {
						name:'地址',
					}],
					top: 0,
					image: '',
					myName: '',
					phone: '',
					myDescribe: '',
					address: ''
			}
		},
		methods: {
			onShow(){
				let _this = this
				//获取名字缓存
				uni.getStorage({
					key: 'nickName',
					success: function (res) {
						// console.log(res.data);
						_this.myName = res.data
					}
				});
				//获取头像缓存
				uni.getStorage({
					key: 'avatarUrl',
					success: function (res) {
						// console.log(res.data);
						_this.image = res.data
					}
				});
				//获取描述缓存
				uni.getStorage({
					key: 'describe',
					success: function (res) {
						// console.log(res.data);
						_this.myDescribe = res.data
					}
				});
			},
			onHide(){
				// 获取机械分类列表
				// apiRequest('insertUserInfo')
				// 	.then(data => {
				// 		this.fullMachines = machineModulesFilter(data.data)
				// 		// 初始化机械分类
				// 		this.initModuleList()
				// 	})
			},
			onReady () {
				let _this = this
				//获取名字缓存
				uni.getStorage({
					key: 'nickName',
					success: function (res) {
						// console.log(res.data);
						_this.myName = res.data
					}
				});
				//获取头像缓存
				uni.getStorage({
					key: 'avatarUrl',
					success: function (res) {
						// console.log(res.data);
						_this.image = res.data
					}
				});
				//获取描述缓存
				uni.getStorage({
					key: 'describe',
					success: function (res) {
						// console.log(res.data);
						_this.myDescribe = res.data
						if(_this.myDescribe==''){
							_this.myDescribe='这个人很懒什么都没写'
							uni.setStorage({
								key: 'describe',
								data: '这个人很懒什么都没写',
								success: function(res) {
									console.log('默认描述填写成功')
								}
							});
						}
					}
				});
				uni.getStorage({
					key: 'address',
					success: function (res) {
						// console.log(res.data);
						// _this.address = res.data
						// console.log('地址获取成功')
						// console.log(res.data);
						if(res.data==""){
							// console.log('地址为空')
							apiRequest('getUserInfo')
								.then(data => {
									_this.address = data.data[0].address
									uni.setStorage({
										key: 'address',
										data: data.data[0].address
									})
								})
							
						}else{
							//电话不为空
							// console.log('地址不为空')
							// console.log(res.data)
							_this.address = res.data
						}
					}
				});
				uni.getStorage({
					key: 'phoneNumber',
					success: function (res) {
						// console.log('电话获取成功')
						// console.log(res.data);
						if(res.data==""){
							// console.log('电话为空')
							apiRequest('getUserInfo')
								.then(data => {
									_this.phone = data.data[0].phone
									uni.setStorage({
										key: 'phoneNumber',
										data: data.data[0].phone
									})
								})
							
						}else{
							//电话不为空
							// console.log('电话不为空')
							// console.log(res.data)
							_this.phone = res.data
						}
						
					},
					fail: function(res){
						// console.log('电话获取失败')
						console.log(res.data)
					}
				});
			},
			clickMe(index){
				if(index==0){
					let _this = this
					wx.chooseImage({
						count: 1,
						sizeType: ['original', 'compressed'],
						sourceType: ['album', 'camera'],
						success: res => {
							let filePath = res.tempFilePaths;
							console.log(res.tempFilePaths)
							for(let path of filePath){
								uploadImage({
									type: 'user',
									filePath: path
								})
									.then(res =>{
										console.log(res)
										_this.image = res
										//存值(如果保存成功就传值)
										uni.setStorage({
											key: 'avatarUrl',
											data: res,
											success: function(res) {
												console.log('头像更新成功')
											}
										});
										//网页中更改头像
										apiRequest('updateUserInfo', {
											headimage: _this.image
										})
											.then(data => {
												console.log(data)
											})
									})
							}		
						}
					})
				}else if(index==1){
					let _this = this
					var name = _this.myName
					var flag = false
					//修改用户名
					uni.showModal({
						title: '修改用户名',
						editable: true,
						content: _this.myName,
						showCancel: true,
						placeholderText: "输入4-10位(中英文、数字、下划线)",
						success: function (res) {
							// console.log(2313231312)
							if (res.confirm) {
								flag=true
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
								flag=false
								// uni.showToast({
								// 	title: '取消成功',
								// 	duration: 2000,
								// 	icon: 'success'
								// });
							}
						},
						fail: function (err) {
							console.log(err)
						},
						complete: (data)=> {
							//用户名正则，4到10位（中英文，数字，下划线）
							if(flag==true){
								if(/[a-zA-Z0-9_\u4eOO-\u9fa5]{1,10}$/.test(data.content)){
									uni.setStorage({
										key: 'nickName',
										data: data.content,
										success: function(res) {
											console.log('修改用户名成功')
											uni.showToast({
												title: '修改成功',
												duration: 2000,
												icon: 'success'
											});
										}
									});
									console.log(data)
									_this.myName = data.content
									apiRequest('updateUserInfo', {
										username: _this.myName
									})
										.then(data => {
											console.log(data)
										})
								}else{
									uni.showToast({
										title: '非法用户名',
										duration: 2000,
										icon: 'error'
									});
								}
							}
						}
					});
				}else if(index==2){
					//输入正确的11位合法电话号码
					let _this = this
					var flag = false
					uni.showModal({
						title: '修改电话号码',
						editable: true,
						content: _this.phone,
						showCancel: true,
						placeholderText: "输入11位合法电话号码",
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								flag = true
							} else if (res.cancel) {
								flag = false
								console.log('用户点击取消');
								// uni.showToast({
								// 	title: '取消成功',
								// 	duration: 2000,
								// 	icon: 'success'
								// });
							}
						},
						fail: (err) => {
							console.log(err)
						},
						complete: (data)=> {
							if(flag==true){
								if(/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/.test(data.content)){
									_this.phone = data.content
									uni.setStorage({
										key: 'phoneNumber',
										data: data.content,
										success: function(res) {
											console.log('修改电话号码成功')
											uni.showToast({
												title: '修改成功',
												duration: 2000,
												icon: 'success'
											});
											apiRequest('updateUserInfo', {
												phone: _this.phone
											})
												.then(data => {
													console.log(data)
												})
										}
									});
								}else{
									uni.showToast({
										title: '非法电话号码',
										duration: 2000,
										icon: 'error'
									});
								}
							}
						}
					});
				}else if(index==3){
					//输入15位以内的个人简介
					let _this = this
					flag = false
					uni.showModal({
						title: '修改个人简介',
						editable: true,
						showCancel: true,
						content: _this.myDescribe,
						placeholderText: "输入15位以内的个人简介",
						success: function (res) {
							if (res.confirm) {
								flag=true
								console.log('用户点击确定');
							} else if (res.cancel) {
								flag=false
								console.log('用户点击取消');
								// uni.showToast({
								// 	title: '取消成功',
								// 	duration: 2000,
								// 	icon: 'success'
								// });
							}
						},
						fail: (err) => {
							console.log(err)
						},
						complete: (data)=> {
							if(flag==true){
								if(/[a-zA-Z0-9,.\u4eOO-\u9fa5]{0,20}$/.test(data.content)){
									_this.myDescribe = data.content
									uni.setStorage({
										key: 'describe',
										data: data.content,
										success: function(res) {
											console.log('修改个人简介成功')
											uni.showToast({
												title: '保存成功',
												duration: 2000,
												icon: 'success'
											});
											apiRequest('updateUserInfo', {
												introduction: _this.myDescribe
											})
												.then(data => {
													console.log(data)
												})
										}
									});
								}else{
									uni.showToast({
										title: '个人简介过长',
										duration: 2000,
										icon: 'error'
									});
								}
							}
						}
					});
				}else if(index==4){
					uni.getLocation({
					    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					    success:(res)=>{
							let _this=this
					        const latitude = res.latitude;
					        const longitude = res.longitude;
					        uni.request({
								header:{
									"Content-Type": "application/text"
								},
								//注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
								url:'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location='+res.longitude+','+res.latitude+'&key=280802ed0116fef931dbcf5e7e9278d7&radius=1000&extensions=all',
								success(re) {
									console.log(re)
									if(re.statusCode===200){
										var province = re.data.regeocode.addressComponent.province
										var city = re.data.regeocode.addressComponent.city
										var district = re.data.regeocode.addressComponent.district
										var area = province + city + district
										uni.setStorage({
											key: 'address',
											data: area,
										})
										_this.address = area
										apiRequest('updateUserInfo', {
											address: _this.address
										})
											.then(data => {
												console.log(data)
											})
										uni.showToast({
											title: '获取成功',
											duration: 2000,
											icon: 'success'
										});
									}else{
										console.log("获取信息失败，请重试！")
										uni.showToast({
											title: '获取信息失败',
											duration: 2000,
											icon: 'error'
										});
									}
								},
								fail(re){
									console.log(re)
								}
							});
					    }
					});
				}
			},
		}
	}
</script>

<style lang="stylus">
@import './basicMessage';
</style>
