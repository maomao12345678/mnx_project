<template>
	<view class="myMessage">
		<view class="messageFather">
			<!-- <image class="backgroudPhoto" :src="backgroudPhoto"></image> -->
			<image class="myPhoto flex-start" :src="photo"></image>
			<view class="myName flex-start">用户名：{{name}}</view>
			<view class="myAddress flex-start">联系地址：{{address || '这家伙很神秘，不告诉你地址'}}</view>
			<view class="myIntroduce flex-start">个人简介：{{introduce || '这家伙很神秘，没有写个人简介'}}</view>
		</view>
	</view>
</template>

<script>
	//导入获取云函数的数据
	import apiRequest from '../../common/request.js'
	export default {
		name: "myMessage",
		components:{
			
		},
		data() {
			return {
				backgroudPhoto: '../../static/image/welcome05.png',
				photo: '',
				name: '',
				introduce: '',
				userId: '',
				address: '',
			}
		},
		methods:{
			
		},
		onLoad() {
			let _this = this
			uni.getStorage({
				key: 'userId',
				success: function (res) {
					// console.log(res.data);
					_this.userId = res.data
				}
			})
			apiRequest('getUserInfo')
				.then(data => {
					console.log('getUserInfo')
					console.log(data)
					_this.introduce = data.data[0].introduction
					_this.name = data.data[0].username
					_this.photo = data.data[0].headimage
					_this.address = data.data[0].address
				})
		}
	}
</script>

<style lang="stylus">
	@import 'myMessage.styl';
</style>
