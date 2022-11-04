<template>
	<scroll-view 
		class="communityBlog"
		:scroll-y="true"
		:style="'height: calc(100vh - ' + navHeight + 'px - 100rpx + 100rpx'">
		<view class="blogPhotoFather">
			<!-- <image class="blogPhoto" :src="blog.blogPhoto" mode="aspectFill" @click="previewImage"></image> -->
			<!-- <swiper class="blogPhoto" :indicator-dots="true" :circular="true">
				<swiper-item>
					<image class="examplePhoto" src="../../static/image/backgroud-1.jpeg"></image>
				</swiper-item>
				<swiper-item>
					<image class="examplePhoto" src="../../static/image/yumi.png"></image>
				</swiper-item>
				<swiper-item>
					<image class="examplePhoto" src="../../static/image/good.jpg"></image>
				</swiper-item>
			</swiper> -->
			<swiper class="blogPhoto" :indicator-dots="true" :circular="true">
				<swiper-item
					:key="index"
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
			<view class="attention flex-center" @click="clickToEdit">
				编辑
			</view>
		</view>
		<view class="greyLine"></view>
		<view class="blogTitleFather flex-start">
			<view class="blogTitle">{{blog.blogTitle}}</view>
		</view>
		<view class="blogContentFather flex-center">
			<view class="blogContent">
				{{blog.blogContent}}
			</view>
		</view>
		<view class="blogTimeFather flex-end">
			<view class="blogTime">{{blog.blogCreateTime}}</view>
		</view>
	</scroll-view>
</template>

<script>
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
				blog: {},
			}
		},
		methods: {
			// 预览图片
			previewImage() {
				let _this = this
				//目前这里不能浏览本地的图片
				uni.previewImage({
					urls: [_this.blog.blogPhoto]
				})
			},
			clickToEdit(){
				uni.navigateTo({
					url: "../myBlogEdit/myBlogEdit"
				})
			},
		},
		onLoad(params) {
			uni.showLoading({
				title: '加载中'
			})
			let _this = this
			// 进入页面获取缓存数据
			uni.getStorage({
				key: 'blog',
				success: function (res) {
					_this.blog = res.data
					uni.hideLoading()
				},
				fail: function (res) {
					console.log(res)
				}
			})
		},
		async onUnload() {
			// 离开页面销毁缓存
			uni.removeStorage({
				key: 'blog'
			})
		},
	}
</script>

<style lang="stylus">
@import 'myBlog.styl';
</style>
