<template>
	<view class="shareCommunity">
		<view class="sharePhotosFather flex-start">
			<view class="sharePhotos" @click="addImages">
				<icon class="sharePhoto iconfont icon-tianjiatupian"></icon>
			</view>
			<view class="shareHint" v-if="shareBlog.blogPhotosArray.length==0">
				<view class="hint-1">点击上传图片</view>
				<view class="hint-2">*至少上传一张图片</view>
			</view>
			<scroll-view 
				class="showMyPhotoFather"
				scroll-x="true"
				v-if="shareBlog.shareBlogPhotos.length!=0">
				<!-- <view class="showMyPhotoView"> -->
				<image class="showMyPhoto" v-for="(url,index) in shareBlog.blogPhotosArray" :src="url"></image>
				<!-- </view> -->
				<!-- asdasdasdasdsadasdsadsadsadsadasdasdasdsadasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdas -->
			</scroll-view>
		</view>
		<view class="shareNumberFather flex-end">
			<view class="shareNumber">最多可以上传9张图片</view>
		</view>
		<view class="shareNameFather">
			<input 
				class="shareName" 
				placeholder="给您的分享取一个名字吧..."
				adjust-position="true"
				@confirm="addTitle($event)"
				@input="addTitle($event)"
				:value="shareBlog.shareBlogTitle">
			</input>
		</view>
		<view class="shareContentFather">
			<view class="title">正文</view>
			<view class="shareContent">
				<!-- <input class="shareContentInput" placeholder="说说您此刻想说的话吧..."></input> -->
				<textarea 
					class="shareContentInput" 
					placeholder="说说您此刻想说的话吧..."
					@confirm="addContent($event)"
					@input="addContent($event)"
					maxlength=300
					:value="shareBlog.shareBlogContent">
					</textarea>
			</view>
		</view>
		<view class="shareNumberFather flex-end">
			<view class="shareNumber">最多可以输入300字</view>
		</view>
		<view class="whoCanSeeBtnFather">
			<view class="whoCanSeeTitle">谁可以看</view>
			<view class="whoCanSeePublicFather flex-start">
				<view class="whoCanSeePublic">公开</view>
				<switch class="whoCanSeeBtn" 
						checked='true'
						@change="judgePublicOrNot($event)"></switch>
			</view>
		</view>
		<view class="shareBlogBtnFather flex-center">
		<!-- 	<view class="saveBlogBtn flex-center" @click="saveBlog">
				存草稿
			</view> -->
			<view class="shareBlogBtn flex-center" @click="shareMyBlog">
				修改分享
			</view>
		</view>
	</view>
</template>

<script>
	//导入获取云函数的数据
	import apiRequest from '../../common/request.js'
	import {uploadImage} from '../../common/oss.js'
	export default {
		name:"ShareCommunity",
		data() {
			return {
				shareBlog: {
					shareBlogPhotos:[],
					shareBlogTitle:"",
					shareBlogContent:"",
					shareBlogPublic: true,
					blogPhotosArray: [],
				},	
				shareBlogId: "",
			}
		},
		onLoad() {
			let _this = this
			uni.getStorage({
				key: 'blog',
				success: function (res) {
					console.log(res.data);
					if(res.data!=null){
						_this.shareBlog.shareBlogPhotos = res.data.blogPhoto
						_this.shareBlog.shareBlogTitle = res.data.blogTitle
						_this.shareBlog.shareBlogContent = res.data.blogContent
						_this.shareBlogId = res.data.blogId
						_this.shareBlog.blogPhotosArray = res.data.blogPhoto
					}
				}
			});
		},
		methods: {
			addImages(){
				let _this = this
				//修改头像
				// uni.chooseImage({
				// 	count: 9, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album'], //从相册选择
				// 	success: function (res) {
				// 		// console.log(JSON.stringify(res.tempFilePaths));
				// 		// this.image=res.tempFilePaths[0]
				// 		// console.log(res.tempFilePaths[0])
						
				// 		// console.log(_this.shareBlog)
				// 	}
				// });
				wx.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						let filePath = res.tempFilePaths;
						for(let path of filePath){
							// uni.uploadFile({
							//     url: 'http://localhost:3000/oss/uploadImage',
							//     filePath: path,
							//     name: 'files',
							//     header: {
							//         'upload-type': 'interactive'
							//     },
							//     success: res => {
							// 		_this.shareBlog.shareBlogPhotos.push(path)
							//         console.log(res)
							//         console.log(JSON.parse(res.data))
							// 		_this.shareBlog.blogPhotosArray.push(JSON.parse(res.data).data[0])
							//     }
							// })
							uploadImage({
								type: 'interactive',
								filePath: path
							})
								.then(res =>{
									console.log(res)
									// _this.shareBlog.shareBlogPhotos.push(res)
									// _this.shareBlog.shareBlogPhotos.push(res)
									// _this.shareBlog.blogPhotosArray.push(res)
									_this.shareBlog.blogPhotosArray.push(res)
								})
						}						
					}
				})
			},
			addTitle: function(data){
				let _this = this
				// console.log(data)
				_this.shareBlog.shareBlogTitle=data.detail.value
				// console.log(data.detail.value)
			},
			addContent: function(data){
				let _this = this
				// console.log(data)
				_this.shareBlog.shareBlogContent=data.detail.value
				// console.log(data.detail.value)
			},
			judgePublicOrNot: function(data){
				let _this = this
				// console.log(data)
				_this.shareBlog.shareBlogPublic=data.detail.value
				// console.log(data.detail.value)
			},
			saveBlog: function(){
				let _this = this
				uni.setStorage({
					key: 'shareBlog',
					data: _this.shareBlog
				})
				console.log('保存成功')
				uni.showToast({
					title: '保存成功',
					duration: 2000
				});
				// uni.removeStorage({
				// 	key: 'storage_key',
				// 	success: function (res) {
				// 		console.log('success');
				// 	}
				// });
			},
			shareMyBlog: function(){
				let _this = this
				if(_this.shareBlog.shareBlogTitle==""){
					uni.showToast({
						title: '题目不能为空，请继续输入！',
						icon: 'error',
						duration: 2000
					});
				}else if(_this.shareBlog.shareBlogContent==""){
					uni.showToast({
						title: '内容不能为空，请继续输入！',
						icon: 'error',
						duration: 2000
					});
				}else if(_this.shareBlog.blogPhotosArray.length==0){
					uni.showToast({
						title: '照片不能为空，请继续输入！',
						icon: 'error',
						duration: 2000
					});
				}else{
					uni.setStorage({
						key: 'shareBlog',
						data: _this.shareBlog
					})
					console.log('修改成功')
					apiRequest('updateCommunity', {
						_id: _this.shareBlogId,
						images: _this.shareBlog.blogPhotosArray,
						title: _this.shareBlog.shareBlogTitle,
						content: _this.shareBlog.shareBlogContent,
						isvisible: _this.shareBlog.shareBlogPublic,
					})
						.then(data => {
							console.log(data)
						})
					uni.showToast({
						title: '修改成功',
						duration: 2000
					});
					// //设置延时
					// setInterval(() => {
					//     //TODO 
					// 	uni.hideLoading()
					// }, 2000);
					// uni.navigateBack({
					// 		delta:1,//返回层数，2则上上页
					// })
					uni.redirectTo({
						url: "../../pages/index/index"
					})
					// 离开页面销毁缓存
					uni.removeStorage({
						key: 'shareBlog',
					})
					// uni.removeStorage({
					// 	key: 'storage_key',
					// 	success: function (res) {
					// 		console.log('success');
					// 	}
					// });
				}
			},
		},
	}
</script>

<style lang="stylus">
@import 'myBlogEdit.styl';
</style>
