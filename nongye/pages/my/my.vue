<template>
	<view class='my'>
		<!--图片，用户名，电话-->
		<view class='profile flex-center' :style="'padding-top:'+top+'px'">
			<view class="loadView flex-center" v-if="userInformation.loadState==true">
				<!--头像-->
				<view class='profile-photo flex-center' @click="clickToMyMessage">
					<!-- <image class="photo" src="../../static/image/profile-photo.jpeg"></image> -->
					<image class="photo" :src="userInformation.avatarUrl"></image>
					{{userInformation.username}}
				</view>
				<!--用户名和电话-->
				<!-- <view class='profile-name-phone'>
					<view class='name'>
						用户名：{{userInformation.username}}
					</view>
					<view class='phone'>
						个人简介：{{userInformation.describe}}
					</view>
				</view> -->
			</view>
			<!--未登陆的时候显示的部分-->
			<view class="unloadView" v-if="userInformation.loadState==false">
				<!--未登陆头像-->
				<view class="unloadPhoto iconfont icon-weidenglutouxiang"></view>
				<view class="unloadTitle flex-center">
					<!-- 未登陆 -->
				</view>
				<view class="unloadInBtn flex-center" lang="zh_CN" type='primary' @click="getUserProfile">
					<view>登录</view>
				</view>
			</view>
			
			<view class="profile-func flex-between" v-if="userInformation.loadState">
				<view
					v-for="item, index in funcList"
					:key="index"
					@click="skipPage(index)"
					class="flex-center func-item">
					<view :class="item.icon" class="iconfont"></view>
					<view class="">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="black"></view> -->
		<!--我的-列表 info,index是与子控件传输数据的接口-->
		<view class="MyList-father" v-if="userInformation.loadState==true">
			<MyList  
				v-for="(item, index) in nameList"
				:key="index"
				:info="item"
				:index="index"
				class="Mylist-item"
				@clickMe="clickMe"
			/>
		</view>
		<!-- <view class="login_btn">
			<button class="lb_btn" type="primary" open-type="getPhoneNumber"
				bindgetphonenumber="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
		</view> -->
	</view>
</template>

<script>
	//导入获取云函数的数据
	import apiRequest from '../../common/request.js'
	
	//名字转换
	import {
		myFilter
	} from '../../common/filter.js'
	
	//这里不要忘记倒入组件
	import MyList from "../../components/MyList/MyList.vue"
	import WXBizDataCrypt from "../../common/WXBizDataCrypt.js"
	export default {
		components: {
			MyList //不要忘记这里要先声明使用的自定义组件
		},
		props: ['userinfo'],
		data() {
			return {
				nameList:[{
						name:'联系我们',
						icon:'icon-lianxiwomen'
					}, {
						name:'设置',
						icon:'icon-shezhi'
				}],
				funcList: [{
					name: '发布',
						icon:'icon-bokeyuan'
				}, {
					name: '收藏',
						icon:'icon-jushoucang'
				}, {
					name: '资料',
						icon:'icon-jibenxinxi'
				}],
				top: 0,
				loadState: false,
				unloadState: true,
				isLogin: true,
				appId: 'wx042453cfd251b117',
				secret: '36a23c019ea55b1ebbc97431b6779ddf',
				code: '',
				userData: {},
				info: '',
				userInformation: this.userinfo,
				userExample: {},
			}
		},
		watch: {
			userinfo: function (data) {
				this.userInformation = data
			}
		},
		async onReady () {
			// 获取状态栏高度
			let _this = this
			const { statusBarHeight } = wx.getSystemInfoSync()
			// 得到右上角菜单的位置尺寸
			const menuButtonObject = wx.getMenuButtonBoundingClientRect()
			const { top, height } = menuButtonObject
			this.top = top + height
			uni.getStorage({
				key:"userInfo",
				success: function(res) {
					console.log("登录了")
					_this.unloadState=false
					_this.loadState=true
					uni.getStorage({
						key: 'avatarUrl',
						success: function(res) {
							_this.userInformation.avatarUrl=res.data
						}
					});
					uni.getStorage({
						key: 'nickName',
						success: function(res) {
							_this.userInformation.username=res.data
						}
					});
					uni.getStorage({
						key: 'describe',
						success: function (res) {
							_this.userInformation.describe = res.data
						}
					});
					// console.log(_this.userExample)
				},
				fail: function(res){
					console.log("未登录")
				}
			})
			// this.userData = await apiRequest('getUserInfo')
			// if (this.userData.data.length != 0) {
			// 	// 已登陆
			// 	_this.unloadState=false
			// 	_this.loadState=true
			// }
		},
		methods: {
			mounted(){
				let _this = this
				uni.getStorage({
					key: 'nickName',
					success: function (res) {
						console.log(res.data);
						_this.userInformation.username = res.data
					}
				});
				uni.getStorage({
					key: 'avatarUrl',
					success: function (res) {
						console.log(res.data);
						_this.userInformation.avatarUrl = res.data
					}
				});
				uni.getStorage({
					key: 'describe',
					success: function (res) {
						console.log(res.data);
						_this.userInformation.describe = res.data
					}
				});
			},
			getPhoneNumber(e) {
				let appid = "wx042453cfd251b117" //需替换
				let secret = "36a23c019ea55b1ebbc97431b6779ddf"  //需替换
				//调用 wx.login 接口,获取code
				wx.login({
					provider: 'weixin',
					success: res => {
						let url = "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+res.code+"&grant_type=authorization_code"
						//用 code 换取 session 和 openId
						uni.request({
							url: url, // 请求路径
							success: res => { //成功res返回openid，session_key
								console.log("成功获取request")
								console.log(res)
								console.log(e.detail.errMsg)
								if(e.detail.errMsg == "getPhoneNumber:ok"){
									console.log("用户点击了接受")
									console.log(e.detail);
									let encryptedData = e.detail.encryptedData
									let errMsg = e.detail.errMsg
									let iv = e.detail.iv        
								}else{
									console.log("用户点击了拒绝")
								}   
								//解密用户信息
								let sessionKey = res.data.session_key
								let openId = res.data.openid
								let pc = new WXBizDataCrypt(appid, sessionKey)
								let data = pc.decryptData(encryptedData, iv)
								// //data就是最终解密的用户信息 
								// countryCode: "86"  区号
								// phoneNumber: "15634123456"  用户绑定的手机号（国外手机号会有区号）
								// purePhoneNumber: "15634123456"  没有区号的手机号
								// watermark:
								//         appid: "wxce185cd1da123456"
								//         timestamp: 1607906868
							},
							fail: err => {
								console.log(err)
							}
						})
					}
				})
			},
			clickToMyMessage(){
				uni.navigateTo({
					url:"../../pages-my/myMessage/myMessage"
				})
			},
			getUserProfile() { 
				let _this = this
				// let userData = await apiRequest('getUserInfo')
				// if (this.userData.data.length != 0) return
				uni.getUserProfile({
					desc:"用于完善用户信息",
					success: (res) => {
						console.log(res)
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
											_this.userInformation.avatarUrl = data.data[0].headimage
											_this.userInformation.username = data.data[0].username
											_this.userInformation.loadState=true
											// _this.loadState=true
											_this.userInformation.describe = data.data[0].introduction
											uni.setStorage({
												key: 'avatarUrl',
												data: data.data[0].headimage,
											});
											uni.setStorage({
												key: 'userId',
												data: data.data[0]._id,
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
											uni.setStorage({
												key: 'loadState',
												data: true
											});
											// uni.setStorage({
											// 	key: 'avatarUrl',
											// 	data: res.userInfo.avatarUrl,
											// });
										}else{
											//未注册
											_this.userInformation.avatarUrl = res.userInfo.avatarUrl
											_this.userInformation.username = res.userInfo.nickName
											_this.userInformation.describe = '这个人很懒什么都没有写'
											_this.userInformation.loadState = true
											// _this.unloadState=false
											// _this.loadState=true
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
									})
									
							},
						});
					},
					fail: (err) => {
						console.log(err)
					}  
				})		
			},
			// 跳转页面
			skipPage(index) {
				let page = [
					'../../pages-my/myBlogs/myBlogs',
					'../../pages-my/myCollect/myCollect',
					'../../pages-my/basicMessage/basicMessage'
				]
				uni.navigateTo({
					url: page[index]
				})
			},
			clickMe(index){
				if(index==0){
					//跳转到联系我们页面
					uni.navigateTo({
						url:"../../pages-my/contactUs/contactUs"
					})
				}
				if(index==1){
					//跳转到设置页面
					uni.navigateTo({
						url:"../../pages-my/setting/setting"
					})
				}
			},
		}
	}
</script>

<!--这里要先倒入styl文件-->
<!--不要忘记这里要倒入这个styl文件-->
<style lang="stylus">
@import './my.styl';
</style>
