<template>
	<view class="agriculturalcontentdetail" v-show="loading">
		<ContentAudio
			v-if="isAudio"
			@close="this.isAudio = false"
			:data="audioProps" />
			
		<view class="title flex-start">
			<view class="icon-nongye iconfont"></view>
			{{infor.title || ''}}
		</view>
		<view class="type flex-between">
			<view class="">
				类别：{{infor.type}}
			</view>
			<view class="collectAndAudio flex-between">
				<view
					v-if="infor.isVideo == 0"
					class="flex-center collect"
					:class="active"
					@click="clickAttention">
					<view
						v-if="!isAttention"
						class="icon-shoucang2 iconfont"></view>
					<view
						v-else
						class="icon-shoucangfill iconfont"></view>
					<view v-if="!isAttention">收藏</view>
					<view v-else>已收藏</view>
				</view>
				<view
					v-if="infor.isVideo == 0"
					class="flex-center broadcast"
					:class="active"
					@click.stop="audioPlay">
					<view class="icon-yuyin iconfont"></view>
					播报
				</view>
			</view>
			
		</view>
		<image
			v-if="infor.isVideo == 0"
			:src="infor.image || '../../static/image/logo.png'" mode="aspectFill"></image>
		<view
			v-else
			class="video">
			<video
				:src="infor.video"
				@error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
		</view>
		<view class="content">
			{{infor.content}}
		</view>
	</view>
</template>

<script>
import apiRequest from '../../common/request'
import ContentAudio from '../../components/ContentAudio/ContentAudio.vue'
import login from '../../common/login'
import { agriculturalListFilter } from '../../common/filter'
	export default {
		components: {
			ContentAudio
		},
		data() {
			return {
				infor: {},
				id: '',
				isAudio: false,
				audioProps: {},
				isAttention: false,
				isLoad: false,
				loading: false
			}
		},
		methods: {
			clickAttention(){
				let _this = this
				if(_this.isLoad==true){
					//如果已经登录了就直接插入收藏
					if(_this.isAttention==false){
						//如果还没有收藏就进行收藏
						apiRequest("insertCollect", {
							_id: _this.id,
							type: 2,
						})
							.then(res => {
								console.log(res)
								_this.isAttention=true;
							})
					}else{
						//取消收藏
						apiRequest("cancelCollect", {
							_id: _this.id,
							type: 2,
						})
							.then(res => {
								console.log(res)
								_this.isAttention=false;
							})
					}	
				}
				else{
					//如果没有登录
					login()
				}	
			},
			// 播报内容
			audioPlay() {
				// 节流
				if (this.isAudio) return
				
				uni.showLoading({
					title: '正在加载音频'
				})
				apiRequest('textToVoice', {
					text: this.infor.content.substring(0, 100)
				})
					.then(res=> {
						let audioProps = {}
						audioProps.src = 'data:audio/wav;base64,'+ res.Audio
						if (this.infor.title.length >= 8) {
							audioProps.name = this.infor.title.substring(0, 8) + '...'
						} else {
							audioProps.name = this.infor.title
						}
						audioProps.poster = this.infor.image,
						this.audioProps = audioProps
						
						this.isAudio = true
						uni.hideLoading()
					})
			}
		},
		onLoad(params) {
			let id = params.id
			this.id = id
			let _this = this
			//获取登录状态
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
			//看是否已经收藏
			apiRequest("isCollect", {
				type: 2,
				_id: _this.id,
			})
				.then(res => {
					console.log(res)
					_this.isAttention=res.isCollect
				})
			// 设置分享
			uni.showLoading({
				title: '加载中'
			})
			// 进入页面获取缓存数据
			uni.getStorage({
				key: 'argriculture_' + id,
				success: function (res) {
					_this.infor = res.data
					uni.hideLoading()
					_this.loading = true
				},
				fail: function (res) {
					// 第一次进入此页面, 没有缓存数据则请求数据
					apiRequest('getAgricultureById', {
						_id: id
					})
						.then(data => {
							console.log(data)
							_this.infor = agriculturalListFilter([data.data])[0]
							uni.hideLoading()
							_this.loading = true
						})
				}
			})
		},
		async onUnload() {
			// 离开页面销毁缓存
			uni.removeStorage({
				key: 'argriculture_' + this.id
			})
		}
	}
</script>

<style lang="stylus">
@import 'agriculturalContentDetail.styl';
</style>
