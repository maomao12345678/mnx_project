<template>
	<view class="communityBlogFather" :animation="animationData">
		<scroll-view
			class="communityBlog"
			@scrolltolower="scrollToLower"
			:scroll-y="true">
			<view class="blogPhotoFather">
				<!-- <image class="blogPhoto" :src="blog.blogPhoto[0]" mode="aspectFill" @click="previewImage"></image> -->
				<swiper class="blogPhoto" :indicator-dots="true" :circular="true">
					<swiper-item
						:key="index"
						@click="previewImage"
						v-for="(item, index) in blog.blogPhoto">
						<image class="examplePhoto" :src="item"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="userProfile flex-between">
				<view class="userProfile-father flex-start">
					<image class="userPhoto" :src="blog.blogUserPhoto"></image>
					<view class="userName">
						{{blog.blogUserName}}
					</view>
				</view>
				<view class="attention flex-center" @click="clickAttention">
					<view
						class="no-attention flex-center"
						v-if="isAttention==false">收藏</view>
					<view
						class="have-attention flex-center"
						v-else-if="isAttention==true">已收藏</view>
				</view>
			</view>
			<view class="greyBlock"></view>
			<view class="blogTitleFather flex-start">
				<view class="blogTitle">{{blog.blogTitle}}</view>
			</view>
			<view class="blogContentFather flex-center">
				<view class="blogContent" v-for="(content,index) in splitContent">
					<!-- {{blog.blogContent}} -->
					{{content}}
				</view>
			<!-- 	<view class="blogContent" v-if="contentNull==true">
					{{blog.blogContent}}
					{{content}}
				</view> -->
			</view>
			<view class="blogTimeFather flex-end">
				<view class="blogTime">{{blog.blogCreateTime}}</view>
			</view>
			<view class="commentTitleFather">
				<view class="commentTitle flex-center">
					热门评论
				</view>
			</view>
			<!-- 别人的评论 -->
			<view class="commentView" v-if="commentList.commentContent.length!=0">
				<view class="commentFather" v-for="(item, index) in commentLists">
					<view class="commentProfile flex-start">
						<image class="commmentProfilePhoto" :src="item.commentUserPhoto"></image>
						<view class="commentProfileName">
							{{item.commentUserName}}
						</view>
					</view>
					<view class="comment">
						<text class="commentText">
							{{item.commentContent}}
						</text>
					</view>
					<view class="commentTimeFather flex-end">
						<view class="commentTime">
							{{item.commentCreateTime}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="shareBtnFather flex-between">
			<view class="exchangeAndLike flex-between">
				<view class="exchangeBtnFather flex-center" @click="clickComment">
					<icon class="iconfont icon-liuyan1 flex-center liuyan"></icon>
					<view class="exchangeNum flex-center">{{commentCount}}</view>
				</view>
				<view class="LoveBtnFather flex-center" @click="clickHeart">
					<icon class="iconfont icon-dianzan flex-center heart1" v-if="heartState==false"></icon>
					<icon class="iconfont icon-dianzan-aixinshixin flex-center heart2" v-else-if="heartState==true"></icon>
					<view class="loveNum flex-center">{{likeCount}}</view>
				</view>
			</view>
			<view class="shareBtn flex-center">
				<icon class="iconfont icon-pinglun flex-center"></icon>
				<view class="shareWord flex-center" v-if="clickExchange==false" @click="clickComment">评论</view>
				<view class="shareWord flex-center" v-else-if="clickExchange==true" @click="clickToPushComment">发布</view>
			</view>
		</view>
		<view class="inputExchangeFather flex-center" v-if="clickExchange==true">
			<textarea class="inputExchange" placeholder="请输入评论信息,最多可以输入300个字" @input="getCommentInput" maxlength=300>
			
			</textarea>
		</view>
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
				blogPhoto: "../../static/image/backgroud-1.jpeg",
				blogContent: "我们当时玩的7天，全程下来价格很便宜哦，包含了所有的景点门票住宿交通和美食，很佛系，哪里好看，就在哪里停下来，拍拍照，饿了米瑞就带我们去吃当地的美食，累了随时可以歇息，考虑到西藏的高原反应，米瑞给我们安排的也都是供养酒店，车也是供养汽车，因为西藏这块儿当地政府也在扶持旅游复苏，米瑞家做西藏品质自由行很多年了，在酒店景点门票各个方面都有资源，价格会便宜很多，就说我们住的酒店，网上光一晚上的价格都要五六百，这也是为什么选择米瑞品质自由行的主要原因吧，还有就是布达拉宫的门票，因为限制人数了的，听米瑞说有时候经常会出现买不到票的情况，并且一些黄牛还会去炒票，自己买价格也贵的离谱，这些米瑞都会给我们提前就安排好，这里把米瑞的联系方式贴出来吧，不管您是自己还是和家人一起去，都可以先找米瑞了解一下，她也非常的热心，非常的善良。",
				userPhoto: "../../static/image/profile-photo.jpeg",
				userName: "maomao",
				blogCreateTime: "2021-11-17",
				//用来从外面获取的博客
				blog: {},
				commentCount:0,
				likeCount: 0,
				heartState: false,
				isAttention: false,
				blogId: -1,
				clickExchange: false,
				animationData: '',
				isLoad: false,
				splitContent: [],
				contentNull: false,
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
			getUserComments(){
				let _this = this
				return apiRequest("getComments", {
					community_id: _this.blogId,			// 根据每条评论的id来获取
				})
					.then(res => {
						console.log(res)
						// console.log(_this.blogId)
						return communityBlogFilter(res.data)
					})
			},
			//获取新评论
			getCommentInput(ev){
				let _this = this
				_this.newComment.commentContent = ev.detail.value
				// console.log(_this.newComment)
			},
			// 预览图片
			previewImage() {
				let _this = this
				//目前这里不能浏览本地的图片
				uni.previewImage({
					urls: _this.blog.blogPhoto
				})
			},
			//发布评论
			clickToPushComment(){
				let _this = this
				_this.clickExchange = false
				_this.translateUp()
				uni.getStorage({
					key: 'userInfo',
					success: function (res) {
						// console.log(res.data);
						_this.newComment.commentUserName = res.data.nickName
						_this.newComment.commentUserPhoto = res.data.avatarUrl
						var date = new Date()
						var year = date.getFullYear()
						var month = date.getMonth() + 1
						var day = date.getDate()
						var hours = date.getHours()
						var minutes = date.getMinutes()
						_this.newComment.commentCreateTime = ""+year+"-"+month+"-"+day+" "+hours+":"+minutes
						if(_this.newComment.commentContent!=""){
							_this.commentLists.push(_this.newComment)
							_this.commentCount = _this.commentCount + 1
							// console.log(_this.commentLists)
							apiRequest("insertComment", {
								community_id: _this.blogId,	// 根据每条评论的id来获取
								content: _this.newComment.commentContent
							})
								.then(res => {
									console.log(res)
								})
						}else{
							uni.showToast({
								title: '评论不能为空',
								duration: 2000,
								icon: 'error'
							});
						}
					},
				});
			},
			translateDown(){
				let _this = this
				_this.animation.translateY(-200).step()
				_this.animationData = _this.animation.export()
			},
			translateUp(){
				let _this = this
				_this.animation.translateY(0).step()
				_this.animationData = _this.animation.export()
			},
			clickComment(){
				//输入15位以内的个人简介
				let _this = this
				if(_this.isLoad==true){
					// var flag = false
					_this.clickExchange = true
					_this.translateDown()
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
			clickHeart(){
				let _this = this
				if(_this.isLoad==true){
					apiRequest("giveLike", {
						community_id: _this.blogId,	
					})
						.then(res => {
							console.log(res)
							_this.heartState=true
							_this.likeCount=1
						})		
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
			clickAttention(){
				let _this = this
				if(_this.isLoad==true){
					if(_this.isAttention==false){
						apiRequest("insertCollect", {
							_id: _this.blogId,
							type: 4,
						})
							.then(res => {
								console.log(res)
								_this.isAttention=true;
							})
					}else{
						apiRequest("cancelCollect", {
							_id: _this.blogId,
							type: 4,
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
			async scrollToLower(events) {
				uni.showLoading({
					title: '加载中',
				})
				// this.loading = true
				// 加载下一页
				// ++this.curPage
				// 拼接数组(这样才可以展示数据)
				// this.blogs = this.blogs.concat(await this.blogs)
				// this.commentLists = this.commentLists.concat(await this.getUserComments())
				//设置延时
				setInterval(() => {
				    //TODO 
					uni.hideLoading()
				}, 1000);
				// this.loading = false
			},
		},
		async onLoad(params) {
			// console.log(params)
			uni.showLoading({
				title: '加载中'
			})
			let _this = this
			//创建动画
			_this.animation = uni.createAnimation()
			// _this.animation2 = uni.createAnimation()
			// _this.commentList.push(123)
			// 进入页面获取缓存数据
			uni.getStorage({
				key: 'blog',
				success: function (res) {
					_this.blog = res.data
					console.log('blog')
					console.log(_this.blog)
					console.log(_this.blog.blogContent)
					uni.hideLoading()
					
					//看是否包含标点符号
					if(/[！。？]/.test(_this.blog.blogContent)){
						_this.splitContent = splitSentense(_this.blog.blogContent)
					}else{
						_this.splitContent.push(_this.blog.blogContent)
					}
					console.log('_this.splitContent')
					console.log(_this.splitContent)
				},
				fail: function (res) {
					console.log(res)
				}
			})
			uni.getStorage({
				key: 'loadState',
				success: function (res) {
					if(res.data==true){
						_this.isLoad=true
					}else{
						_this.isLoad=false
					}
				},
			});
			uni.getStorage({
				key: 'nowCummunityId',
				success: function (res) {
					_this.blogId = res.data
					uni.hideLoading()
					// console.log(_this.blogId)
				},
				fail: function (res) {
					console.log(res)
				}
			})
			_this.blogId = params.id
			console.log(_this.blogId)
			this.commentLists = await this.getUserComments()
			apiRequest("isGiveLike", {
				community_id: _this.blogId,	// 根据每条评论的id来获取
			})
				.then(res => {
					_this.heartState = res.islike
					if(_this.heartState==true){
						_this.likeCount = 1
					}
					console.log(res)
				})
			apiRequest("getComments", {
				community_id: _this.blogId,			// 根据每条评论的id来获取
			})
				.then(res => {
					_this.commentCount = res.data.length
				})
			apiRequest("isCollect", {
				type: 4,
				_id: _this.blogId,
			})
				.then(res => {
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
				key: 'nowCummunityId'
			})
		},
	}
</script>

<style lang="stylus">
@import 'communityBlog.styl';
</style>
