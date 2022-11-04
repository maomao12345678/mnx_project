<template>
	<view class="appfooter flex-start">
		<view
			v-for="(item, index) in tabbar"
			:key="index"
			@click="skipPage(index)"
			class="appfooter-item flex-center"
			:class="activeIndex == index ? 'active' : ''">
			<view
				:class="item.icon"
				class="iconfont"></view>
			<view>{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "appfooter",
		props: ['activeIndex'],
		data() {
			return {
				tabbar: [{
					name: '知识',
					icon: 'icon-zhishi'
				}, {
					name: '社区',
					icon: 'icon-shequ'
				}, {
					name: '租赁',
					icon: 'icon-zulin'
				}, {
					name: '我的',
					icon: 'icon-wode'
				}]
			}
		},
		methods: {
			// 切换路由
			skipPage(index) {
				// 反馈点击索引
				this.$emit('skipPage', index)
			}
		}
	}
</script>

<style lang="stylus">
@import './AppFooter.styl';
</style>
