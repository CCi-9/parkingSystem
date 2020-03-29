<template>
	<view style="width: 100%;overflow: hidden;" >
		<view class="top">
			<view class="avator">
				<img class='tx' src="../../static/bg/logo.png">
			</view>
		</view>
		<view class="list-content">
			<view class="list" style="border-bottom:15upx solid  #f1f1f1;">
				<view class="li noborder"  @tap="pageSwitch('MyWallet')" hover-class="listHover">
					<image src="../../static/user/card.png" style="width: 36upx;height: 36upx;"></image>
					<view class="text">我的钱包</view>
					<view class="text" style="float:right; margin: 0;width: 170px;">余额:￥{{user.balance.toFixed(2)}}</view>
					<image class="to" src="../../static/bg/to.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li " @tap="pageSwitch('MyMessage')" hover-class="listHover">
					<image src="../../static/user/center.png" style="width: 36upx;height: 36upx;"></image>
					<view class="text">个人中心</view> 
					<image class="to" src="../../static/bg/to.png"></image>
				</view>
				<view class="li " @tap="pageSwitch('ParkingRecord')" hover-class="listHover">
					<image src="../../static/user/record.png" style="width: 36upx;height: 36upx;"></image>
					<view class="text">停车记录</view>
					<image class="to" src="../../static/bg/to.png"></image>
				</view>
				<view class="li " @tap="pageSwitch('BandingCar')" hover-class="listHover">
					<image src="../../static/user/binding.png" style="width: 36upx;height: 36upx;"></image>
					<view class="text">绑定车牌</view>
					<image class="to" src="../../static/bg/to.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"PersonalCernter",
		data() {
			return {
				user: getApp().globalData.userMsg
			}
		},

		methods: {
			pageSwitch(page){
				console.log("=======" + getApp().globalData.userRegiste + "=======" )
				if(getApp().globalData.userRegiste == true)
					uni.navigateTo({url: "/pages/PersonalCenter/" + page})
				else 
					uni.navigateTo({url: "/pages/index/registration"})
			}
		}
	}
</script>

<style scoped>
.top{
	height: 420upx;
	width: 100%;
	background-color: #dbf3e5;
	display:flex; justify-content:center; align-items:center;
}
.avator{


	display:flex; justify-content:center; align-items:center;
}
.tx{ width: 170px;height: 170px;}
.list-content{color: #000;background: #fff;}
.list{width:100%;background: #fff;}
.li{width:100%; height:130upx; padding:0 4%; border-bottom:1px solid rgb(243,243,243); display:flex; align-items:center;}
.icon{flex-shrink:0;width:50upx;height:50upx;}
.text{padding-left:20upx;width:100%;color:#000000;font-size: medium;}
.to{flex-shrink:0;width:40upx;height:40upx;}
.listHover{
	background-color: #eaeaea;
}
</style>
