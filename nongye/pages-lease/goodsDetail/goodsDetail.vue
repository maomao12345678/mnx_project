<template>
	<view class="goodsdetail">
		<swiper
			class="swiper"
			circular
			:indicator-dots="true">
			<swiper-item
				:key="item"
				@click="previewPhoto(index)"
				v-for="item, index in infor.imageArr">
				<image
					class="swiper-img"
					:src="item"
					mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="good-container">
			<view class="good-money flex-start">
				参考价格
				<view class="good-money-signal">￥</view>
				<view class="good-money-number">{{infor.money}}</view>
				<view class="good-visited">
					{{infor.visit || 0}}浏览量
				</view>
			</view>
			<view class="good-intro">
				{{infor.title}}
			</view>
		</view>
		<view class="publish-container">
			<view class="publish-infor flex-start">
				<image :src="infor.userImage" mode="aspectFill"></image>
				<view class="publish-right flex-start">
					<view class="publish-username">
						{{infor.userName}}
					</view>
					<view class="publish-location" v-if="infor.location">
						{{judgeLocation}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="message">
			<view class="message-title">
				留言
			</view>
			<view class="message-tip flex-start">
				<image src="../../static/image/munongxing-round.png" mode="aspectFill"></image>
				<view
					@click="openComment"
					class="message-tip-right flex-start">
					{{message.length != 0 ? '看对眼就留言，问问更多细节' : '还没有人留言，你来占个座'}}
				</view>
			</view>
			<LeaseMessage
				:key="index"
				:data="item"
				v-for="item, index in message" />
		</view>
		
		<view
			v-if="showComment"
			@click="showComment = false"
			class="comment-container">
			<view
				@click.stop
				class="comment flex-between">
				<input
					v-model="comment"
					type="text"
					:auto-focus="true"
					placeholder="感兴趣就留言,问问更多细节">
				<view
					@click="sendComment"
					class="comment-send flex-center">
					发送
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import LeaseMessage from '../../components/LeaseMessage/LeaseMessage.vue'
import { 
	leaseListFilter,
	leaseCommentFilter,
} from '../../common/filter.js'
import login from '../../common/login.js'
import apiRequest from '../../common/request.js'
	export default {
		components: {
			LeaseMessage
		},
		computed: {
			judgeLocation() {
				if (this.infor.location == '点击更新位置' || !this.infor.location) return ''
				return this.infor.location
			}
		},
		data() {
			return {
				infor: {
					imageArr: [],
					id: '',
					userName: '',
					location: '',
					userImage: '../../static/image/logo.png',
					money: '',
					visit: 0,
					title: '',
				},
				message: [],
				comment: '',
				showComment: false,
				page: 1
			}
		},
		onLoad(params) {
			uni.showLoading({
				title: '加载中'
			})
			let id = params.id
			let _this = this
			this.id = id
			
			// 进入页面获取租赁缓存数据
			uni.getStorage({
				key: 'lease_' + id,
				success: function (res) {
					_this.infor = res.data
					uni.hideLoading()
				},
				fail: function (res) {
					// 第一次进入此页面, 没有缓存数据则请求数据
					apiRequest('getLeaseById', {
						lease_id: id
					})
						.then(data => {
							_this.infor = leaseListFilter(data.data)[0]
							uni.hideLoading()
						})
				}
			})
			// 获取租赁评论信息
			apiRequest('getMessageById', {
				page: this.page,
				limit: 5,
				lease_id: id
			})
				.then(res => {
					console.log(res)
					this.message = leaseCommentFilter(res.data)
				})
		},
		methods: {
			// 预览图片
			previewPhoto(index) {
				uni.previewImage({
					urls: this.infor.imageArr,
					current: index
				})
			},
			// 打开评论
			async openComment() {
				let userinfo = uni.getStorageSync('userInfo')
				// 未登录
				if (!userinfo) {
					let isLogin = await login()
					console.log(isLogin)
				} else {
					this.showComment = true
				}
			},
			// 发表评论
			sendComment() {
				let userinfo = uni.getStorageSync('userInfo')
				let comment = this.comment.trim()
				if (comment == '') {
					return uni.showToast({
							title: '请填写描述内容',
							icon: 'none'
						})
				}
				if (!userinfo) {
					return uni.showToast({
							title: '用户未登录',
							icon: 'none'
						})
				}
				apiRequest('insertMessage', {
					content: comment,
					lease_id: this.id
				})
					.then(res => {
						this.comment = ''
						this.showComment = false
						this.message.push({
							username: userinfo.nickName,
							image: userinfo.avatarUrl,
							time: '刚刚',
							message: comment
						})
					})
			}
		},
		async onUnload() {
			// 离开页面销毁缓存
			uni.removeStorage({
				key: 'lease_' + this.id
			})
		}
	}
</script>

<style lang="stylus">
@import 'goodsDetail.styl';
</style>
