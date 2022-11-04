<template>
	<view class="feedMore">
		<scroll-view class="feedMoreScroll"
			@scrolltolower="scrollToLower"
			:scroll-y="true">
			<view class="feedTitleFather flex-start">
				<view class="feedTitle flex-center">饲料</view>
			</view>
			<view class="feedListDaddy flex-start">
				<!-- 这个是饲料页面 -->
				<FeedList 
					class="feedList" 
					v-for="(item, index) in feedBlogs"
					:key="index"
					:blogInfo="item"
				></FeedList>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import apiRequest from '../../common/request.js'
	import FeedList from '../../components/FeedList/FeedList.vue'
	import {
		feedFilter,
	} from '../../common/filter.js'
	export default {
		components: {
			FeedList
		},
		data() {
			return {
				// 当前请求页数
				curPage: 0,
				// 博客列表
				navHeight: 0,
				feedBlogs: [],
				// 首次加载
				firstLoading: false,
			}
		},
		async onLoad() {
			//农资部分
			let nList = {
				_id: 'f6e08a64627b7d0c0266b065247ee2bd',
				title: '广州三日两夜游',
				skeleton: true,
				image: '',
				content: '哈哈哈哈哈'
			}
			// for (let a = 0; a <= 8; ++a) {
			// 	this.feedBlogs.push(nList)
			// }
			this.feedBlogs = await this.getRecFeedBlogs()
			console.log(this.feedBlogs)
		},
		methods: {
			async scrollToLower(events) {
				uni.showLoading({
					title: '加载中',
				})
				// this.loading = true
				// 加载下一页
				++this.curPage
				// 拼接数组(这样才可以展示数据)
				// this.blogs = this.blogs.concat(await this.blogs)
				this.feedBlogs = this.feedBlogs.concat(await this.getRecFeedBlogs())
				//设置延时
				setInterval(() => {
				    //TODO 
					uni.hideLoading()
				}, 1000);
				// this.loading = false
			},
			getRecFeedBlogs(){
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getProductions", {
					page: this.curPage,	
					limit: 10,		
					data_type: 1,
				})
					.then(res => {
						if (!this.firstLoading) {
							this.feedBlogs = []
							this.firstLoading = true
						}
						uni.hideLoading()
						return feedFilter(res.data)
					})
			},
		}
	}
</script>

<style lang="stylus">
@import "feedMore.styl"
</style>
