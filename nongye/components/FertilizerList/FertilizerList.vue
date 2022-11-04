<template>
	<view class="communityList flex-center" @click="clickMeToDetail">
		<view class="communityList-container flex-start" :class="blogInfo.skeleton ? 'skeleton': ''">
			<image class="communityBlockPhoto" :src="blogInfo.fertilizerImage"  mode="aspectFill"></image>
			<view class="communityTitle flex-start">
				{{blogInfo.fertilizerName || ''}}
			</view>
			<view class="communityBlockContent flex-start">
				{{blogInfo.fertilizerContent || ''}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"NongZiList",
		props: ['blogInfo', 'index'],
		data() {
			return {
				photo: "../../static/image/backgroud-1.jpeg",
				content: "这里很好玩，今天真开心,哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈!!!!!!!!",
				profilePhoto: "../../static/image/profile-photo.jpeg",
				profileName: "maomao",
				myId: this.blogInfo.fertilizerId,
				fertilizerMessage: this.blogInfo,
			}
		},
		methods: {
			clickMeToDetail(){
				this.$emit('click', this.index)
				let _this = this
				uni.setStorage({
					key: 'fertilizerMessage',
					data: _this.fertilizerMessage,
				})
				// console.log(_this.myId)
				uni.setStorage({
					key: 'nowCummunityId',
					data: _this.myId,
				})
				// uni.navigateTo({
				// 	url: `../../pages/communityBlog/communityBlog?id=${_this.myId}`,
				// })
				uni.navigateTo({
					// url: '../../pages/fertilizerMessage/fertilizerMessage',
					url: `../../pages-knowledge/fertilizerMessage/fertilizerMessage?id=${_this.myId}`,
				})
			}
		}
	}
</script>

<style lang="stylus">
	@import "FertilizerList.styl";
</style>


