<template>
	<scroll-view
		class="agriculturaldetail"
		@scrolltolower="scrollToLower"
		:scroll-y="true">
		<ContentAudio
			v-if="audioIndex != -1"
			@close="this.audioIndex = -1"
			:data="audioProps" />
		<AgriculturalIntro
			v-for="(item, index) in list"
			:key="index"
			:index="index"
			class="item"
			:data="item"
			:broadcastActive="audioIndex"
			@broadcast="broadcastAudio"
			@click="skipIntroDetail"
		/>
		<ListsLoading
			class="lists-loading"
			v-if="loading" />
	</scroll-view>
</template>

<script>
import apiRequest from '../../common/request.js'
import { agriculturalListFilter } from '../../common/filter.js'
import ListsLoading from '../../components/ListsLoading/ListsLoading.vue'
import ContentAudio from '../../components/ContentAudio/ContentAudio.vue'
import AgriculturalIntro from '../../components/AgriculturalIntro/AgriculturalIntro.vue'
	export default {
		components: {
			AgriculturalIntro,
			ListsLoading,
			ContentAudio
		},
		data() {
			return {
				// 农业知识类别
				type: 0,
				// 农业知识列表
				list: [],
				// 当前请求的页数
				curPage: 0,
				// 加载中
				loading: false,
				// 正在播报的索引
				audioIndex: -1,
				// 播报属性
				audioProps: {}
			}
		},
		async onLoad(params) {
			// let _this = this
			// _this.type = params.type
			this.type = params.type
			// console.log(this.type)
			//添加多个空的数据作为骨架
			let pList = {
				_id: '10fb47c3628211f2017156bd5290e0bd',
				title: '鸽子养殖的误区',
				skeleton: true,
				image: '',
				intro: ''
			}
			for (let a = 0; a <= 8; ++a) {
				this.list.push(pList)
			}
			//调用农业知识列表方法
			this.list = await this.getAgriculturalList()
		},
		methods: {
			// 滑动底部加载更多
			async scrollToLower() {
				this.loading = true
				// 加载下一页
				++this.curPage
				// 拼接数组
				this.list = this.list.concat(await this.getAgriculturalList())
			},
			// 获取知识列表
			getAgriculturalList() {
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest('getAgricultureByClass',{
					limit: 10,
					page: this.curPage,
					type: this.type-'0',
				})
					.then(res => {
						uni.hideLoading()
						return agriculturalListFilter(res.data)
					})
			},
			// 跳转详情页面
			skipIntroDetail(index) {
				let id = this.list[index]._id
				// 跳转至农业知识详情页面
				console.log(id)
				uni.navigateTo({
					url: `../agriculturalContentDetail/agriculturalContentDetail?id=${id}`
				})
				uni.setStorage({
					key: 'argriculture_'+ id,
					data: this.list[index]
				})
			},
			// 播报
			broadcastAudio(index) {
				// 节流
				if (this.audioIndex == index) return
				
				
				uni.showLoading({
					title: '正在加载音频'
				})
				let list = this.list[index]
				apiRequest('textToVoice', {
					text: list.content.substring(0, 100)
				})
					.then(res=> {
						let audioProps = {}
						audioProps.src = 'data:audio/wav;base64,'+ res.Audio
						if (list.title.length >= 8) {
							audioProps.name = list.title.substring(0, 8) + '...'
						} else {
							audioProps.name = list.title
						}
						audioProps.poster = list.image
						console.log(audioProps)
						this.audioProps = audioProps
						
						this.audioIndex = index
						uni.hideLoading()
					})
			}
		}
	}
</script>

<style lang="stylus">
.agriculturaldetail
	height 100vh
	.item
		margin-top 5%
	.lists-loading
		padding 15rpx 0 
</style>
