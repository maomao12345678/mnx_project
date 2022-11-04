<template>
	<view class="fertilizerMore">
		<scroll-view class="fertilizerMoreScroll"
			@scrolltolower="scrollToLower"
			:scroll-y="true">
			<view class="fertilizerTitleFather flex-start">
				<view class="fertilizerTitle flex-center">肥料</view>
			</view>
			<view class="fertilizerListDaddy flex-start">
				<!-- 这个是饲料页面 -->
				<FertilizerList 
					class="fertilizerList" 
					v-for="(item, index) in fertilizerBlogs"
					:key="index"
					:blogInfo="item"
				></FertilizerList>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import apiRequest from '../../common/request.js'
	import FertilizerList from '../../components/FertilizerList/FertilizerList.vue'
	import {
		fertilizerFilter,
	} from '../../common/filter.js'
	export default {
		components: {
			FertilizerList,
		},
		data() {
			return {
				// 当前请求页数
				curPage: 0,
				// 博客列表
				navHeight: 0,
				fertilizerBlogs: [],
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
			// 	this.fertilizerBlogs.push(nList)
			// }
			this.fertilizerBlogs = await this.getRecFertilizerBlogs()
			console.log(this.fertilizerBlogs)
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
				this.fertilizerBlogs = this.fertilizerBlogs.concat(await this.getRecFertilizerBlogs())
				//设置延时
				setInterval(() => {
				    //TODO 
					uni.hideLoading()
				}, 1000);
				// this.loading = false
			},
			getRecFertilizerBlogs(){
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getProductions", {
					page: this.curPage,	
					limit: 10,		
					data_type: 2,
				})
					.then(res => {
						if (!this.firstLoading) {
							this.fertilizerBlogs = []
							this.firstLoading = true
						}
						uni.hideLoading()
						return fertilizerFilter(res.data)
					})
			},
		}
	}
</script>

<style lang="stylus">
@import "fertilizerMore.styl"
</style>
