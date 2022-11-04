<template>
	<view
		@click="clickCard"
		:class="data.skeleton ? 'skeleton': ''"
		class="leasegood flex-center">
		<view class="leasegood-item flex-start">
			<image
				:style="mode ? 'height: 350rpx' : ''"
				:src="data.image || ''"
				:mode="mode || 'widthFix'"></image>
			<view class="leasegood-intro flex-between">
				<view class="intro-content">
					{{data.title || ''}}
				</view>
				<view class="intro-money flex-between">
					￥{{data.money || ''}}
				</view>
				<view class="intro-last flex-between">
					<view class="intro-user flex-start">
						<image
							:src="data.userImage"
							mode="aspectFill"></image>
						<view class="user-name">
							{{data.userName || '略略略'}}
						</view>
					</view>
					
					<view
						v-if="data.type"
						class="intro-classify">{{data.type || ''}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"leaseGood",
		props: ['data', 'index', 'mode'],
		data() {
			return {
				image: '../../static/image/logo.png'
			}
		},
		methods: {
			// 点击收藏
			clickCollect() {
				this.$emit('clickCollect', this.index)
			},
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
@import './leaseGood.styl';

</style>