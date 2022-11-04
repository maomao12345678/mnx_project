<template>
	<view
		@click="this.$emit('click', index)"
		class="machinelist flex-center">
		<image
			v-if="!data.more"
			:src="data.image || image" mode="aspectFill"></image>
		<view
			v-else
			class="iconfont-container">
			<view class="iconfont icon-liebiao">
				
			</view>
		</view>
		{{data.title}}
	</view>
</template>

<script>
	export default {
		name:"machineList",
		props: ['data', 'index'],
		data() {
			return {
				image: '../../static/image/logo.png'
			}
		}
	}
</script>

<style lang="stylus">
@import './MachineList.styl';
</style>
