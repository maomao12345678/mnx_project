<template>
	<!--我的-列表的每个小模块-->
	<view class="MyList flex-between" @click="this.$emit('clickMe', index)">
		<view class="MyList-icon flex-between">
			<view class="iconfont" :class="info.icon"></view>
			{{info.name}}
		</view>
			<view class="MyList-arrow icon-jiantou iconfont">
		</view>
	</view>
</template>

<!--props用于与父控件进行数据传输的接口-->
<script>
	export default {
		name: "MyList",
		props: ['info','index'],
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style lang='stylus'>
	@import "MyList.styl";
</style>
