<template>
	<view class="agriculturalntro" 
		:class="data.skeleton ? 'skeleton': ''"
		@click="clickCard">
		<view class="content flex-between">
			<view class="content-left flex-between">
				<view class="content-title flex-start">
					{{data.title || ''}}
				</view>
				<view class="content-word flex-end">
					{{data.content || ''}}
					<view
						v-if="data.skeleton"
						class="content-skeleton"
						v-for="item, index in 2">
					</view>
				</view>
			</view>
	<!-- 		<image
				:src="data.image || '../../static/image/logo.png'"
				mode="aspectFill"></image> -->
			<image
				:src="data.image || ''"
				mode="aspectFill"></image>
		</view>
		<view class="tip flex-between">
			<view
				class="tip-content flex-start"
				v-if="data.setype">
				<view class="tip-type">
					{{data.setype || ''}}
				</view>
				<view class="tip-type">
					{{data.type || ''}}
				</view>
				<view class="tip-time">
					<!-- {{data.time.split(' ')[0] || ''}} -->
					{{data.time || ''}}
				</view>
			</view>
			
			<view
				v-if="data.isVideo == 0"
				@click.stop='this.$emit("broadcast", index)'
				:class="broadcastActive == index ? 'active' : ''"
				class="flex-start broadcast">
				<view class="icon-yuyin iconfont"></view>
				播报
			</view>
			
			<view
				v-if="data.isVideo == 1"
				class="tip-video">
				视频
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"AgriculturalIntro",
		props: ['data', 'index', 'broadcastActive'],
		data() {
			return {
				
			}
		},
		methods:{
			// 点击卡片
			clickCard() {
				// 骨架屏不允许点击
				if (!this.data.skeleton) {
					this.$emit('click', this.index)
				}
			}
		}
	}
</script>

<style lang="stylus">
@import 'AgriculturalIntro.styl';
</style>