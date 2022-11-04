<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//云开发环境初始化
			wx.cloud.init({
				env: 'cloud1-0g2w6i4zb545c01a',
				traceUser: true,
			})
		},
		onShow: function() {
			console.log('App Show')
			
			// 判断设备是否第一次进入平台
			uni.getStorage({
				key: 'isUser',
				success: (data) => {
					// 用户已访问，直接跳转
				},
				fail: () => {
					uni.reLaunch({
						url: 'pages/start/start'
					})
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}

</script>

<style lang="stylus">
	/*每个页面公共css */
@import "./static/styl/index.styl";
@import "./common/animate.styl";
</style>
<!-- <style lang="scss">
@import "./common/animate.css";
</style> -->
