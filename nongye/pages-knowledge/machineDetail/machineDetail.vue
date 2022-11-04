<template>
	<view class="machinedetail">
		<ContentAudio
			@close="this.isAudio = false"
			v-if="isAudio"
			:data="audioProps" />
		<view class="video-container">
			<video
				v-if="detailInfor.video"
				class="video"
				:src="video"
				controls></video>
			<image
				v-else
				@click="previewImage"
				:src="detailInfor.image"
				mode="aspectFill"></image>
		</view>
		<view class="title">
			<view class="title-container flex-start">
				<view class="title-word">
					{{detailInfor.title}}
				</view>
				<view class="title-type">
					{{detailInfor.type}}
				</view>
			</view>
		</view>
		<view class="flex-between pageutil">
			<view
				@click="clickCollect"
				:class="detailInfor.isCollect ? 'active' : ''"
				class="collect flex-start">
				{{detailInfor.isCollect ? '已收藏' : '收藏'}}
				<view
					v-if="!detailInfor.isCollect"
					class="iconfont icon-shoucang"></view>
				<view
					v-else
					class="iconfont icon-shoucang1"></view>
			</view>
			<view
				@click="audioPlay"
				:class="isAudio ? 'active' : ''"
				class="broadcast flex-center">
				播报
				<view class="icon-yuyin iconfont"></view>
			</view>
		</view>
		<view class="intro"
			:key="index"
			v-for="item, index in detailInfor.splitIntro">
			{{item}}
		</view>
		
		<!-- <view class="title">
			相关机械
		</view> -->
	</view>
</template>

<script>
import apiRequest from '../../common/request'
import { splitSentense } from '../../common/utils.js'
import { machineListsFilter } from '../../common/filter'
import ContentAudio from '../../components/ContentAudio/ContentAudio.vue'
	export default {
		components: {
			ContentAudio
		},
		data() {
			return {
				id: 0,
				index: -1,
				location: '',
				detailInfor: [],
				// 音频媒体控件
				isAudio: false,
				audioProps: {}
			}
		},
		methods: {
			// 预览图片
			previewImage() {
				uni.previewImage({
					urls: [this.detailInfor.image]
				})
			},
			// 点击收藏
			clickCollect() {
				if(this.detailInfor.isCollect==false){
					apiRequest("insertCollect", {
						_id: this.id,
						type: 1,
					})
						.then(res => {
							console.log(res)
							// 当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，
							// 向对象中添加新的属性，如果更新此属性的值，是不会更新视图的
							this.$set(this.detailInfor, 'isCollect', true)
							this.detailInfor.isCollect=true
						})
				}else{
					apiRequest("cancelCollect", {
						_id: this.id,
						type: 1,
					})
						.then(res => {
							console.log(res)
							this.$set(this.detailInfor, 'isCollect', !this.detailInfor.isCollect)
							this.detailInfor.isCollect=false
						})
				}
				// if (this.detailInfor.isCollect == undefined){
				// 	// 当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，
				// 	// 向对象中添加新的属性，如果更新此属性的值，是不会更新视图的
				// 	this.$set(this.detailInfor, 'isCollect', true)
				// } else {
				// 	this.$set(this.detailInfor, 'isCollect', !this.detailInfor.isCollect)
				// }
			},
			// 播报内容
			audioPlay() {
				// 节流
				if (this.isAudio) return
				
				uni.showLoading({
					title: '正在加载音频'
				})
				apiRequest('textToVoice', {
					text: this.detailInfor.intro.substring(0, 100)
				})
					.then(res=> {
						let audioProps = {}
						audioProps.src = 'data:audio/wav;base64,'+ res.Audio
						audioProps.name = this.detailInfor.title + '介绍',
						audioProps.poster = this.detailInfor.image,
						this.audioProps = audioProps
						
						this.isAudio = true
						uni.hideLoading()
					})
			},
		},
		onLoad(params) {
			uni.showLoading({
				title: '加载中'
			})
			let id = params.id
			let _this = this
			this.id = id
			this.index = params.index
			this.location = params.location
			
			// 进入页面获取缓存数据
			uni.getStorage({
				key: 'machine_' + id,
				success: function (res) {
					_this.detailInfor = res.data
					_this.detailInfor.splitIntro = splitSentense(_this.detailInfor.intro)
					uni.hideLoading()
				},
				fail: function (res) {
					// 第一次进入此页面, 没有缓存数据则请求数据
					apiRequest('getMachineById', {
						id
					})
						.then(data => {
							_this.detailInfor = machineListsFilter(data.data)[0]
							_this.detailInfor.splitIntro = splitSentense(_this.detailInfor.intro)
							uni.hideLoading()
						})
				}
			})
			apiRequest("isCollect", {
				type: 1,
				_id: this.id
			})
				.then(res => {
					console.log('isCollect')
					// console.log(res)
					this.detailInfor.isCollect = res.isCollect
					// console.log(this.detailInfor.isCollect)
					// _this.isAttention=res.isCollect
				})
		},
		async onUnload() {
			// 离开页面销毁缓存
			uni.removeStorage({
				key: 'machine_' + this.id
			})
			// 获取上一页面数据
			let pages = getCurrentPages()
			if (pages.length != 1) {
				let beforePage = pages[pages.length - 2]
				let params = {
					isCollect: this.detailInfor.isCollect
				}
				// 调用上一页面的updateList函数
				beforePage.$vm.updateList(this.index, params, this.location)
			}
		}
	}
</script>

<style lang="stylus">
@import './machineDetail.styl';
</style>
