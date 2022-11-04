<template>
	<view class="medicineMore">
		<scroll-view class="medicineMoreScroll"
			@scrolltolower="scrollToLower"
			:scroll-y="true">
			<view class="medicineTitleFather flex-start">
				<view class="medicineTitle flex-center">农药</view>
			</view>
			<view class="medicineListDaddy flex-start">
				<!-- 这个是饲料页面 -->
				<MedicineList 
					class="medicineList" 
					v-for="(item, index) in medicineBlogs"
					:key="index"
					:blogInfo="item"
				></MedicineList>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import apiRequest from '../../common/request.js'
	import MedicineList from '../../components/MedicineList/MedicineList.vue'
	import {
		medicineFilter,
	} from '../../common/filter.js'
	export default {
		components: {
			MedicineList,
		},
		data() {
			return {
				// 当前请求页数
				curPage: 0,
				// 博客列表
				navHeight: 0,
				medicineBlogs: [],
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
			// 	this.medicineBlogs.push(nList)
			// }
			this.medicineBlogs = await this.getRecMedicineBlogs()
			console.log(this.medicineBlogs)
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
				this.medicineBlogs = this.medicineBlogs.concat(await this.getRecMedicineBlogs())
				//设置延时
				setInterval(() => {
				    //TODO 
					uni.hideLoading()
				}, 1000);
				// this.loading = false
			},
			getRecMedicineBlogs(){
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getProductions", {
					page: this.curPage,	
					limit: 10,		
					data_type: 3,
				})
					.then(res => {
						if (!this.firstLoading) {
							this.medicineBlogs = []
							this.firstLoading = true
						}
						uni.hideLoading()
						return medicineFilter(res.data)
					})
			},
		}
	}
</script>

<style lang="stylus">
@import "medicineMore.styl"
</style>
