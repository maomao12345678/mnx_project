<template>
	<view class="myCollect">
		<scroll-view
			@scrolltolower="scrollToLower"
			:scroll-y="true"
			:style="'height: calc(100vh)'"
			class="index-content">
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
						<view
							class="machineintro-container flex-start">
							<view class="machineintro-container-left flex-between">
								<!-- 左边列表 -->
								<MachineIntro
									class="machineintro-listitem"
									:key="index"
									:index="index"
									:fixedImage="true"
									:hideCollect="true"
									@clickCollect="clickCollect"
									@click="skipMachineDetail(item)"
									:data="item"
									v-for="(item, index) in machineList"/>
								
								<!-- 内容为空 -->
								<NullStatus
									title="暂无收藏,快去浏览一下吧"
									content="浏览"
									v-if="machineList.length == 0"
									@click="skipIndexPage" />
							</view>
						</view>
						<ListsLoading
							class="lists-loading"
							v-if="loading" />
				</view>
				
				<view
					v-if="moduleIndex == 1"
					class="module-knowledge">
					<!-- 种植知识页面 -->
						<ContentAudio
							v-if="audioIndex != -1"
							@close="this.audioIndex = -1"
							:data="audioProps" />
						<AgriculturalIntro
							v-for="(item, index) in plantList"
							:key="index"
							:index="index"
							class="item"
							:data="item"
							:broadcastActive="audioIndex"
							@broadcast="broadcastAudio"
							@click="skipIntroDetail"
						/>
						
						<!-- 内容为空 -->
						<NullStatus
							title="暂无收藏,快去浏览一下吧"
							content="浏览"
							v-if="plantList.length == 0"
							@click="skipIndexPage" />
				</view>
				
				<view
					v-if="moduleIndex == 2"
					class="module-nongzi">
						<view class="feed">
							<view class="feedListFather flex-start">
								<!-- 这个是饲料页面 -->
								<NongziCollectList 
									class="feedList" 
									v-for="(item, index) in nongziBlogs"
									:key="index"
									:blogInfo="item"
								></NongziCollectList>
								
								<!-- 内容为空 -->
								<NullStatus
									title="暂无收藏,快去浏览一下吧"
									content="浏览"
									v-if="nongziBlogs.length == 0"
									@click="skipIndexPage" />
							</view>
						</view>
				</view>
				
				<view
					v-if="moduleIndex == 3"
					class="module-community">
						<view class="communityFather flex-start">
							<!-- 这个是社区页面 -->
							<CommunityList 
								class="communityList" 
								v-for="(item, index) in blogs"
								:key="index"
								:blogInfo="item"
								:communityId="index"
							></CommunityList>
							
							<!-- 内容为空 -->
							<NullStatus
								title="暂无收藏,快去浏览一下吧"
								content="浏览"
								v-if="blogs.length == 0"
								@click="skipIndexPage" />
						</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	//导入获取云函数的数据
	import apiRequest from '../../common/request.js'
	import {
		communityBlogsFilter,
		myBlogsFilter,
		nongziCollectFilter,
		agriculturalListFilter,
		machineListsFilter,
	} from '../../common/filter.js'
	import ListsLoading from '../../components/ListsLoading/ListsLoading.vue'
	import MachineIntro from '../../components/MachineIntro/MachineIntro.vue'
	import NullStatus from '../../components/NullContent/NullContent.vue'
	import ContentAudio from '../../components/ContentAudio/ContentAudio.vue'
	import AgriculturalIntro from '../../components/AgriculturalIntro/AgriculturalIntro.vue'
	import MyBlogList from '../../components/MyBlogList/MyBlogList.vue'
	import NongziCollectList from '../../components/NongziCollectList/NongziCollectList.vue'
	export default {
		name: "MyCollect",
		components: {
			MyBlogList,
			NongziCollectList,
			AgriculturalIntro,
			ContentAudio,
			MachineIntro,
			ListsLoading,
			NullStatus
		},
		async onLoad() {
			uni.showShareMenu()
			// 获取状态栏高度
			const { statusBarHeight } = wx.getSystemInfoSync()
			// 得到右上角菜单的位置尺寸
			const menuButtonObject = wx.getMenuButtonBoundingClientRect()
			const { top, height } = menuButtonObject
			this.navHeight = top + height
			this.blogs = await this.getRecCommnunityBlogs()
			this.plantList = await this.getAgriculturalList()
			this.nongziBlogs = await this.getRecNongziBlogs()
			//调用机械推荐方法
			this.machineList = await this.getRecMachines()
		},
		data() {
			return {
				titles: ['机械设备', '农业知识', '农资百科', '社区分享'],
				moduleIndex: 0,
				// 当前请求页数
				curPage: 0,
				// 博客列表
				navHeight: 0,
				//展示列表
				lists: [],
				plantType: 0,
				plantList: [],
				// 加载中
				loading: false,
				// 正在播报的索引
				audioIndex: -1,
				// 播报属性
				audioProps: {},
				machineList: [],
				// 首次加载
				firstLoading: false,
				// 首次加载社区
				firstCommunityLoadding: false,
				// 首次加载农业知识
				firstPlantLoadding: false,
				//首次加载农资知识
				firstNongziLodding: false,
				// 左边机械容器高度
				leftHeight: 0,
				// 右边机械容器高度
				rightHeight: 0,
				// blogs:[{
				// 		blogPhoto:'../../static/image/backgroud-1.jpeg',
				// 		blogContent:'我们当时玩的7天，全程下来价格很便宜哦，包含了所有的景点门票住宿交通和美食，很佛系，哪里好看，就在哪里停下来，拍拍照，饿了米瑞就带我们去吃当地的美食，累了随时可以歇息，考虑到西藏的高原反应，米瑞给我们安排的也都是供养酒店，车也是供养汽车，因为西藏这块儿当地政府也在扶持旅游复苏，米瑞家做西藏品质自由行很多年了，在酒店景点门票各个方面都有资源，价格会便宜很多，就说我们住的酒店，网上光一晚上的价格都要五六百，这也是为什么选择米瑞品质自由行的主要原因吧，还有就是布达拉宫的门票，因为限制人数了的，听米瑞说有时候经常会出现买不到票的情况，并且一些黄牛还会去炒票，自己买价格也贵的离谱，这些米瑞都会给我们提前就安排好，这里把米瑞的联系方式贴出来吧，不管您是自己还是和家人一起去，都可以先找米瑞了解一下，她也非常的热心，非常的善良。这里很好玩，今天真开心,哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈!!!!!!!!',
				// 		blogUserPhoto: '../../static/image/profile-photo.jpeg',
				// 		blogUserName: 'maomao',
				// 		blogId: 0,
				// 		blogCreateTime: '2021-11-17',
				// 		blogTitle: "西藏三天两日游",
				// 	}],
					blogs: [],
					nongziBlogs: [],
			}
		},
		methods: {
			// 点击首页左边机械收藏
			clickLeftCollect(index) {
				this.machineList[index].isCollect = !this.machineList[index].isCollect
			},
			// 更新List
			updateList(index, data) {
				// 根据传进来的键值更新信息
				for (let key in data) {
					this.$set(this.machineList[index], key, data[key])
				}
			},
			// 点击卡片进入详情页
			skipMachineDetail(item) {
				let id = 0
				id = item._id
				uni.setStorage({
					key: 'machine_' + id,
					data: item
				})
				uni.navigateTo({
					url: `../../pages-knowledge/machineDetail/machineDetail?id=${id}`
				})
			},
			//获取社区
			getRecCommnunityBlogs(){
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getUserCollects", {
					type: 4  
				})
					.then(res => {
						uni.hideLoading()
						var blogInfo = res.data
						if (!this.firstCommunityLoadding) {
							this.blogs = []
							this.firstCommunityLoadding = true
						}
						// console.log('getUserCollects')
						// console.log(blogInfo)
						return myBlogsFilter(res.data)
					})
			},
			//获取农资
			getRecNongziBlogs(){
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getUserCollects", {
					type: 3  
				})
					.then(res => {
						uni.hideLoading()
						var blogInfo = res.data
						if (!this.firstNongziLodding) {
							this.nongziBlogs = []
							this.firstNongziLodding = true
						}
						// console.log('getUserCollects')
						// console.log(blogInfo)
						return nongziCollectFilter(res.data)
					})
			},
			// 切换模块标签
			clickTab(params) {
				this.moduleIndex = params.detail.index
				this.curPage = 0
			},
			// 获取知识列表
			getAgriculturalList() {
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest('getUserCollects',{
					page: this.curPage,
					type: 2
				})
					.then(res => {
						uni.hideLoading()
						if (!this.firstPlantLoadding) {
							this.plantList = []
							this.firstPlantLoadding = true
						}
						return agriculturalListFilter(res.data)
					})
			},
			// 跳转首页
			skipIndexPage() {
				uni.navigateTo({
					url: '../../pages/index/index'
				})
			},
			// 获取推荐机械信息
			getRecMachines() {
				uni.showLoading({
					title: '加载中'
				})
				return apiRequest("getUserCollects", {
					type: 1,		
					page: this.curPage				// 页码
				})
					.then(res => {
						uni.hideLoading()
						return machineListsFilter(res.data)
					})
			},
			// 跳转详情页面
			skipIntroDetail(index) {
				let id = this.plantList[index]._id
				// console.log(this.plantList)
				// console.log(id)
				uni.setStorage({
					key: 'argriculture_'+ id,
					data: this.plantList[index]
				})
				// 跳转至农业知识详情页面
				uni.navigateTo({
					url: `../../pages-knowledge/agriculturalContentDetail/agriculturalContentDetail?id=${id}`
					// url: '../../pages-knowledge/agriculturalContentDetail/agriculturalContentDetail?id=${id}'
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
			},
			// 滚动到底部加载更多
			async scrollToLower(events) {
				// uni.showLoading({
				// 	title: '加载中',
				// })
				// this.loading = true
				// // 加载下一页
				// ++this.curPage
				// // 拼接数组(这样才可以展示数据)
				// // this.blogs = this.blogs.concat(await this.blogs)
				// //设置延时
				// setInterval(() => {
				//     //TODO 
				// 	uni.hideLoading()
				// }, 1000);
				// this.blogs = this.blogs.concat(await this.getRecCommnunityBlogs())
				// this.nongziBlogs = this.nongziBlogs.concat(await this.getRecNongziBlogs())
				// this.plantList = this.plantList.concat(await this.getAgriculturalList())
				// this.splitImageLists(await this.getRecMachines())
				// this.loading = false
			},
		}
	}
</script>

<style lang="stylus">
@import 'myCollect.styl';
</style>
