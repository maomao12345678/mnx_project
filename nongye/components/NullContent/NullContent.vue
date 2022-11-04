<template>
	<view class="nullstatus flex-center">
		<image src="../../static/image/null.png" mode=""></image>
		<view class="">
			{{title}}
		</view>
		<view
			@click="this.$emit('click')"
			class="null-button flex-center"
			v-if="content">
			{{content}}
		</view>
	</view>
</template>

<script>
	export default {
		props: ['title', 'content'],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="stylus">
.nullstatus
	flex-direction column
	padding 5% 0
	font-size var(--font-size-normal)
	color var(--color-grey)
	width 100vw
	image
		width 25vw
		height 25vw
	.null-button
		width 120rpx
		height 56rpx
		border-radius 80rpx
		margin-top 30rpx
		background var(--color-setheme)
		color white
		font-size var(--font-size-normal)
</style>
