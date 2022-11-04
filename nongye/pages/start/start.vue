<template>
	<!-- <view class="greenBackGround" v-if="hasValue==true"></view> -->
	<view class="start">
		<swiper class="startSlide" :vertical='true'>
			<!--  :style="{background: 'url('+imageURL+')'}" -->
			<swiper-item class="munongSwiper flex-center">
					<!-- <image class="bgimg" src="../../static/image/index.jpg"> -->
					<view class="munongTitle flex-center">
						<image class="mumongxingPhoto flex-center" src="../../static/image/munongxing-round.png"></image>
					</view>
					<!-- <view class="munongText flex-center animate__animated animate__flipInY animate__delay-1s">
						为乡村振兴尽一份力
					</view> -->
					<!-- <view class="munongIcon flex-center">
						<icon class="iconfont icon-a-xiangxia_huaban1"></icon>
					</view> -->
					<view class="enterBTN flex-center" @click="clickToIndex">
						马上体验
					</view>
				</image>
			</swiper-item>
			<!-- <swiper-item class="welcomeSwiper">
				<view class="welcomeWords">
					<view class="welcomeTitle flex-start animate__animated animate__lightSpeedInLeft animate__delay-3s">欢迎来到牧农兴</view>
					<view class="welcomeText">
						<view class="text1 flex-start animate__animated animate__fadeIn animate__delay-4s">在这里，可以学习有关种植、畜牧、设备、农资等科普知识;</view>
						<view class="text2 flex-start animate__animated animate__fadeIn animate__delay-5s">可以创建自己的社区，一起探讨乡村振兴之路;</view>
						<view class="flex-start animate__animated animate__fadeIn animate__delay-6s">也可以进行设备租赁，提高生产效率;</view>
					</view>
				</view>
				<view class="welcomePhotos animate__animated animate__zoomIn animate__delay-3s">
					<swiper class="slideshowPhoto" :circular="true" :autoplay="true">
						<swiper-item>
							<image class="examplePhoto" src="../../static/image/welcome02.png" mode="aspectFill"></image>
						</swiper-item>
						<swiper-item>
							<image class="examplePhoto" src="../../static/image/welcome03.png" mode="aspectFill"></image>
						</swiper-item>
						<swiper-item>
							<image class="examplePhoto" src="../../static/image/welcome01.png" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</view>
			</swiper-item>
			<swiper-item class="enterSwiper">
				<view class="enterPhotoFather animate__animated animate__fadeIn animate__delay-8s">
					<image class="enterPhoto" src="../../static/image/welcome-06.png" mode="aspectFill"></image>
				</view>
				<view class="enterTitle">
					<view class="enterTitle1 flex-start animate__animated animate__lightSpeedInLeft animate__delay-9s">
						<view class="enterTitle1Word">
							开启您的牧农之旅
						</view>
					</view>
					<view class="enterTitle2 flex-end animate__animated animate__lightSpeedInRight animate__delay-9s">
						<view class="enterTitle2Word">
							为乡村振兴尽一份力
						</view>
					</view>
				</view>
				<view class="enterIndexBTNFather flex-center animate__animated animate__backInUp animate__delay-10s">
					<view class="enterBTN flex-center" @click="clickToIndex">
						马上体验
					</view>
				</view>
			</swiper-item> -->
		</swiper>	
	</view>
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {
				username: '',
				hasValue: false,
				imageURL: '../../static/image/backgroud-01.webp',
			}
		},
		onLoad() {
			// let _this = this
			// uni.getStorage({
			// 	key: 'userInfo',
			// 	success(data) {
			// 		if(data.nickName!=''){
			// 			_this.hasValue = true
			// 			// setInterval(() => {
			// 			//     //TODO 
			// 			// 	uni.hideLoading()
			// 			// }, 2000);
			// 			uni.navigateTo({
			// 				url: '../index/index',
			// 				// animationType: true,
			// 				// animationDuration: 10000
			// 			})
			// 		}else{
			// 			_this.hasValue = false
			// 		}
			// 	}
			// })
		},
		onReady() {
			let _this = this
			uni.getStorage({
				key: 'userInfo',
				success(data) {
					if(data.nickName!=''){
						_this.hasValue = true
						// setInterval(() => {
						//     //TODO 
						// 	uni.hideLoading()
						// }, 2000);
					}else{
						_this.hasValue = false
					}
				}
			})
		},
		methods: {
			clickToIndex(){
				// 设备第一次访问平台
				uni.setStorage({
					key: "isUser",
					data: 'yep'
				})
				uni.navigateTo({
					url: "../index/index"
				})
			}
		}
	}
</script>

<style lang="stylus">
@import 'start.styl'
</style>