<template>
	<view
		class="appheader flex-start"
		:style="'padding-top: '+top+'px'">
		<view
			v-if="back"
			@click="goBack"
			class="back icon-fanhui iconfont"></view>
		<view
			@click="this.$emit('click')"
			class="appheader-search flex-start"
			:class="back ? 'reduce' : ''"
			:style="'height: '+menuHeight+'px'">
			<view class="icon-fangdajing iconfont"></view>
			<input
				:auto-focus="autofocus"
				class="search-content"
				maxlength="15"
				type="text"
				@confirm="this.$emit('confirm', content)"
				confirm-type="搜索"
				placeholder="搜索"
				v-model="content" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "appheader",
		props: ['back', 'autofocus'],
		methods:{
			// 返回上一页
			goBack () {
				uni.navigateBack({
					delta: -1
				})
			}
		},
		data () {
			return {
				top: 0,
				menuHeight: 0,
				content: ''
			}
		},
		created () {
			// 获取状态栏高度
			const { statusBarHeight } = wx.getSystemInfoSync()
			// 得到右上角菜单的位置尺寸
			const menuButtonObject = wx.getMenuButtonBoundingClientRect()
			const { top, height } = menuButtonObject
			this.menuHeight = height
			this.top = top
		}
	}
</script>

<style lang='stylus'>
@import './AppHeader.styl';
</style>
