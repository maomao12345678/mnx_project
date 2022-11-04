<!--我的-基本信息的列表-->
<template>
	<view class="MessageList flex-between" @click="this.$emit('clickMe', index)">
		<view class="MessageList-word flex-between">
			{{info.name}}
		</view>
		<view class="rightBlock flex-end">
			<image class="photo" v-if="index==0" :src="image"></image>
			<view class="username" v-if="index==1">{{myName}}</view>
			<view class="username" v-if="index==2">{{phone}}</view>
			<view class="username" v-if="index==3">{{describe}}</view>
			<view class="username" v-if="index==4">{{address}}</view>
			<view class="MessageList-arrow icon-jiantou iconfont"/>
		</view>
	</view>
</template>

<script>
	export default {
		name: "MessageList",
		props: ['info','index','image','myName','phone','describe','address'],
		data() {
			return {
				
			}
		},
		methods: {
			
		},
	}
</script>

<style lang='stylus'>
	@import "MessageList.styl";
</style>
