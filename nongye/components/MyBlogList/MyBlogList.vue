<template>
	<view class="communityList flex-center" @click="clickMeToDetail">
		<view class="communityList-container flex-start" :class="blogInfo.skeleton ? 'skeleton': ''">
			<image class="communityBlockPhoto" :src="blogInfo.blogPhoto[0]"></image>
			<view class="communityTitle">
				{{blogInfo.blogTitle || ''}}
			</view>
			<view class="communityBlockContent">
				{{blogInfo.blogContent || ''}}
			</view>
			<view class="communityProfile flex-end">
				<!-- <image class="communityProfilePhoto" :src="blogInfo.blogUserPhoto"></image>
				<view class="communityProfileName">
					{{blogInfo.blogUserName}}
				</view> -->
				<view class="communityProfileName">
					{{blogInfo.blogCreateTime || ''}}
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
				myId: this.communityId,
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
				uni.navigateTo({
					url: "../../pages-my/myBlog/myBlog",
				})
			}
		}
	}
</script>

<style lang="stylus">
	@import "MyBlogList.styl";
</style>


