<template>
	<view class="content">
		<view class="logo">
			<image src="../../static/bg/logo.png" style="width: 170px;height: 170px;"></image>
		</view>
		<view class="uni-form-item uni-column">
			<input type="text" class="uni-input" v-model="username" placeholder="请输入用户名" />
		</view>
		<view class="uni-form-item uni-column">
			<input type="tel" class="uni-input" v-model="phone" placeholder="请输入手机号" />
		</view>

		<evan-radio v-model="sex" label="男" primary-color="#0cffb6" style="display: inline-flex; margin-right: 10px;">男</evan-radio>
		<evan-radio v-model="sex" label="女" primary-color="#0cffb6" style="display: inline-flex;">女</evan-radio>


		<!-- 		<view class="uni-form-item uni-column column-with-btn">
			<input type="text" class="uni-input"  placeholder="请输入图片验证码" v-model="captchaImg" />
			<image src="../../static/kitty-BasicLogin/captcha.jpg" mode="" class="img-captcha"></image>
		</view> 
		<view class="uni-form-item uni-column column-with-btn">
			<input type="number" class="uni-input" placeholder="请输入验证码" />
			<button :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn" @tap="sendCode">{{codeBtn.text}}</button>
		</view>-->
		<cBtn width='400rpx' @cctap="registUser" bgcolor=" linear-gradient(-45deg, #C9E2B3 0%, rgba(12, 255, 182, 1) 100%);">
			<span style='color: #505050;font-size: large;'>注册</span>
		</cBtn>
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
				captchaImg: '',
				seconds: 10,
				sex: '男',
				username: '',
				phone: '',
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				}
			}
		},
		onLoad() {

		},
		methods: {
			sendCode: function() {
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';

				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
					}
				}, 1000);
			},
			goback() {
				console.log("点了我")
				uni.navigateBack({});
			},

			registUser() {

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
					url: "http://localhost:8089/smallProgram/addUser",
					method: "POST",
					data: {
						openid: this.$openid,
						username: this.username,
						phone: this.phone,
						sex: this.sex,
						balance:0.00
					},
					header: {
					//	'content-type': 'application/x-www-form-urlencoded',//用于提交@RequestParam，且接受是一个一个字段
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
							
//							that.addSuccess()
							getApp().globalData.userRegiste = true
							getApp().globalData.userMsg = result.data.data

							wx.showToast({
								title: '添加成功',
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
			disableCodeBtn: function() {
				return this.codeBtn.waitingCode || this.captchaImg.length < 4;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;

	.content {
		padding: 60upx 100upx 100upx;
	}

	.logo {
		text-align: center;

		image {
			height: 200upx;
			width: 200upx;
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
</style>
