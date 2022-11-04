<template>
	<view class="leasemessage flex-start">
		<image :src="data.image" mode="aspectFill"></image>
		<view class="leasemessage-right flex-start">
			<view class="name flex-start">
				{{data.username}}
				<view class="time">
					{{data.time}}
				</view>
			</view>
			<view class="leasemessage-message">
				{{data.message}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"LeaseMessage",
		props: ['data'],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="stylus">
.leasemessage
	padding 3% 0
	box-sizing border-box
	align-items flex-start
	image
		width 9vw
		height 9vw
		border-radius 50%
		background #f1f1f1
		flex-shrink 0
	.leasemessage-right
		margin-left 20rpx
		flex-direction column
		align-items flex-start
		flex-grow 1
		.name
			font-size var(--font-size-normal)
			color var(--color-grey)
			margin-bottom 15rpx
		.time
			font-size var(--font-size-tiny)
			margin-left 20rpx
		.leasemessage-message
			font-size var(--font-size-normal)
			letter-spacing 1px
</style>