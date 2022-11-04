<template>
	<view class="machinemoduledetail">
		<scroll-view
			@scrolltolower="scrollToLower"
			:scroll-y="true"
			class="index-content">
			<!-- <view class="index-swiper"></view> -->
			<view
				class="index-main">
				<view class="module-machine">
					<view class="machineintro-container flex-start">
						<view class="machineintro-container-left flex-start">
							<!-- 左边列表 -->
							<MachineIntro
								class="machineintro-item"
								:key="index"
								:index="index"
								@clickCollect="controlCollect('left', index)"
								@click="skipMachineDetail(index, 'left')"
								:data="item"
								v-for="(item, index) in listLeft"/>
						</view>
						
						<view class="machineintro-container-right flex-start">
							<!-- 右边列表 -->
							<MachineIntro
								class="machineintro-item"
								:key="index"
								:index="index"
								@clickCollect="controlCollect('right', index)"
								@click="skipMachineDetail(index, 'right')"
								:data="item"
								v-for="(item, index) in listRight"/>
						</view>
					</view>
					
					<ListsLoading
						class="lists-loading"
						v-if="loading" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import apiRequest from '../../common/request.js'
import {
	machineListsFilter
} from '../../common/filter.js'
// 公用组件
import MachineIntro from '../../components/MachineIntro/MachineIntro.vue'
import ListsLoading from '../../components/ListsLoading/ListsLoading.vue'
	export default {
		components: {
			MachineIntro,
			ListsLoading
		},
		async onLoad(params) {
			this.type = params.type
			uni.setNavigationBarTitle({
				title: params.title
			})
			let list = {
				_id: '7dab9bf6625eea4f0008b9657a4f49d6',
				title: '割晒机',
				skeleton: true,
				image: '',
				intro: ''
			}
			for (let a = 0; a <= 4; ++a) {
				this.listLeft.push(list)
				this.listRight.push(list)
			}
			//调用机械推荐方法
			this.splitImageLists(await this.getMachineByClass())
		},
		data() {
			return {
				// 请求的机械类别
				type: 0,
				// 底部加载中
				loading: false,
				// 当前请求页数
				curPage: 0,
				// 左边机械列表
				listLeft: [],
				// 右边机械列表
				listRight: [],
				// 左边机械容器高度
				leftHeight: 0,
				// 右边机械容器高度
				rightHeight: 0,
				// 是否无法加载
				isAll: false,
				// 首次加载
				firstLoading: false,
			}
		},
		methods: {
			// 根据图片高度，分为两个数组，形成左右瀑布流
			splitImageLists(list) {
				// 获取屏幕高度
				let windowWidth = 0
				uni.getSystemInfo({
					success: function (res){
						windowWidth = res.windowWidth / 2 * 0.92
					}
				})
				list.map(async item => {
					// 如果请求的图片域名为http则直接将图片放到短的数组中，并默认平均高度
					if (item.image.indexOf('http://') != -1) {
						//375是计算后的高度
						let defaultHeight = 173
						if (this.rightHeight >= this.leftHeight) {
							this.listLeft.push(item)
							this.leftHeight += defaultHeight
						}	else {
							this.listRight.push(item)
							this.rightHeight += defaultHeight
						}
						return
					}
					// 如果还没进行首次加载，则清空原来的骨架屏列表
					if (!this.firstLoading) {
						this.listLeft = []
						this.listRight = []
						this.firstLoading = true
					}
					// 获取有效图片高度
					this.getImgHeight(item.image)
						.then(imgInfo => {
							// 按屏幕比例计算图片高度
							let imgHeight = parseInt(windowWidth / imgInfo.width * imgInfo.height)
							if (this.rightHeight >= this.leftHeight) {
								this.listLeft.push(item)
								this.leftHeight += imgHeight
							} else {
								this.listRight.push(item)
								this.rightHeight += imgHeight
							}
						})
				})
			},
			// 获取图片高度
			getImgHeight(url) {
				return new Promise(resolve=>{
					wx.getImageInfo({
						src: url,
						success (res) {
							resolve(res)
						}
					})
				})
			},
			// 更新List
			updateList(index, data, location) {
				// 根据传进来的键值更新信息
				for (let key in data) {
					if (location == 'left')
						this.$set(this.listLeft[index], key, data[key])
					if (location == 'right')
						this.$set(this.listRight[index], key, data[key])
				}
			},
			// 点击卡片进入详情页
			skipMachineDetail(index, location) {
				let id = 0
				if (location == 'left') {
					id = this.listLeft[index]._id
					uni.setStorage({
						key: 'machine_' + id,
						data: this.listLeft[index]
					})
				} else {
					id = this.listRight[index]._id
					uni.setStorage({
						key: 'machine_' + id,
						data: this.listRight[index]
					})
				}
				uni.navigateTo({
					url: `../machineDetail/machineDetail?id=${id}&index=${index}&location=${location}`
				})
			},
			// 收藏控制
			controlCollect(direction, index) {
				// 确定收藏列表方向
				let list = this.listLeft[index]
				if (direction == 'right') {
					list = this.listRight[index]
				}
				if(!list.isCollect){
					// 未收藏
					apiRequest("insertCollect", {
						_id: list._id,
						type: 1,
					})
						.then(res => {
							// 当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，
							// 向对象中添加新的属性，如果更新此属性的值，是不会更新视图的
							// this.$set(this.detailInfor, 'isCollect', true)
							// this.detailInfor.isCollect=true
							list.isCollect = true
						})
				}else{
					// 已收藏
					apiRequest("cancelCollect", {
						_id: list._id,
						type: 1,
					})
						.then(res => {
							console.log(res)
							list.isCollect = false
						})
				}
			},
			// 滚动到底部加载更多
			async scrollToLower(events) {
				this.loading = true
				// // 加载下一页
				++this.curPage
				// // 拼接数组
				this.splitImageLists(await this.getMachineByClass())
			},
			// 获取推荐机械信息
			getMachineByClass() {
				// 无法加载更多数据
				if (this.isAll) return
				
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getMachineByClass", {
					// 查询的记录条数
					limit: 20,
					// 页码
					page: this.curPage,
					// 机械类别
					type: parseInt(this.type)
				})
					.then(res => {
						uni.hideLoading()
						// 无法加载更多数据
						if (res.data.length == 0) this.isAll = true
						return machineListsFilter(res.data)
					})
			}
		}
	}
</script>

<style lang="stylus">
@import 'machineModuleDetail.styl';
</style>
