<template>
	<view class="communityList" @click="clickMeToDetail">
		<view class="communityList-container flex-start" :class="blogInfo.skeleton ? 'skeleton': ''">
			<image class="communityBlockPhoto" :src="blogInfo.feedImage"  mode="aspectFill"></image>
			<view class="communityTitle flex-start">
				{{blogInfo.feedName || ''}}
			</view>
			<view class="communityBlockContent flex-start">
				{{blogInfo.feedContent || ''}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"NongZiList",
		props: ['blogInfo'],
		data() {
			return {
				photo: "../../static/image/backgroud-1.jpeg",
				content: "这里很好玩，今天真开心,哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈!!!!!!!!",
				profilePhoto: "../../static/image/profile-photo.jpeg",
				profileName: "maomao",
				feedMessage: this.blogInfo,
				myId: this.blogInfo.feedId,
			}
		},
		methods: {
			clickMeToDetail(){
				let _this = this
				uni.setStorage({
					key: 'feedMessage',
					data: _this.feedMessage,
				})
				// console.log(_this.myId)
				uni.setStorage({
					key: 'nowFeedId',
					data: _this.myId,
				})
				// uni.navigateTo({
				// 	url: `../../pages/communityBlog/communityBlog?id=${_this.myId}`,
				// })
				uni.navigateTo({
					url: `../../pages-knowledge/feedMessage/feedMessage?id=${_this.myId}`,
					// url: `../../pages/communityBlog/communityBlog?id=${_this.myId}`,
				})
			}
		}
	}
</script>

<style lang="stylus">
	@import "FeedList.styl";
</style>


