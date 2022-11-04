<template>
	<view class="communityList flex-center" 
		@click="clickMeToDetail">
		<view class="communityList-container flex-start" :class="blogInfo.skeleton ? 'skeleton': ''">
			<image class="communityBlockPhoto" :src="blogInfo.blogPhoto[0] || ''"  mode="aspectFill"></image>
			<view class="communityTitle flex-start">
				{{blogInfo.blogTitle || ''}}
			</view>
			<view class="communityBlockContent flex-start">
				{{blogInfo.blogContent || ''}} 
			</view>
			<view class="communityProfile flex-start">
				<image class="communityProfilePhoto" :src="blogInfo.blogUserPhoto"></image>
				<view class="communityProfileName">
					{{blogInfo.blogUserName || '啦啦啦啦'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CommunityList",
		props: ['blogInfo', 'communityId'],
		data() {
			return {
				photo: "../../static/image/backgroud-1.jpeg",
				content: "这里很好玩，今天真开心,哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈!!!!!!!!",
				profilePhoto: "../../static/image/profile-photo.jpeg",
				profileName: "maomao",
				myId: this.blogInfo.blogId,
				myBlog: this.blogInfo,
			}
		},
		methods: {
			clickMeToDetail(){
				let _this = this
				uni.setStorage({
					key: 'blog',
					data: _this.myBlog,
				})
				// console.log(_this.myId)
				uni.setStorage({
					key: 'nowCummunityId',
					data: _this.myId,
				})
				uni.navigateTo({
					url: `../../pages-community/communityBlog/communityBlog?id=${_this.myId}`,
				})
			}
		}
	}
</script>

<style lang="stylus">
	@import "CommunityList.styl";
</style>


