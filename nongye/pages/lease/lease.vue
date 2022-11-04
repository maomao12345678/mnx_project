<template>
	<scroll-view
		@scrolltolower="scrollToLower"
		:style="'height: calc(100vh - ' + navHeight + 'px - 100rpx - 90rpx'"
		:scroll-y="true"
		class="lease">
		<view class="lease-swiper"></view>
		
		<view class="lease-good flex-start">
			<view class="lease-good-left">
				<LeaseGood
					v-for="item, index in listLeft"
					:data="item"
					@click="skipGoodDetail(index, 'left')"
					class="good"
					:key="index"
					/>
			</view>
			
			<view class="lease-good-right">
				<LeaseGood
					v-for="item, index in listRight"
					@click="skipGoodDetail(index, 'right')"
					:data="item"
					class="good"
					:key="index"
					/>
			</view>
		
			<ListsLoading
				class="lists-loading"
				v-if="loading" />
		</view>
		
		<view
			:style="'top:'+navHeight+'px'"
			class="send-container">
			<view
				@click="enterSendPage"
				class="send flex-center">
				<view class="icon-fabu iconfont"></view>
				发布
			</view>
		</view>
	</scroll-view>
</template>

<script>
import apiRequest from '../../common/request.js'
import LeaseGood from '../../components/leaseGood/leaseGood.vue'
import ListsLoading from '../../components/ListsLoading/ListsLoading.vue'
import { leaseListFilter } from '../../common/filter.js'
	export default {
		components:{
			LeaseGood,
			ListsLoading
		},
		data() {
			return {
				navHeight: 0,
				listLeft: [],
				listRight: [],
				leftHeight: 0,
				rightHeight: 0,
				loading: false,
				curPage: 0,
				// 首次加载
				firstLoading: false,
			}
		},
		async onReady() {
			// 设置分享
			uni.showShareMenu()
			// 获取状态栏高度
			const { statusBarHeight } = wx.getSystemInfoSync()
			// 得到右上角菜单的位置尺寸
			const menuButtonObject = wx.getMenuButtonBoundingClientRect()
			const { top, height } = menuButtonObject
			this.navHeight = top + height + 8
			let list = {
				skeleton: true,
				money: 1233
			}
			for (let a = 0; a <= 4; ++a) {
				this.listLeft.push(list)
				this.listRight.push(list)
			}
			uni.showLoading({
				title: '加载中'
			})
			this.splitImageLists(await this.getLeaseList())
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
				// 如果还没进行首次加载，则清空原来的骨架屏列表
				if (!this.firstLoading) {
					this.listLeft = []
					this.listRight = []
					this.firstLoading = true
				}
				list.map(async item => {// 获取有效图片高度
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
			// 进入发布页面
			enterSendPage() {
				uni.navigateTo({
					url: `../../pages-lease/sendLease/sendLease`
				})
			},
			// 点击卡片进入详情页
			skipGoodDetail(index, location) {
				console.log(index, location)
				let id = 0
				if (location == 'left') {
					id = this.listLeft[index]._id
					uni.setStorage({
						key: 'lease_' + id,
						data: this.listLeft[index]
					})
				} else {
					id = this.listRight[index]._id
					uni.setStorage({
						key: 'lease_' + id,
						data: this.listRight[index]
					})
				}
				uni.navigateTo({
					url: `../../pages-lease/goodsDetail/goodsDetail?id=${id}`
				})
			},
			// 滚动到底部加载更多
			async scrollToLower(events) {
				// 已经加载所有数据
				if (this.curPage == -1) return
				// 处于机械模块才运行
				this.loading = true
				// 加载下一页
				++this.curPage
				// 拼接数组
				let list = await this.getLeaseList()
				console.log(list)
				// 无法加载更多信息，使当前页面为-1
				if (list.length == 0) return this.curPage = -1
				this.splitImageLists(list)
			},
			// 获取推荐机械信息
			getLeaseList() {
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getLeases", {
					limit: 10,			// 查询的记录条数
					page: this.curPage				// 页码
				})
					.then(res => {
						uni.hideLoading()
						return leaseListFilter(res.data)
					})
			}
		}
	}
</script>

<style lang="stylus">
@import './lease.styl';
</style>
