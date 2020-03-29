<template>
	<view>
		<view style="height: 20px; background-color: #dbf3e5;"></view>
		<navBar left-icon="back" background-color="#dbf3e5" :shadow='false' @clickLeft='goback' title="预约停车"></navBar>
		<view class="top">
			<view class="avator uni-flex uni-column">
				<view class="flex-item flex-item-V" style="margin-bottom: 20upx; font-size: x-large;">当前剩余车位</view>
				<view class="flex-item flex-item-V" style="font-size: xx-large;">{{current}}</view>
			</view>
		</view>
		<view style="background-color: #fff;">
			<view class="title">
				收费方式
			</view>
			<view style="width: 90%; margin: 0 auto;">
				<helangCheckbox ref="checkbox" @change="onChange"></helangCheckbox>
			</view>
		</view>


		<view style="width: 100%;height: 10px;"></view>
		<view>
			<picker-view :value="value" class="timeSelect" @change="getTime">
				<view class="item" style="line-height: 100px;padding-left:10px ;">停放时长</view>
				<picker-view-column>
					<view class="item" v-for="(item,index) in hours" :key="index">{{item}}小时</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in minutes" :key="index">{{item}}分钟</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view style="background-color: #f1f1f1;">
			<view style="font-size: small;padding:13px 0 0 10px;">(注:预定车位后,若半小时没有停放则自动取消预定)</view>
			<!-- 			<view class="carLicence">
		 				<input type="number" v-model="hour" class="provinces" placeholder=" "  maxlength=2 />小时
		 				<input type="number" v-model="hour" class="provinces" placeholder=" " maxlength=2 />分钟
		 			</view> -->
		</view>
		<view>
			<view style="margin: 30px 10px ;">
				<text style="color: #ff7801;font-size: xx-large;">￥{{fee}}</text><text style="font-size: small;">/账户余额￥{{balance.toFixed(2)}}元</text>
			</view>
			<cBtn width='90%' color="#000" fontsize="45rpx" @cctap="reserved" bgcolor='linear-gradient(-45deg, #C9E2B3 0%, rgba(12, 255, 182, 1) 100%);'>
				确认
			</cBtn>
		</view>
	</view>
</template>

<script>
	import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"

	export default {
		components: {
			helangCheckbox,

		},
		data() {
			return {
				current: 7,
				mode: '预付费',
				hour: 1,
				minute: 0,
				fee: 0,
				value: [0, 0],
				hours: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				minutes: [0, 30],
				phone: getApp().globalData.userMsg.phone,
				balance: getApp().globalData.userMsg.balance,
				id:getApp().globalData.userMsg.id,
			}
		},
		onLoad() {
			let that = this
			wx.request({
				url: "http://" + this.$host + "/smallProgram/getParkingCount",
				method: "GET",
				success: function(result) {

					that.current = result.data.data
				}
			})
			
			this.$refs.checkbox.set({
				type: 'radio', // 类型：单选框
				index: 0, // 默认选中的项
				column: 2, // 分列
				list: [{
						id: 0,
						text: '预付费'
					},
					{
						id: 1,
						text: '后付费'
					},
				] // 列表数据
			});
		},
		methods: {
			goback() {
				console.log("点了我")
				uni.navigateBack({});
			},
			reserved() {
/*
				wx.request({
					url: "http://111.230.183.3:8080/search",
					data: {
						Type: "JZf6sPC8EOI=",
						Data: [
							{ 
								Openid: "9sQiRAMxGFSeMbKcMD1yiw==",
								Keyword: "klGBTa1kjQf70fghTQaGHw==",
								Size: "LLz6xCLeIK8="
							},
						]
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: function(result) {

						console.log("hhhhhhhhhhhhhhhhhhhhhhhh")
						console.log(result)
					}
				})*/
				let that = this
				if(this.fee == 0.0) {
					wx.showToast({
						title: "请选择时长",
						icon: 'none',
						duration: 2000
					})
					return
				}
				wx.request({
					url: "http://localhost:8089/smallProgram/reservedParking",
					method: "POST",
					data: {
						id: this.id,
						phone: this.phone,
						fee:this.fee
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', //用于提交@RequestParam，且接受是一个一个字段
					},
					success: function(result) {
						getApp().globalData.userMsg = result.data.data
						wx.showToast({
							title: result.data.message,
							icon: 'none',
							duration: 2000,
							success: function(result) {
								setTimeout(that.delay,1000)
							},
						})
					}
				})
		
			},
			delay() {
				uni.navigateTo({
					url: "/pages/index/index"
				}), 3000
			},
			onChange(data) {
				this.mode = data.text
				//console.log(data)
			},
			getTime(e) {
				let val = e.detail.value
				this.hour = this.hours[val[0]]
				this.minute = this.minutes[val[1]]
				let fee1 = (this.minute == 0 ) ? 0 : 1.5
				this.fee = this.hour * 2 + fee1
			},
		}
	}
</script>

<style scoped lang="scss">
	.top {
		height: 250upx;
		width: 100%;
		background-color: #dbf3e5;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avator {
		text-align: center;
		font-size: larger;
		color: #000000;
	}

	.title {
		margin-top: 10px;
		height: 50px;
		background-color: #fff;
		line-height: 50px;
		font-size: medium;
		padding-left: 10px;
	}

	.carLicence {
		width: 100%;
		padding: 60upx 100upx 100upx;
		margin-bottom: 40upx;
		font-size: 60upx;

		.provinces {
			font-size: 60upx;
			height: 80upx;
			border-bottom: 1px solid #41d073;
			margin-top: 1px;
			width: 130upx;
			display: inline-block;
		}
	}

	.timeSelect {
		width: 100%;
		height: 100px;
		background-color: #ffffff;
		color: #000000;
		text-align: center;
		font-size: medium
	}
</style>
