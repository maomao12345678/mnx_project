<template>
	<view class="sendlease">
		<view class="tool flex-between">
			<view
				@click="saveDraft"
				v-if="!isEdit"
				class="save-button">
				存草稿
			</view>
			<view
				v-if="isEdit"
				@click="deleteLease"
				class="send-button delete">
				删除
			</view>
			
			<view
				@click="sendLease"
				class="send-button">
				{{ isEdit ? '修改' : '发布'}}
			</view>
			
		</view>
		<textarea
			placeholder="请描述下您的农具情况"
			class="content-input"
			v-model="content"
			maxlength="150"></textarea>
		<view class="photo-list flex-start">
			<view
				v-for="item, index in photo"
				:key="index"
				class="photo-item flex-center">
				<image :src="item" mode="aspectFill"></image>
				<view
					@click="deletePhoto(index)"
					class="icon-tabguanbi iconfont"></view>
			</view>
			<view
				class="photo-item flex-center"
				@click="addPhoto">
				添加更多细节图片
			</view>
		</view>
		<view
			@click="getLocation"
			class="location flex-start">
			<view class="iconfont icon-weizhi"></view>
			{{location || '点击更新位置'}}
			<view class="iconfont icon-jiantou"></view>
		</view>
		<view class="clear"></view>
		<view class="classification flex-between list">
			<view class="list-left flex-start">
				<view class="iconfont icon-fenlei"></view>
				机械分类
			</view>
			
			<view
				@click="isShowList = !isShowList"
				class="list-right flex-start">
				{{classification[cindex]}}
				<view
					:class="isShowList ? 'active' : ''"
					class="iconfont icon-jiantou"></view>
			</view>
		</view>
		<view
			v-if="isShowList"
			class="classification-list flex-start">
			<view
				@click="clickTip(index)"
				v-for="item, index in classification"
				:class="cindex == index ? 'active' : ''"
				class="classification-list-item">{{item}}</view>
		</view>
		<view class="money flex-between list">
			<view class="list-left flex-start">
				<view class="iconfont icon-jiage"></view>
				参考价格
			</view>
			<view
				@click="isInput = true"
				class="list-right flex-start">
				￥{{money}}
				<view
				:class="cindex == index ? 'active' : ''"
				class="iconfont icon-jiantou"></view>
			</view>
		</view>
		
		<view
			v-if="isInput"
			@click="isInput = false"
			class="money-input-container">
			<view
				@click.stop
				class="money-input flex-between">
				参考价格
				<view class="money-input-right flex-start">
					￥
					<input
						type="number" v-model='money'>
				</view>
				<view
					@click="isInput = false"
					class="money-input-confirm flex-center">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { uploadImage } from '../../common/oss.js'
import apiRequest from '../../common/request.js'
	export default {
		data() {
			return {
				content: '',
				photo: [],
				location: '',
				classification: [
					'收获机械',
					'耕整地机械',
					'种植施肥机械',
					'田间管理机械',
					'收获后处理设备',
					'农产品初加工机械',
					'畜牧水产养殖机械',
					'动力输送机械',
					'排灌机械',
					'基建设施农业设备',
					'智慧新农业'],
				cindex: 0,
				money: '',
				isShowList: false,
				isInput: false,
				isEdit: false
			}
		},
		onLoad(params) {
			console.log(params)
			// 如果传入isEdit，则进入编辑模式
			if (params.isEdit) {
				this.isEdit = true
				let info = uni.getStorageSync('editLease')
				// 将信息还原到页面中
				this.photo = info.imageArr
				this.content = info.title
				this.money = info.money
				this.cindex = this.classification.indexOf(info.type)
				this.location = info.location
				this.id = info._id
			}
		},
		watch: {
			money(e) {
				this.money = e.replace(/[^\d]/g, '')
			}
		},
		methods: {
			// 上传图片
			addPhoto() {
				wx.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						uni.showLoading({
							title: '上传中'
						})
						let filePath = res.tempFilePaths
						for (let photo of filePath) {
							uploadImage({
								filePath: photo,
								type: 'lease'
							})
								.then(img => {
									this.photo.push(img)
									uni.hideLoading()
								})
						}
					}
				})
			},
			// 删除图片
			deletePhoto(index) {
				console.log(this.photo)
				this.photo.splice(index, 1)
			},
			// 发布租赁信息
			sendLease() {
				// 发布模式
				if (!this.isEdit) {
					if (this.content.trim() == '') {
						return uni.showToast({
								title: '请填写描述内容',
								icon: 'none'
							})
					}
					if (this.photo.length == 0) {
						return uni.showToast({
								title: '请上传至少一张图片',
								icon: 'none'
							})
					}
					if (this.money == '') {
						return uni.showToast({
								title: '请设定参考价格',
								icon: 'none'
							})
					}
					uni.showLoading({
						title: '发布中'
					})
					apiRequest('insertLease', {
						content: this.content,
						images: this.photo,
						machine_type: this.classification[this.cindex],
						price: this.money,
						address: this.location
					})
						.then(res => {
							uni.hideLoading()
							uni.showToast({
								title: '发布成功'
							})
							// 清除缓存，返回界面
							uni.removeStorage({
								key: 'leaseInfo'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: -1
								})
							}, 1500)
						})
				} else {
					if (this.content.trim() == '') {
						return uni.showToast({
								title: '请填写描述内容',
								icon: 'none'
							})
					}
					if (this.photo.length == 0) {
						return uni.showToast({
								title: '请上传至少一张图片',
								icon: 'none'
							})
					}
					if (this.money == '') {
						return uni.showToast({
								title: '请设定参考价格',
								icon: 'none'
							})
					}
					uni.showLoading({
						title: '修改中'
					})
					// 编辑模式
					apiRequest('updateLease', {
						content: this.content,
						_id: this.id,
						images: this.photo,
						machine_type: this.classification[this.cindex],
						price: this.money,
						address: this.location
					})
						.then(res => {
							uni.hideLoading()
							uni.showToast({
								title: '修改成功'
							})
							// 清除缓存，返回界面
							uni.removeStorage({
								key: 'leaseInfo'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: -1
								})
							}, 1500)
						})
				}
			},
			// 删除
			deleteLease() {
				let _this = this
				uni.showModal({
					content: '确定要删除吗',
					success: (res) => {
						if (res.confirm) {
							apiRequest('deleteLeaseById', {
								lease_id: _this.id
							})
								.then(() => {
									uni.showToast({
										title: '删除成功'
									})
									// 清除缓存，返回界面
									uni.removeStorage({
										key: 'leaseInfo'
									})
									setTimeout(() => {
										uni.navigateBack({
											delta: -1
										})
									}, 1500)
								})
						}
					}
				})
			},
			// 存草稿
			saveDraft() {
				let _this = this
				uni.setStorage({
					key: 'leaseInfo',
					data: {
						content: _this.content,
						photo: _this.photo,
						location: _this.location,
						cindex: _this.cindex,
						money: _this.money
					},
					success() {
						uni.showToast({
							title: '保存成功'
						})
					}
				})
			},
			// 点击机械分类标签
			clickTip(index) {
				this.cindex = index
			},
			// 获取当前地理位置
			getLocation() {
				// 获取地理位置
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: (res)=>{
						let _this=this
						const latitude = res.latitude
						const longitude = res.longitude
						uni.request({
							header:{
								"Content-Type": "application/text"
							},
							//注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
							url:'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location='+res.longitude+','+res.latitude+'&key=280802ed0116fef931dbcf5e7e9278d7&radius=1000&extensions=all',
							success(re) {
								console.log(re)
								if(re.statusCode===200){
									var province = re.data.regeocode.addressComponent.province
									var city = re.data.regeocode.addressComponent.city
									var district = re.data.regeocode.addressComponent.district
									var area = province + city + district
									console.log(area)
									_this.location = area
								}else{
									console.log("获取信息失败，请重试！")
								}
							},
							fail(re){
								console.log(re)
							}
						})
					}
				})
			}
		},
		created() {
			let _this = this
			uni.getStorage({
				key: 'leaseInfo',
				success(res) {
					res = res.data
					console.log(res)
					_this.content = res.content
					_this.location = res.location
					_this.photo = res.photo || []
					_this.cindex = res.cindex || 0
					_this.money = res.money || 0
				},
				fail() {
					
				}
			})
		}
	}
</script>

<style lang="stylus">
@import './sendLease.styl';
</style>
