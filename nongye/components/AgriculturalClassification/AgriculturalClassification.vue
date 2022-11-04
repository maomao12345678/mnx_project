<template>
	<view
		@click="this.$emit('click', index)"
		class="agriculturalclassification flex-center">
		<view class="container">
			<image :src="data.image" mode="aspectFill"></image>
			<view class="background flex-center"></view>
			<view class="title flex-center">
				{{data.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"AgriculturalClassification",
		props: ['data', 'index'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="stylus">
@import './AgriculturalClassification.styl';
</style>
