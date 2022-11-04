<template>
	<view class="communityBlogFather">
		<scroll-view
			class="communityBlog"
			:scroll-y="true">
			<view class="blogPhotoFather">
				<image class="blogPhoto" :src="feedMessage.feedImage" mode="aspectFill" @click="previewImage"></image>
				<!-- <swiper class="blogPhoto" :indicator-dots="true" :circular="true">
					<swiper-item
						:key="index"
						v-for="(item, index) in blog.blogPhoto">
						<image class="examplePhoto" :src="item"></image>
					</swiper-item>
				</swiper> -->
			</view>
			<view class="userProfile flex-between">
				<view class="blogTitleFather flex-start">
					<view class="blogTitle flex-center">{{feedMessage.feedName}}</view>
				</view>
				<view class="attention flex-center" @click="clickAttention">
					<view class="no-attention flex-center" v-if="isAttention==false">
						收藏
					</view>
					<view class="have-attention flex-center" v-else-if="isAttention==true">
						已收藏
					</view>
				</view>
			</view>
			<view class="greyBlock"></view>
			<view class="blogContentFather flex-center">
				<view class="blogContent" v-for="(content, index) in splitContent">
					{{content}}
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
	//导入获取云函数的数据
	import apiRequest from '../../common/request.js'
	import { splitSentense } from '../../common/utils.js'
	import {
		communityBlogFilter
	} from '../../common/filter.js'
	export default {
		name:"CommunityBlog",
		// props: ['blogInfo'],
		data() {
			return {
				// 博客列表
				navHeight: 0,
				feedMessage: {},
				commentCount:0,
				likeCount: 0,
				heartState: false,
				isAttention: false,
				blogId: '',
				clickExchange: false,
				animationData: '',
				isLoad: false,
				splitContent: [],
				// commentList: [{
				// 	commentUserPhoto: '../../static/image/profile-photo.jpeg',
				// 	commentUserName: 'maomao',
				// 	commentContent: "这个地方真好玩！！！！！！！",
				// 	commentCreateTime: "2021-11-11",
				// }],
				commentLists: [],
				newComment: {
					commentUserPhoto: '',
					commentUserName: '',
					commentContent: "",
					commentCreateTime: "",
				},
			}
		},
		methods: {
			// 预览图片
			previewImage() {
				let _this = this
				//目前这里不能浏览本地的图片
				uni.previewImage({
					urls: [_this.feedMessage.feedImage]
				})
			},
			clickAttention(){
				let _this = this
				if(_this.isLoad==true){
					if(_this.isAttention==false){
						apiRequest("insertCollect", {
							_id: _this.blogId,
							type: 3,
						})
							.then(res => {
								console.log(res)
								_this.isAttention=true;
							})
					}else{
						apiRequest("cancelCollect", {
							_id: _this.blogId,
							type: 3,
						})
							.then(res => {
								console.log(res)
								_this.isAttention=false;
							})
					}
				}
				else{
					uni.getUserProfile({
						desc:"用于完善用户信息",
						success: (res) => {
							console.log(res)
							uni.showToast({
								icon:"none",
								title:'获取成功',
							})
							//登录成功
							_this.isLoad=true
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
										})
								},
							});
						},
						fail: (err) => {
							console.log(err)
							uni.showToast({
								icon:"none",
								title:'用户拒绝获取'
							})
						}  
					})
				}	
				
			},
		},
		async onLoad(params) {
			// console.log(params)
			uni.showLoading({
				title: '加载中'
			})
			let _this = this
			//创建动画
			// 进入页面获取缓存数据
			uni.getStorage({
				key: 'feedMessage',
				success: function (res) {
					_this.feedMessage = res.data
					uni.hideLoading()
					//看是否包含标点符号
					if(/[！。？]/.test(res.data.feedContent)){
						_this.splitContent = splitSentense(res.data.feedContent)
					}else{
						_this.splitContent.push(res.data.feedContent)
					}
				},
				fail: function (res) {
					console.log(res)
				}
			})
			uni.getStorage({
				key: 'nowFeedId',
				success: function (res) {
					// console.log(res.data)
					// _this.blogId=params.id;
					// console.log(_this.blogId)
				},
				fail: function (res) {
					console.log(res)
				}
			})
			_this.blogId = params.id
			console.log(_this.blogId)
			uni.getStorage({
				key: 'loadState',
				success: function (res) {
					// console.log(res.data)
					_this.isLoad=res.data;
				},
				fail: function (res) {
					console.log(res)
				}
			})
			apiRequest("isCollect", {
				type: 3,
				_id: _this.blogId
			})
				.then(res => {
					console.log('isCollect')
					console.log(res)
					_this.isAttention=res.isCollect
				})
		},
		async onUnload() {
			// commentUserPhoto: '',
			// commentUserName: '',
			// commentContent: "",
			// commentCreateTime: "",
			let _this = this
			// 离开页面销毁缓存
			uni.removeStorage({
				key: 'blog'
			}),
			uni.removeStorage({
				key: 'nowFeedId'
			})
			uni.removeStorage({
				key: 'feedMessage'
			})
		},
	}
</script>

<style lang="stylus">
@import 'feedMessage.styl';
</style>
