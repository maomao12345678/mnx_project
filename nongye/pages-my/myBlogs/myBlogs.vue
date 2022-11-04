<template>
	<view class="community">
		<scroll-view class="communityScroll"
			@scrolltolower="scrollToLower"
			:scroll-y="true">
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
		<!-- 	<view class="communityShowWord flex-between">
				<view class="communityShowWord flex-center">
					我的发布
				</view>
			</view> -->
			<view class="communityFather flex-start" v-show="moduleIndex == 0">
				<!-- 这个是社区页面 -->
				<MyBlogList 
					class="communityList" 
					v-for="(item, index) in blogs"
					:key="index"
					:blogInfo="item"
					:communityId="index"
				></MyBlogList>
				
				<!-- 内容为空 -->
				<NullStatus
					title="无发布内容,快去发布试试看吧"
					content="发布"
					v-if="blogs.length == 0"
					@click="shareMyCommunity" />
			</view>
			<view class="leaseFather flex-between" v-show="moduleIndex==1">
				<LeaseGood
					v-for="item, index in leaseList"
					:data="item"
					@click="editLeasePage(item)"
					class="good"
					mode="aspectFill"
					:key="index"
					/>
					
				<!-- 内容为空 -->
				<NullStatus
					title="无发布内容,快去发布试试看吧"
					content="发布"
					v-if="leaseList.length == 0"
					@click="skipLeasePage" />
			</view>
		</scroll-view>
		<!-- <ListsLoading class="lists-loading" v-if="loading" /> -->
		<view class="myShareFather flex-center">
			<view class="myShare flex-center" @click="shareMyCommunity" v-if="moduleIndex==0">
				社区发布
			</view>
			<view class="myShare flex-center"  @click="skipLeasePage" v-if="moduleIndex==1">
				租赁发布
			</view>
		</view>
	</view>
</template>

<script>
	//导入获取云函数的数据
	import apiRequest from '../../common/request.js'
	import {
		communityBlogsFilter,
		myBlogsFilter,
		leaseListFilter
	} from '../../common/filter.js'
	import CommunityList from "../../components/CommunityList/CommunityList.vue"
	import ListLoading from '../../components/ListsLoading/ListsLoading.vue'
	import LeaseGood from '../../components/leaseGood/leaseGood.vue'
	import NullStatus from '../../components/NullContent/NullContent.vue'
	import MyBlogList from '../../components/MyBlogList/MyBlogList.vue'
	export default {
		name: "community",
		components: {
			//不要忘记这里要先声明使用的自定义组件
			ListLoading,
			MyBlogList,
			LeaseGood,
			NullStatus
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
			//社区部分
			// let cList = {
			// 	_id: 'f6e08a64627b7d0c0266b065247ee2bd',
			// 	title: '广州三日两夜游',
			// 	skeleton: true,
			// 	images: '',
			// 	content: '哈哈哈哈哈'
			// }
			// for (let a = 0; a <= 8; ++a) {
			// 	this.blogs.push(cList)
			// }
			uni.getStorage({
				key: 'nickName',
				success(res) {
					_this.name = res.data
					console.log(_this.name)
				}
			})
		},
		async onShow() {
			this.blogs = await this.getRecCommnunityBlogs()
			this.leaseList = await this.getLeaseList()
		},
		data() {
			return {
				// 底部加载中
				// loading: false,
				// 当前请求页数
				curPage: 0,
				curLeasePage: 0,
				// 博客列表
				navHeight: 0,
				//展示列表
				lists: [],
				username: '',
				// 首次加载社区
				firstCommunityLoadding: false,
				blogs:[],
				leaseList: [], 
				titles: ['社区发布', '租赁发布'],
				moduleIndex: 0,
			}
		},
		methods: {
			// 切换模块标签
			clickTab(params) {
				this.moduleIndex = params.detail.index
				this.curPage = 0
			},
			// 获取社区发布列表
			getRecCommnunityBlogs(){
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getMyCommunity", {
					limit: 10,			// 查询的记录条数
					page: this.curPage				// 页码
				})
					.then(res => {
						uni.hideLoading()
						var blogInfo = res.data
						// console.log(blogInfo)
						// if (!this.firstCommunityLoadding) {
						// 	this.blogs = []
						// 	this.firstCommunityLoadding = true
						// }
						return myBlogsFilter(res.data)
					})
			},
			// 获取租赁发布列表
			getLeaseList(){
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getMyLeases", {
					limit: 10,			// 查询的记录条数
					page: this.curLeasePage				// 页码
				})
					.then(res => {
						uni.hideLoading()
						var blogInfo = res.data
						// console.log(blogInfo)
						// if (!this.firstCommunityLoadding) {
						// 	this.blogs = []
						// 	this.firstCommunityLoadding = true
						// }
						return leaseListFilter(res.data)
					})
			},
			// 跳转到租赁详发布页进行编辑
			editLeasePage(item) {
				uni.setStorageSync('editLease', item)
				uni.navigateTo({
					url: "../../pages-lease/sendLease/sendLease?isEdit=1"
				})
			},
			// 滚动到底部加载更多
			async scrollToLower(events) {
				uni.showLoading({
					title: '加载中',
				})
				// this.loading = true
				// 加载下一页
				++this.curPage
				// 拼接数组(这样才可以展示数据)
				// this.blogs = this.blogs.concat(await this.blogs)
				//设置延时
				setInterval(() => {
				    //TODO 
					uni.hideLoading()
				}, 1000);
				this.blogs = this.blogs.concat(await this.getRecCommnunityBlogs())
				// this.loading = false
			},
			shareMyCommunity(){
				uni.navigateTo({
					url: "../../pages-community/shareCommunity/shareCommunity"
				})
			},
			// 跳转去租赁发布页
			skipLeasePage() {
				uni.navigateTo({
					url: "../../pages-lease/sendLease/sendLease"
				})
			}
		}
	}
</script>

<style lang="stylus">
@import 'myBlogs.styl';
</style>
