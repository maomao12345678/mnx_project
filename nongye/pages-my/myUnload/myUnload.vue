<template>
	<view class='my'>
		<!--图片，用户名，电话-->
		<view class='profile' :style="'padding-top:'+top+'px'">
			<!--头像-->
			<view class='profile-photo'>
				<image class="photo" src="../../static/image/profile-photo.jpeg"></image>
			</view>
			<!--用户名和电话-->
			<view class='profile-name-phone'>
				<view class='name'>
					用户名：maomao
				</view>
				<view class='phone'>
					电话：188****888
				</view>
			</view>
		</view>
		<!-- <view class="black"></view> -->
		<!--我的-列表 info,index是与子控件传输数据的接口-->
		<view class="MyList-father">
			<MyList  
				v-for="(item, index) in nameList"
				:key="index"
				:info="item"
				:index="index"
				@clickMe="clickMe"
			/>
		</view>
	</view>
</template>

<script>
	//这里不要忘记倒入组件
	import MyList from "../../components/MyList/MyList.vue"
	export default {
		components: {
			MyList //不要忘记这里要先声明使用的自定义组件
		},
		data() {
			return {
				nameList:[{
						name:'基本信息',
						icon:'icon-jibenxinxi',
					}, {
						name:'我的收藏',
						icon:'icon-wodeshoucang'
					}, {
						name:'联系我们',
						icon:'icon-lianxiwomen'
					}, {
						name:'设置',
						icon:'icon-shezhi'
				}],
				top: 0
			}
		},
		methods: {
			clickMe(index){
				if(index==0){
					//跳到基本信息页面
					uni.navigateTo({
						url:"../basicMessage/basicMessage"
					})
				}else if(index==1){
					//点击就跳转到myCollect页面
					uni.navigateTo({
						url:"../myCollect/myCollect"
					})
				}else if(index==2){
					//跳转到联系我们页面
					uni.navigateTo({
						url:"../contactUs/contactUs"
					})
				}else if(index==3){
					//跳转到设置页面
					uni.navigateTo({
						url:"../setting/setting"
					})
				}
			},
			onReady () {
				// 获取状态栏高度
				const { statusBarHeight } = wx.getSystemInfoSync()
				// 得到右上角菜单的位置尺寸
				const menuButtonObject = wx.getMenuButtonBoundingClientRect()
				const { top, height } = menuButtonObject
				this.top = top + height
			}
		}
	}
</script>

<!--这里要先倒入styl文件-->
<!--不要忘记这里要倒入这个styl文件-->
<style lang="stylus">
@import './myUnload.styl';
</style>
