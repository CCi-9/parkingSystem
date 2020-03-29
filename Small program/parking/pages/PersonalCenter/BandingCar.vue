<template>
	<view style="padding-top: 20px;">
		<navBar left-icon="back" background-color="#f1f1f1" :shadow='false' @clickLeft='goback' title="绑定车牌"></navBar>
		<button @tap="addOpen">添加车牌</button>
		<uni-list>
			<uni-list-item v-for="car in carList" v-bind:key="car" :title="car.licence" :show-arrow="false">
				<template v-slot:right="">
					<button class="mini-btn" type="primary" size="mini" @tap="updateOpen(car.licence)">修改</button>
				</template>
			</uni-list-item>
		</uni-list>

		<uni-popup ref="addPopup" type="bottom" maskClick='false'>
			<view style="width: 100%;height: 300px; background-color: #ffffff;">
				<view class="title">选择车牌</view>
				<view class="carLicence">
					<input type="text" v-model="provinces" class="provinces" placeholder="省市" maxlength=2 />
					<input type="text" v-model="number" class="number" name="" placeholder=" " maxlength=5 />
				</view>
				<view>
					<cBtn width='400rpx' @cclick='addCar' :isdisable='(number == "") || (provinces == "")' :bgcolor='(number == "") || (provinces == "") ? bgcolor2 : bgcolor1 '
					 color="#000" fontsize="45rpx">
						添加
					</cBtn>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="updatePopup" type="bottom" maskClick='false'>
			<view style="width: 100%;height: 300px; background-color: #ffffff;">
				<view class="title">车牌修改</view>
				<view class="carLicence">
					<input type="text" v-model="existProvinces" class="provinces" placeholder="省市" maxlength=2 />
					<input type="text" v-model="existNumber" class="number" name="" placeholder=" " maxlength=5 />
				</view>
				<view>
					<cBtn width='400rpx' @cclick='updateCar' :isdisable='(existNumber == "") || (existProvinces == "")' :bgcolor='(existNumber == "") || (existProvinces == "") ? bgcolor2 : bgcolor1 '
					 color="#000" fontsize="45rpx">
						修改
					</cBtn>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import plateNumber from '@/components/plate-number/plateNumber.vue';
	export default {
		components: {
			uniPopup,
			plateNumber
		},
		data() {

			return {
				provinces: '',
				number: '',
				existProvinces: '',
				existNumber: '', //要修改的车牌

				currentProvinces:"",
				currentNumber:"",
				
				carList: [],
				bgcolor1: "linear-gradient(-45deg, #C9E2B3 0%, rgba(12, 255, 182, 1) 100%);",
				bgcolor2: "linear-gradient(-45deg, #C9E2B3 0%, rgba(222, 255, 243, 1) 100%);",
				id: getApp().globalData.userMsg.id
			}
		},
		onShow() {
			let that = this
			wx.request({
				url: "http://localhost:8089/smallProgram/getCar",
				method: "GET",
				data: {
					id: this.id
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded', //用于提交@RequestParam，且接受是一个一个字段
				},
				success: function(result) {
					console.log(result)
					that.carList = result.data.data
				}
			})
		},
		methods: {
			addOpen() {
				this.$refs.addPopup.open()
			},

			updateOpen(carCode) {
				this.$refs.updatePopup.open()
				let car = carCode.split(" ")
				this.existProvinces = car[0]
				this.existNumber = car[1]
				this.currentProvinces = car[0]
				this.currentNumber = car[1]
				
			},

			goback() {
				console.log("点了我")
				uni.navigateBack({});
			},
			addCar() {
				console.log("添加车牌")
				let that = this
				wx.request({
					url: "http://localhost:8089/smallProgram/addCar",
					method: "POST",
					data: {
						id: this.id,
						licence: this.provinces + " " + this.number,
						
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', //用于提交@RequestParam，且接受是一个一个字段
					},
					success: function(result) {
						console.log(result)
						wx.showToast({
							title: '添加成功',
							icon: 'none',
							duration: 2000,
							success: function() {
								setTimeout(that.delay,1000)
							}
						})

					}
				})
			},
			updateCar() {
				let that = this
				wx.request({
					url: "http://localhost:8089/smallProgram/changeCar",
					method: "POST",
					data: {
						id: this.id,
						licence: this.existProvinces + " " + this.existNumber,
						currentLicence: this.currentProvinces + " " + this.currentNumber,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', //用于提交@RequestParam，且接受是一个一个字段
					},
					success: function(result) {
						console.log("+++++++++++++++++++++++++")
						console.log(result)
						wx.showToast({
							title: '修改成功',
							icon: 'none',
							duration: 2000,
							success: function(result) {
								setTimeout(that.delay,1000)
							},
						})
					},
				})
			},
			delay() {
				uni.navigateTo({
					url: "/pages/PersonalCenter/BandingCar"
				}), 3000
			}
		}
	}
</script>

<style lang="scss">
	.title {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #e2e2e2;
		text-align: center;
		font-size: large;
		line-height: 50px;
	}

	.licence {}

	.carLicence {
		width: 100%;
		padding: 60upx 100upx 100upx;
		margin-bottom: 40upx;

		.provinces {
			font-size: 60upx;
			height: 80upx;
			border-bottom: 1px solid #41d073;
			width: 130upx;
			display: inline-block;
		}

		.number {
			font-size: 60upx;
			height: 80upx;
			border-bottom: 1px solid #41d073;
			width: 280upx;
			margin-left: 130upx;
			display: inline-block;
		}
	}

	.column-with-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		button {
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;

			&:after {
				border: none
			}
		}
	}
</style>
