<template>
	<view
		:style="activeIndex != 3 ? 'margin-top: ' + navHeight + 'px': ''"
		class="content">
		<!-- 导航栏 -->
		<AppHeader
			class="appheader"
			@click="skipSearch"
			v-if ="activeIndex != 3" />
		
		<scroll-view
			@scrolltolower="scrollToLower"
			:scroll-y="true"
			:style="'height: calc(100vh - ' + navHeight + 'px - 100rpx'"
			class="index-content"
			v-if ="activeIndex == 0">
			<view class="index-swiper"></view>
			<view
				class="index-main">
				<van-tabs
					:active="moduleIndex"
					title-active-color="#35ae6b"
					title-inactive-color="#404040"
					@change="clickTab"
					color="#35ae6b">
					<van-tab
						v-for="(item, index) in titles"
						:key="index"
						:title="item">
					</van-tab>
				</van-tabs>
				
				<view
					v-show="moduleIndex == 0"
					class="module-machine">
					<view class="machinelist-container flex-start">
						<MachineList
							class="machinelist-item"
							:key="index"
							:data="item"
							:index="index"
							@click="skipMachineClassficationDetail(index)"
							v-for="(item, index) in machines"/>
						<view
							v-if="moreModule"
							@click="foldModuleList"
							class="upPull flex-center">
							<view class="iconfont icon-shangla"></view>
						</view>
					</view>
				
					<view
						class="machineintro-container flex-start">
						<view class="machineintro-container-left flex-start">
							<!-- 左边列表 -->
							<MachineIntro
								class="machineintro-listitem"
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
								class="machineintro-listitem"
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
				
				<view
					v-if="moduleIndex == 1"
					class="module-knowledge">
						<swiper
							:autoplay="true"
							@change="changeSwiperIndex"
							:current="swiperIndex"
							class="swiper">
							<swiper-item
								class="swiper-item"
								v-for="(item, index) in swiperLists"
								:key="index"
								@click="skipKnowledgeDetail(index)">
								<image :src="item.image" mode="aspectFill"></image>
							</swiper-item>
						</swiper>
						<view class="swiper-intro">
							{{swiperLists[swiperIndex].title}}
							<view class="swiper-index flex-center">{{'0' + (swiperIndex + 1)}}</view>
						</view>
						<view class="classification flex-start">
							<AgriculturalClassification
								class="classification-item"
								v-for="(item, index) in knowledges"
								:key="index"
								:index="index"
								:data="item"
								@click="skipknowledgeClassficationDetail(index)"/>
						</view>
				</view>
				
				<view
					v-if="moduleIndex == 2"
					class="module-knowledge">
					<view class="feed">
						<view class="feedTitleFather flex-between">
							<view class="feedTitle flex-center">
								饲料
							</view>
							<view class="moreInfo flex-center" @click="getMoreFeed">
								<icon class="iconfont icon-gengduo flex-center"></icon>
								更多
							</view>
						</view>
						<view class="feedListFather flex-start">
							<!-- 这个是饲料页面 -->
							<FeedList 
								class="feedList" 
								v-for="(item, index) in feedBlogs"
								:key="index"
								:blogInfo="item"
							></FeedList>
						</view>
					</view>
					<view class="fertilizer">
						<view class="fertilizerTitleFather flex-between">
							<view class="fertilizerTitle flex-center">
								肥料
							</view>
							<view class="moreInfo flex-center" @click="getMoreFertilizer">
								<icon class="iconfont icon-gengduo flex-center"></icon>
								更多
							</view>
						</view>
						<view class="fertilizerListFather flex-start">
							<!-- 这个是肥料页面 -->
							<FertilizerList 
								class="fertilizerList" 
								v-for="(item, index) in fertilizerBlogs"
								:key="index"
								:blogInfo="item"
							></FertilizerList>
						</view>
					</view>
					<view class="medicine">
						<view class="medicineTitleFather flex-between">
							<view class="medicineTitle flex-center">
								农药
							</view>
							<view class="moreInfo flex-center" @click="getMoreMedicine"> 
								<icon class="iconfont icon-gengduo flex-center"></icon>
								更多
							</view>
						</view>
						<!-- 这个是农药页面 -->
						<view class="medicineListFather flex-start">
							<!-- 这个是肥料页面 -->
							<MedicineList 
								class="medicineList" 
								v-for="(item, index) in medicineBlogs"
								:key="index"
								:blogInfo="item"
							></MedicineList>
						</view>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
		<!-- 牧农互动 -->
		<Community v-show="activeIndex == 1" />
		
		<!-- 租赁页面 -->
		<lease v-show="activeIndex == 2" />
		
		<!-- 我的页面 -->
		<My
			:userinfo='userinfo'
			v-show="activeIndex == 3" />
		
		<!-- tabber -->
		<AppFooter
			class="appfooter"
			:activeIndex="activeIndex"
			@skipPage="skipPage" />
	</view>
</template>

<script>
import apiRequest from '../../common/request.js'
import {
	machineListsFilter,
	machineModulesFilter,
	agriculturalModulesFilter,
	agriculturalRecommendFilter,
	feedFilter,
	fertilizerFilter,
	medicineFilter
} from '../../common/filter.js'
import login from '../../common/login.js'
// 基础组件
import AppHeader from '../../base/AppHeader/AppHeader.vue'
import AppFooter from '../../base/AppFooter/AppFooter.vue'
// 页面组件
import Lease from '../lease/lease.vue'
import Community from '../community/community.vue'
import My from '../my/my.vue'
// 公用组件
import MedicineList from '../../components/MedicineList/MedicineList.vue'
import FertilizerList from '../../components/FertilizerList/FertilizerList.vue'
import FeedList from '../../components/FeedList/FeedList.vue'
import MachineList from '../../components/MachineList/MachineList.vue'
import MachineIntro from '../../components/MachineIntro/MachineIntro.vue'
import ListsLoading from '../../components/ListsLoading/ListsLoading.vue'
import AgriculturalClassification from '../../components/AgriculturalClassification/AgriculturalClassification.vue'
	export default {
		components:{
			AppHeader,
			AppFooter,
			Lease,
			My,
			Community,
			MachineList,
			MachineIntro,
			AgriculturalClassification,
			ListsLoading,
			FeedList,
			FertilizerList,
			MedicineList
		},
		onShow() {
			//用于我的页面展示数据
			let avatarUrl = uni.getStorageSync("avatarUrl")
			let username = uni.getStorageSync('nickName')
			let describe = uni.getStorageSync('describe')
			let unloadState = uni.getStorageSync('unloadState')
			let loadState = uni.getStorageSync('loadState')
			uni.getStorage({
				key: 'loadState',
				success: function (res) {
					if(res.data==true){
						loadState=true
						unloadState=false
					}else{
						loadState=false
						unloadState=true
					}
				},
				fail: function(res){
					console.log('没有登录')
					uni.setStorage({
						key: 'loadState',
						data: false,
					})
				}
			});
			this.userinfo = {
				avatarUrl,
				username,
				describe,
				unloadState,
				loadState,
			}
		},
		onPullDownRefresh() {//可以感知下拉刷新,刷新后list顺连续改变
			console.log('触发了下拉刷新')
		},
		data() {
			return {
				// 用户信息
				userinfo: {},
				// 路由界面索引，0为首页
				activeIndex: 0,
				// 当前模块索引
				moduleIndex: 0,
				// 农业知识轮播图索引
				swiperIndex: 0,
				// 状态栏距顶高度+自身高度
				navHeight: 0,
				// 更多机械分类展开
				// 模块分类
				titles: [
					'机械设备',
					'农业知识',
					'农资百科'
				],
				// 底部加载中
				loading: false,
				// 更多分类
				moreModule: false,
				// 当前请求页数
				curPage: 0,
				// 机械分类
				machines: [],
				// 完整的机械分类
				fullMachines: [],
				// 首次加载
				firstLoading: false,
				// 左边机械列表
				listLeft: [],
				// 右边机械列表
				listRight: [],
				// 左边机械容器高度
				leftHeight: 0,
				// 右边机械容器高度
				rightHeight: 0,
				// 农业知识分类
				knowledges: [],
				swiperLists: [],
				funcList: [],
				//饲料
				feedBlogs: [],
				fertilizerBlogs: [],
				medicineBlogs:[],
			}
		},
		async onLoad() {
			let _this = this
			// 设置分享
			uni.showShareMenu()
			// 获取状态栏高度
			const { statusBarHeight } = wx.getSystemInfoSync()
			// 得到右上角菜单的位置尺寸
			const menuButtonObject = wx.getMenuButtonBoundingClientRect()
			const { top, height } = menuButtonObject
			this.navHeight = top + height
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
			// let pList = {
			// 	_id: '10fb47c3628211f2017156bd5290e0bd',
			// 	title: '鸽子养殖的误区',
			// 	skeleton: true,
			// 	image: '',
			// 	intro: ''
			// }
			// for (let a = 0; a <= 8; ++a) {
			// 	this.knowledges.push(pList)
			// }
			//获得饲料列表
			apiRequest("getProductions", {
				page: 1,
				limit: 4,
				data_type: 1,
			})
				.then(res => {
					this.feedBlogs = feedFilter(res.data)
				})
			
			//获取肥料列表
			apiRequest("getProductions", {
				page: 1,
				limit: 4,
				data_type: 2,
			})
				.then(res => {
					this.fertilizerBlogs = fertilizerFilter(res.data)
				})
			
			//获取农药列表
			apiRequest("getProductions", {
				page: 1,
				limit: 4,
				data_type: 3,
			})
				.then(res => {
					this.medicineBlogs = medicineFilter(res.data)
				})
			
			// 获取机械分类列表
			apiRequest('getMachineClass')
				.then(data => {
					this.fullMachines = machineModulesFilter(data.data)
					// 初始化机械分类
					this.initModuleList()
				})
			
			// 获取农业知识分类
			apiRequest('getAgricultureClass')
				.then(data => {
					this.knowledges = agriculturalModulesFilter(data.data)
				})

			// 获取农业知识推荐
			apiRequest('getRecAgriculture')
				.then(data => {
					this.swiperLists = agriculturalRecommendFilter(data)
				})
				
			//调用机械推荐方法
			this.splitImageLists(await this.getRecMachines())
			
			//获取登录情况
			uni.getStorage({
				key: 'loadState',
				success: function (res) {
					// console.log('登录了')
				},
				fail: function(res){
					console.log('没有登录')
					uni.setStorage({
						key: 'loadState',
						data: false,
					})
				}
			});
			//获取登录情况
			uni.getStorage({
				key: 'unloadState',
				success: function (res) {
					// console.log('登录了')
				},
				fail: function(res){
					console.log('没有登录')
					uni.setStorage({
						key: 'unloadState',
						data: true,
					})
				}
			});
		},
		methods: {
			// 切换tabber
			skipPage(index) {
				this.activeIndex = index
			},
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
					// 获取有效图片高度
					this.getImgHeight(item.image)
						.then(imgInfo => {
							// console.log(imgInfo)
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
			// 跳转search页面
			skipSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			// 点击机械分类
			skipMachineClassficationDetail(index) {
				// 点击查看更多
				if (this.machines[index].more) {
					// 放上所有列表数据
					this.machines = this.fullMachines
					this.moreModule = true
					return
				}
				let type = this.machines[index].type
				let title = this.machines[index].title
				// 跳转至分类详情页面
				uni.navigateTo({
					url: `../../pages-knowledge/machineModuleDetail/machineModuleDetail?type=${type}&title=${title}`
				})
			},
			// 初始化机械分类
			initModuleList() {
				// 取五个，再加一个查看更多
				let slice = this.fullMachines.slice(0,5)
				slice.push({
					image: '../../static/image/logo.png',
					title: '查看更多',
					more: true
				})
				this.machines = slice
			},
			// 折叠机械分类
			foldModuleList() {
				this.moreModule = false
				this.initModuleList()
			},
			// 收藏控制
			controlCollect(direction, index) {
				// 未登录则显示登陆界面
				let userInfo = uni.getStorageSync('userInfo')
				if (!userInfo) {
					return login()
				}
				
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
			// 点击农业知识轮播图
			skipKnowledgeDetail(index) {
				let id = this.swiperLists[index]._id
				uni.setStorageSync(`argriculture_${id}`, this.swiperLists[index])
				uni.navigateTo({
					url: `../../pages-knowledge/agriculturalContentDetail/agriculturalContentDetail?id=${id}`
				})
			},
			// 点击农业知识分类
			skipknowledgeClassficationDetail(index) {
				let type = this.knowledges[index].type
				let title = this.knowledges[index].title
				// 跳转至分类详情页面
				uni.navigateTo({
					url: `../../pages-knowledge/agriculturalDetail/agriculturalDetail?type=${type}&title=${title}`
				})
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
					url: `../../pages-knowledge/machineDetail/machineDetail?id=${id}&index=${index}&location=${location}`
				})
			},
			// 切换模块标签
			clickTab(params) {
				this.moduleIndex = params.detail.index
			},
			// 滚动到底部加载更多
			async scrollToLower(events) {
				// 处于机械模块才运行
				if (this.moduleIndex == 0) {
					this.loading = true
					// 加载下一页
					++this.curPage
					// 拼接数组
					this.splitImageLists(await this.getRecMachines())
				}
			},
			// 改变轮播图索引
			changeSwiperIndex(events) {
				this.swiperIndex = events.detail.current
			},
			// 获取推荐机械信息
			getRecMachines() {
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getRecMachines", {
					limit: 10,			// 查询的记录条数
					page: this.curPage				// 页码
				})
					.then(res => {
						uni.hideLoading()
						return machineListsFilter(res.data)
					})
			},
			//农资部分
			getMoreFeed(){
				uni.navigateTo({
					url: '../../pages-knowledge/feedMore/feedMore'
				})
			},
			getMoreFertilizer(){
				uni.navigateTo({
					url: '../../pages-knowledge/fertilizerMore/fertilizerMore'
				})
			},
			getMoreMedicine(){
				uni.navigateTo({
					url: '../../pages-knowledge/medicineMore/medicineMore'
				})
			},
		}
	}
</script>

<style lang="stylus">
@import 'index.styl';
</style>
