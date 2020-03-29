<template>
	<view>
		<view style="height: 20px; background-color: #dbf3e5;"></view>
		<navBar left-icon="back" background-color="#dbf3e5" :shadow='false' @clickLeft='goback' title="充值"></navBar>
		<view class="top">
			<view class="avator uni-flex uni-column">
				<view class="flex-item flex-item-V" style="margin-bottom: 20upx; font-size: medium;color:#000000">余额(元)</view>
				<view class="flex-item flex-item-V" style="font-size: xx-large;color: #ff7801;">{{balance.toFixed(2)}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 40px;background-color: #fff;padding-top: 10px;">
			<input type="number" maxlength=9 placeholder="输入任意充值金额" v-model="money" style="text-align: center;background-color: #fff;font-size: medium; margin:0 auto;width: 98%;" />
			<view style="width: 95%;height: 13px;border: 1px solid #69c79d;margin: 0 auto;margin-top: -10px; border-top: none;">
			</view>
		</view>

		<view style="background-color: #fff;width: 100%;height: 50px;padding: 6px;">
			<view style="width: 90%; margin: 0 auto;">
				<helangCheckbox ref="checkbox" @change="onChange"></helangCheckbox>
			</view>
		</view>
		<view>
			<view style="height:20px; font-size: medium;margin-top: 10px;color: #000000;background-color: #fff;padding-left: 15px;">
				充值记录:
			</view>
			<scroll-view scroll-y="true" style="height: 250px;">
				<uni-list>
					<uni-list-item v-for="(record,index) in rechargeList" :key="index" :title="record.time" :show-arrow="false"
					 :rightText=" '费用:' + record.fee.toFixed(2)"></uni-list-item>
				</uni-list>
			</scroll-view>
			<view style="height: 20px;"></view>
			<cBtn width='90%' color="#000" fontsize="45rpx" @cctap="recharge" bgcolor='linear-gradient(-45deg, #C9E2B3 0%, rgba(0, 255, 162, 1) 100%);'>
				充值
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
				money: '',
				id: getApp().globalData.userMsg.id,
				balance: getApp().globalData.userMsg.balance,
				rechargeList: [],
			}
		},
		onShow() {
			let that = this
			wx.request({
				url: "http://localhost:8089/smallProgram/getRechargeRecord",
				method: "GET",
				data: {
					id: this.id,
					all: 'n',
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
		},
		methods: {
			onChange(data) {
				this.money = data.id
			},
			goback() {
				console.log("点了我")
				uni.navigateBack({});
			},
			recharge() {
				let that = this
				wx.request({
					url: "http://localhost:8089/smallProgram/recharge",
					method: "POST",
					data: {
						id: this.id,
						money: this.money
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', //用于提交@RequestParam，且接受是一个一个字段
					},
					success: function(result) {
						console.log(result)
						getApp().globalData.userMsg = result.data.data
						wx.showToast({
							title: '充值成功',
							icon: 'none',
							duration: 2000,
							success: function() {
								setTimeout(that.delay, 1000)
							}
						})

					}
				})
			},
			delay() {
				uni.navigateTo({
					url: "/pages/index/index"
				}), 3000
			}
		},
		onLoad() {
			console.log("onload")
			this.$refs.checkbox.set({
				type: 'radio', // 类型：单选框			// 默认选中的项
				column: 3, // 分列
				list: [{
						id: 20,
						text: '20元'
					},
					{
						id: 50,
						text: '50元'
					},
					{
						id: 100,
						text: '100元'
					},
				] // 列表数据
			});
		},
		created() {
			console.log("created")
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
</style>
