<template>
	<view class="searchcommon" @click="this.$emit('click')">
		<view class="content-container flex-start">
			<image :src="data.image" mode="aspectFill"></image>
			<view class="card-right flex-between">
				<view class="card-title">
					{{data.title}}
				</view>
				<view class="card-content">
					{{data.content || ''}}
				</view>
			</view>
		</view>
		
	<!-- 	<view class="func-container flex-between" v-if="data.type">
			<view class="func-type">
				{{data.type}}
			</view>
			
		</view> -->
	</view>
</template>

<script>
	export default {
		name:"SearchCommon",
		props: ['data'],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="stylus">
@import "./SearchCommon.styl";
</style>