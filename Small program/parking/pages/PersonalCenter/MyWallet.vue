<template>
	<view>
		<view style="height: 20px; background-color: #dbf3e5;"></view>
		<navBar left-icon="back" background-color="#dbf3e5" :shadow='false' @clickLeft='goback' title="我的钱包"></navBar>
		<view class="top">
			<view class="avator uni-flex uni-column">
				<view class="flex-item flex-item-V" style="margin-bottom: 20upx; font-size: medium;">余额(元)</view>
				<view class="flex-item flex-item-V" style="font-size: xx-large;">{{balance.toFixed(2)}}</view>
			</view>
		</view>
		<button type="default" @tap="jump">充值</button>

		<view class="title">
			账单
		</view>
		<scroll-view scroll-y="true" style="height: 300px;">
		<uni-list>
			<uni-list-item v-for="(record,index) in rechargeList" :key="index" :title="record.time" :show-arrow="false"
			 :rightText=" '费用:' + record.fee.toFixed(2)"></uni-list-item>
		</uni-list>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance: getApp().globalData.userMsg.balance,
				rechargeList: [],
				id: getApp().globalData.userMsg.id,
			}
		},
		onShow() {
			let that = this
			wx.request({
				url: "http://localhost:8089/smallProgram/getRechargeRecord",
				method: "GET",
				data: {
					id: this.id,
					all: 'y',
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded', //用于提交@RequestParam，且接受是一个一个字段
				},
				success: function(result) {

					console.log("000000000000000000000")
					console.log(result)
					that.rechargeList = result.data.data
				}
			})
			wx.request({
				url: "http://localhost:8089/smallProgram/getUser",
				data: {
					openid: that.$openid
				},
				success: function(result) {
					console.log(result)
					if (result.data.data != null) {
					//	that.balance = result.data.data.balance
						getApp().globalData.userMsg = result.data.data
					}
				}
			})
		},
		methods: {
			goback() {
				console.log("点了我")
				uni.navigateBack({});
			},
			jump() {
				uni.navigateTo({
					url: "/pages/ParkingOperate/QuicklyRecharge"
				})
			}
		}
	}
</script>

<style scoped>
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
	}

	.title {
		margin-top: 5px;
		height: 30px;
		background-color: #fff;
		line-height: 30px;
		font-size: large;
		padding-left: 5px;
		border-bottom: 1px solid #dfdfdf;
	}
</style>
