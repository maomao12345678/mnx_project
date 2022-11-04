<template>
	<view class="contentaudio">
		<view class="contentaudio-container flex-center fadeIn">
			<audio
				:src="data.src"
				:poster="data.poster"
				id="myAudio"
				autoplay
				:name="data.name"
				author="牧农兴"
				:action="audioAction.method"
				controls></audio>
				<view
					@click="this.$emit('close')"
					class="iconfont icon-tabguanbi"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ContentAudio",
		props: ['data'],
		data() {
			return {
			}
		},
	}
</script>

<style lang="stylus">
.contentaudio
	.contentaudio-container
		position fixed
		top 3vh
		left 50%
		transform translate(-50%, 0)
		padding 3%
		background white
		border-radius 8rpx
		box-shadow 0px 3px 6px 0px #ccc
		animation fadeIn .33s
	.icon-tabguanbi
		position absolute
		bottom 0
		right 0
		font-size 50rpx
		color var(--color-theme)
@keyframes fadeIn 
	from 
		top -10vh
	to
		top 3vh
</style>