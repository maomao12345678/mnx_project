<template>
	<view class="communityList flex-center" @click="clickMeToDetail">
		<view class="communityList-container flex-start" :class="blogInfo.skeleton ? 'skeleton': ''">
			<image class="communityBlockPhoto" :src="blogInfo.medicineImage"  mode="aspectFill"></image>
			<view class="communityTitle flex-start">
				{{blogInfo.medicineName || ''}}
			</view>
			<view class="communityBlockContent flex-start">
				{{blogInfo.medicineContent || ''}}
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
				myId: this.blogInfo.medicineId,
				medicineMessage: this.blogInfo,
			}
		},
		methods: {
			clickMeToDetail(){
				let _this = this
				uni.setStorage({
					key: 'medicineMessage',
					data: _this.medicineMessage,
				})
				// // console.log(_this.myId)
				// uni.setStorage({
				// 	key: 'nowCummunityId',
				// 	data: _this.myId,
				// })
				// uni.navigateTo({
				// 	url: `../../pages/communityBlog/communityBlog?id=${_this.myId}`,
				// })
				uni.navigateTo({
					// url: '../../pages/medicineMessage/medicineMessage',
					url: `../../pages-knowledge/medicineMessage/medicineMessage?id=${_this.myId}`,
				})
			}
		}
	}
</script>

<style lang="stylus">
	@import "MedicineList.styl";
</style>


