<template>
	<view
		@click="clickCard"
		:class="data.skeleton ? 'skeleton': ''"
		class="machineintro flex-center">
		<view class="machineintro-item flex-start">
			<image
				:style="fixedImage ? 'height: 350rpx' : ''"
				:src="data.image"
				:mode="fixedImage ? 'aspectFill' : 'widthFix'"></image>
			<view class="machineintro-intro flex-between">
				<view class="intro-title">
					{{data.title}}
				</view>           
				<view class="intro-content">
					{{data.intro || '暂无简介'}}
				</view>
				<view class="intro-func flex-between">
					<view
						@click="this.$emit('clickTip', index)"
						v-if="data.type"
						class="intro-tip flex-center">{{data.type || ''}}</view>
	<!-- 				<view
						@click.stop="clickCollect"
						v-if="data.isCollect && !data.skeleton && !hideCollect"
						class="iconfont intro-collect icon-shoucang1"></view>
					<view
						@click.stop="clickCollect"
						v-if="!data.isCollect && !data.skeleton && !hideCollect"
						class="iconfont intro-nocollect icon-shoucang"></view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MachineIntro",
		props: ['data', 'index', 'hideCollect', 'fixedImage'],
		data() {
			return {
				image: '../../static/image/logo.png',
				info: this.data,
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
		},
		// onShow() {
		// 	let _this = this
		// 	apiRequest("isCollect", {
		// 		type: 1,
		// 		_id: _this.info._id
		// 	})
		// 		.then(res => {
		// 			console.log('isCollect')
		// 			console.log(res)
		// 			// _this.info.isCollect=res.isCollect
		// 		})
		// },
	}
</script>

<style lang="stylus">
@import "MachineIntro.styl";
</style>
