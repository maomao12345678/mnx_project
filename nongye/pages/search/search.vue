<template>
	<view class="search">
		<AppHeader
			:back="true"
			:autofocus="true"
			@confirm="searchContent"
			content=""
			/>
		<view class="search-title flex-between" v-if="!isknowledgeNull">
			<view class="search-word">农业知识</view>
			<!-- <view class="search-more">更多</view> -->
		</view>
		<view
			v-if="knowledgeItem.length != 0"
			v-for="knowledgeItem, knowledgeItemIndex in knowledge"
			:key="knowledgeItemIndex"
			class="lists">
			<view class="lists-container flex-start">
				<SearchCommon
					class="lists-item"
					@click="skipKnowledgePage(item, knowledgeItemIndex)"
					v-for="item, index in knowledgeItem"
					:key="index"
					:data="item"
					/>
			</view>
		</view>
		
		<view class="search-title flex-between" v-if="lease.length != 0">
			<view class="search-word">租赁机械</view>
			<!-- <view class="search-more">更多</view> -->
		</view>
		<view class="lists" v-if="lease.length != 0">
			<view class="lists-container flex-start">
				<SearchCommon
					class="lists-item"
					@click="skipLeasePage(item)"
					v-for="item, index in lease"
					:key="index"
					:data="item"
					/>
			</view>
		</view>
		<!-- 搜索为空 -->
		<NullStatus
			title="暂无搜索结果"
			v-if="isSearchNull && isSearch" />
	</view>
</template>

<script>
import apiRequest from '../../common/request.js'
import AppHeader from '../../base/AppHeader/AppHeader.vue'
import SearchCommon from '../../components/SearchCommon/SearchCommon.vue'
import NullStatus from '../../components/NullContent/NullContent.vue'
import {
	searchMachineFilter,
	searchAgriculturalFilter,
	searchLeaseFilter,
} from '../../common/filter.js'
	export default {
		components: {
			AppHeader,
			SearchCommon,
			NullStatus
		},
		data() {
			return {
				lease: [],
				knowledge: [],
				isSearch: false
			}
		},
		onLoad(info) {
			console.log(info)
		},
		computed: {
			isknowledgeNull() {
				let isNull = true
				for (let k of this.knowledge) {
					if (k.length != 0) {
						isNull = false
						break
					}
				}
				return isNull
			},
			isSearchNull() {
				return this.isknowledgeNull && this.lease.length == 0
			}
		},
		methods: {
			// 提交搜索
			searchContent(content) {
				console.log(content)
				if (!content.trim()) return
				uni.showLoading({
					title: '加载中'
				})
				apiRequest('getSearch', {
					key: content,
					limit: 3
				})
					.then(res => {
						this.isSearch = true
						// 农业知识
						let machine = searchMachineFilter(res.machine)
						let fertilizer = res.fertilizer
						let feed = res.feed
						let medicine = res.medicine
						let agriculture = searchAgriculturalFilter(res.agriculture)
						this.knowledge = [machine, fertilizer, feed, medicine, agriculture]
						// 租赁信息
						this.lease = searchLeaseFilter(res.lease)
						uni.hideLoading()
					})
			},
			// 跳转知识页面
			skipKnowledgePage(item, index) {
				let address = [
					'../../pages-knowledge/machineDetail/machineDetail',
					'../../pages-knowledge/fertilizerMessagefertilizerMessage',
					'../../pages-knowledge/feedMessage/feedMessage',
					'../../pages-knowledge/medicineMessage/medicineMessage',
					'../../pages-knowledge/agriculturalContentDetail/agriculturalContentDetail'
				]
				uni.navigateTo({
					url: address[index] + `?id=${item._id}`
				})
			},
			// 跳转租赁页面
			skipLeasePage(item) {
				uni.navigateTo({
					url: `../../pages-lease/goodsDetail/goodsDetail?id=${item._id}`
				})
			}
		}
	}
</script>

<style lang="stylus">
@import "./search.styl";
</style>
