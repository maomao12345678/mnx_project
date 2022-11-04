<template>
	<view class="ListsLoading flex-center">
		<view class="left"></view>
		<view class="word">加载中</view>
		<view class="right"></view>
	</view>
</template>

<script>
	export default {
		name:"ListsLoading",
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="stylus">
.ListsLoading
	width 100vw
	padding 15rpx 0
	.left,
	.right
		width 30vw
		height 1px
		background #ccc
	.word
		font-size var(--font-size-tiny)
		margin 0% 5%
</style>
