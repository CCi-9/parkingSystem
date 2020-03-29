<template>
	<view style="padding-top: 20px;">
		<navBar left-icon="back" background-color="#f1f1f1" :shadow='false' @clickLeft='goback' title="个人中心"></navBar>
		<view class="content">
			<view class="logo">
				<image src="../../static/bg/tx.jpg" style="width: 100px;height: 100px; margin-bottom: 100px;"></image>
			</view>
			<view class="uni-form-item uni-column">
				<input type="text" v-model="username" class="uni-input" name="username" placeholder="用户名" />
			</view>
			<view class="uni-form-item uni-column">
				<input type="tel" v-model="phone" class="uni-input" name="phone" placeholder="请输入手机号" />
			</view>
			<view class="uni-form-item uni-column">
				<!-- 			
				<input type="radio" name="sex" value="male" />男<br />
				<input type="radio" name="sex" value="female" />女<br />
				 -->
				<evan-radio v-model="sex" label="男" primary-color="#0cffb6" style="display: inline-flex; margin-right: 10px;">男</evan-radio>
				<evan-radio v-model="sex" label="女" primary-color="#0cffb6" style="display: inline-flex;">女</evan-radio>
			</view>
			<cBtn width='400rpx' bgcolor=" linear-gradient(-45deg, #C9E2B3 0%, rgba(12, 255, 182, 1) 100%);" @cctap="changeMSG">
				<span style='color: #505050;font-size: large;'>修改</span>
			</cBtn>
		</view>
	</view>
</template>

<script>
	import evanRadio from "../../components/evan-radio/evan-radio.vue"
	import evanRadioGroup from "../../components/evan-radio/evan-radio-group.vue"

	export default {
		components: {

			evanRadio,
			evanRadioGroup
		},
		data() {
			return {
				sex: getApp().globalData.userMsg.sex,
				username: getApp().globalData.userMsg.username,
				phone: getApp().globalData.userMsg.phone
			}
		},
		onLoad() {

		},
		methods: {
			goback() {
				console.log("点了我")
				uni.navigateBack({});
			},
			radioChange(evt) {
				this.sex = evt.target.value
			},
			changeMSG() {

				if (this.username == '') {
					wx.showToast({
						title: '用户名不能为空',
						icon: 'none',
						duration: 2000
					})
					return
				};

				if (this.phone == '') {
					wx.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 2000
					})
					return
				};


				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					wx.showToast({
						title: '手机号格式不正确',
						icon: 'none',
						duration: 2000
					})
					return
				}


				let that = this
				wx.request({
					url: "http://localhost:8089/smallProgram/changeMSG",
//					url: "http://localhost:8080/search",
					method: "POST",
					data: {
						
						id: getApp().globalData.userMsg.id,
						username: this.username,
						phone: this.phone,
						sex: this.sex,
						/*
						data{
							Type: "JZf6sPC8EOI=",
							Data:{
								Openid: "9sQiRAMxGFSeMbKcMD1yiw==",
								Keyword: "klGBTa1kjQf70fghTQaGHw==",
								Size: "LLz6xCLeIK8="
							}
						}*/
					},
					header: {
//							'content-type': 'application/x-www-form-urlencoded',//用于提交@RequestParam，且接受是一个一个字段
						'content-type': 'application/json; charset=utf-8', //用于提交@RequestBody，且接受是对象
					},
					success: function(result) {
						if (result.data.message == '手机号已经存在') {
							wx.showToast({
								title: '手机号已经存在',
								icon: 'none',
								duration: 2000
							})
							return
						} else {
							console.log(result)
							//							that.addSuccess()
							getApp().globalData.userRegiste = true
							getApp().globalData.userMsg.sex = that.sex
							getApp().globalData.userMsg.phone = that.phone
							getApp().globalData.userMsg.username = that.username

							wx.showToast({
								title: '修改成功',
								icon: 'none',
								duration: 2000
							})
							uni.navigateTo({
								url: "/pages/index/index"
							})
						}
					}
				})
			},
		},
		computed: {

		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;

	.content {
		padding: 50upx 100upx 100upx;
	}

	.logo {
		text-align: center;

		image {
			width: 130upx;
			height: 130upx;
			border-radius: 50%;
			margin: 130upx 0 40upx;
		}
	}

	.uni-form-item {
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;

		.uni-input {
			font-size: 30upx;
			height: 50upx;
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

			&.active {
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}

	.img-captcha {
		width: 150upx;
		height: 60upx;
	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.links {
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;

		view {
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}

		.link-highlight {
			color: $color-primary
		}
	}

	.data-v-2b43f841 {
		border: none !important;
	}
</style>
