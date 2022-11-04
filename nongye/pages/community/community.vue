<template>
	<view class="community"
		:style="'height: calc(100vh - ' + navHeight + 'px - 100rpx - 120rpx'">
		<scroll-view class="communityScroll"
			@scrolltolower="scrollToLower"
			:scroll-y="true"
			:style="'height: calc(100vh - ' + navHeight + 'px - 100rpx - 30rpx'">
		<!-- 	<view class="slideshow">
				<swiper class="slideshowPhoto" :circular="true" :autoplay="true">
					<swiper-item>
						<image class="examplePhoto" src="https://munongxing.oss-cn-guangzhou.aliyuncs.com/common/start01.png" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item>
						<image class="examplePhoto" src="https://munongxing.oss-cn-guangzhou.aliyuncs.com/common/start02.png" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item>
						<image class="examplePhoto" src="https://munongxing.oss-cn-guangzhou.aliyuncs.com/common/start03.png" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item>
						<image class="examplePhoto" src="https://munongxing.oss-cn-guangzhou.aliyuncs.com/common/start04.png" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view> -->
			<view class="communityShowWord title flex-between">
				<view class="communityShowWord flex-center">
					热门圈子
				</view>
				<view class="myShare flex-center" @click="shareMyCommunity">
					发布圈子
				</view>
			</view>
			<view class="communityFather flex-start">
				<!-- 这个是社区页面 -->
				<CommunityList 
					class="communityList" 
					v-for="(item, index) in blogs"
					:key="index"
					:blogInfo="item"
					:communityId="index"
				></CommunityList>
			</view>
		</scroll-view>
		<!-- <ListsLoading class="lists-loading" v-if="loading" /> -->
	</view>
</template>

<script>
	import CommunityList from "../../components/CommunityList/CommunityList.vue"
	import ListLoading from '../../components/ListsLoading/ListsLoading.vue'
	//导入获取云函数的数据
	import apiRequest from '../../common/request.js'
	import {
		communityBlogsFilter
	} from '../../common/filter.js'
	export default {
		name: "community",
		components: {
			CommunityList, //不要忘记这里要先声明使用的自定义组件
			ListLoading
		},
		async onReady() {
			//农资部分
			let nList = {
				_id: 'f6e08a64627b7d0c0266b065247ee2bd',
				title: '广州三日两夜游',
				skeleton: true,
				image: '',
				content: '哈哈哈哈哈'
			}
			for (let a = 0; a <= 8; ++a) {
				this.blogs.push(nList)
			}
			this.blogs = await this.getRecCommnunityBlogs()
		},
		data() {
			return {
				// 底部加载中
				// loading: false,
				// 当前请求页数
				curPage: 0,
				// 博客列表
				navHeight: 0,
				loadState: false,
				//展示列表
				lists: [],
				//看是否第一次加载
				firstLoading: false,
				onlyBlog: {
					blogPhoto: ['../../static/image/backgroud-1.jpeg'],
					blogContent:'我们当时玩的7天，全程下来价格很便宜哦，包含了所有的景点门票住宿交通和美食，很佛系，哪里好看，就在哪里停下来，拍拍照，饿了米瑞就带我们去吃当地的美食，累了随时可以歇息，考虑到西藏的高原反应，米瑞给我们安排的也都是供养酒店，车也是供养汽车，因为西藏这块儿当地政府也在扶持旅游复苏，米瑞家做西藏品质自由行很多年了，在酒店景点门票各个方面都有资源，价格会便宜很多，就说我们住的酒店，网上光一晚上的价格都要五六百，这也是为什么选择米瑞品质自由行的主要原因吧，还有就是布达拉宫的门票，因为限制人数了的，听米瑞说有时候经常会出现买不到票的情况，并且一些黄牛还会去炒票，自己买价格也贵的离谱，这些米瑞都会给我们提前就安排好，这里把米瑞的联系方式贴出来吧，不管您是自己还是和家人一起去，都可以先找米瑞了解一下，她也非常的热心，非常的善良。这里很好玩，今天真开心,哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈!!!!!!!!',
					blogUserPhoto: '../../static/image/profile-photo.jpeg',
					blogUserName: 'maomao',
					blogId: 0,
					blogCreateTime: '2021-11-17',
					blogTitle: "西藏三天两日游",
				},
				// blogs:[{
				// 		blogPhoto: ['../../static/image/backgroud-1.jpeg'],
				// 		blogContent:'我们当时玩的7天，全程下来价格很便宜哦，包含了所有的景点门票住宿交通和美食，很佛系，哪里好看，就在哪里停下来，拍拍照，饿了米瑞就带我们去吃当地的美食，累了随时可以歇息，考虑到西藏的高原反应，米瑞给我们安排的也都是供养酒店，车也是供养汽车，因为西藏这块儿当地政府也在扶持旅游复苏，米瑞家做西藏品质自由行很多年了，在酒店景点门票各个方面都有资源，价格会便宜很多，就说我们住的酒店，网上光一晚上的价格都要五六百，这也是为什么选择米瑞品质自由行的主要原因吧，还有就是布达拉宫的门票，因为限制人数了的，听米瑞说有时候经常会出现买不到票的情况，并且一些黄牛还会去炒票，自己买价格也贵的离谱，这些米瑞都会给我们提前就安排好，这里把米瑞的联系方式贴出来吧，不管您是自己还是和家人一起去，都可以先找米瑞了解一下，她也非常的热心，非常的善良。这里很好玩，今天真开心,哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈!!!!!!!!',
				// 		blogUserPhoto: '../../static/image/profile-photo.jpeg',
				// 		blogUserName: 'maomao',
				// 		blogId: 0,
				// 		blogCreateTime: '2021-11-17',
				// 		blogTitle: "西藏三天两日游",
				// 	}]
				blogs: [],
				// 首次加载
				firstLoading: false,
			}
		},
		methods: {
			// 预览图片
			previewImage() {
				let _this = this
				//目前这里不能浏览本地的图片
				uni.previewImage({
					urls: [src]
				})
			},
			getRecCommnunityBlogs(){
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getCommunitys", {
					limit: 10,			// 查询的记录条数
					page: this.curPage				// 页码
				})
					.then(res => {
						uni.hideLoading()
						var blogInfo = res.data
						if (!this.firstLoading) {
							this.blogs = []
							this.firstLoading = true
						}
						return communityBlogsFilter(res.data)
					})
			},
			// 滚动到底部加载更多
			async scrollToLower(events) {
				uni.showLoading({
					title: '加载中',
				})
				// this.loading = true
				// 加载下一页
				++this.curPage
				// 拼接数组(这样才可以展示数据)
				// this.blogs = this.blogs.concat(await this.blogs)
				this.blogs = this.blogs.concat(await this.getRecCommnunityBlogs())
				//设置延时
				setInterval(() => {
				    //TODO 
					uni.hideLoading()
				}, 1000);
				// this.loading = false
			},
			shareMyCommunity(){
				let _this = this
				uni.getStorage({
					key: 'loadState',
					success: function (res) {
						// console.log(res.data);
						if(res.data==true){
							uni.navigateTo({
								url: "../../pages-community/shareCommunity/shareCommunity"
							})
						}else{
							uni.getUserProfile({
								desc:"用于完善用户信息",
								success: (res) => {
									console.log(res)
									uni.showToast({
										icon:"none",
										title:'获取成功',
									})
									//登录成功
									_this.loadState=true
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
									
									uni.navigateTo({
										animationDuration: 1000,
										url: "../../pages-community/shareCommunity/shareCommunity"
									})
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
					}
				});
			},
		}
	}
</script>

<style lang="stylus">
@import 'community.styl';
</style>
