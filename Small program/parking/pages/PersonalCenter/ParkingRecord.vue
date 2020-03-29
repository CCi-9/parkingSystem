<template>
	<view style="padding-top: 20px;">
		<navBar left-icon="back" background-color="#f1f1f1" :shadow='false' @clickLeft='goback' title="停车记录"></navBar>
		<uni-list>
			<uni-list-item v-for="(list,index) in carRecordList" :key="index" :title="list.startTime + '进'" :note="list.endTime + '出'"
			 :show-arrow="false">
				<template v-slot:right="">
					<text style="margin-right: 10px;">{{list.carLicence}}</text><text>￥:{{list.fee.toFixed(2)}}</text>
				</template>
			</uni-list-item>

		</uni-list>

	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				carRecordList: [],
				id: getApp().globalData.userMsg.id
			}
		},
		onShow() {
			let that = this
			wx.request({
				url: "http://localhost:8089/smallProgram/getCarRecord",
				method: "GET",
				data: {
					id: this.id
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded', //用于提交@RequestParam，且接受是一个一个字段
				},
				success: function(result) {
					console.log(result)
					that.carRecordList = result.data.data
				}
			})
		},
		methods: {
			goback() {
				console.log("点了我")
				uni.navigateBack({});
			},
		}
	}
</script>

<style>

</style>
