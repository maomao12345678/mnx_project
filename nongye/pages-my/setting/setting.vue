<template>
	<!--列表-->
	<view class="settingsList-father">
		<view class="shareBtnFather">
			<button class='shareBTN flex-between' @click="clickShare" open-type="share">
				<view class="share-icon flex-between">
					<view class="iconfont icon-fenxiang"></view>
					<view class="share-text">小程序分享</view>
					<!-- <image src="../../static/image/logo.png"></image> -->
				</view>
				<view class="share-arrow icon-jiantou iconfont">
				</view>
			</button>
		</view>
		<MyList
			v-for="(item, index) in nameList"
			:key="index"
			:info="item"
			:index="index"
			@clickMe="clickMe"
			class="settingsList"
		/>
	</view>
</template>

<script>
	import MyList from "../../components/MyList/MyList.vue"
	export default {
		components: {
			MyList
		},
		data() {
			return {
				nameList:[{
						name:'退出登陆',
						icon:'icon-tuichu'
					}]
			}
		},
		onLoad() {
		},
		methods: {
			clickMe(index){
				if(index==0){
					//跳到基本信息页面
					let _this = this
					uni.showModal({
						title: '请问是否要退出',
						confirmText: '确定',
						cancelText: '取消',
						showCancel: true,
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.clearStorage();
								uni.redirectTo({
									url: "../../pages/index/index"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
						fail: (err) => {
							console.log(err)
						},
					});
				}
			},
			clickShare(){
				//分享小程序
				uni.share({
					provider: "weixin",
					scene: "WXSceneTimeline",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "uni-app分享",
					summary: "我正在使用牧农兴，赶紧跟我一起来体验！",
					imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
					// imageUrl: "../../static/image/logo.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
		}
	}
</script>

<style lang="stylus">
@import './setting.styl';
</style>
