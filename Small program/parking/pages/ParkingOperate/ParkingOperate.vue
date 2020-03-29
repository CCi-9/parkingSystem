<template>
	<view style="width: 100%;overflow: hidden;" >
		<view class="top">
			<view class="avator">
				<CcButton 
				
				width='400rpx'
				@cctap="pageSwitch('ReservedParking')"
				bgcolor=" linear-gradient(-45deg, #C9E2B3 0%, rgba(12, 255, 182, 1) 100%);"
				>
					<span style='color: #505050;font-size: large;'>预约停车</span>
				</CcButton>
			</view>
		</view>

		<view class="list-content">
			<view class="list" >
				<view class="li noborder" @tap="pageSwitch('TimeExpand')" hover-class="listHover">
					<image src="../../static/parking/time.png" class="img"></image>
					<view class="text">停车续时</view>
					<image class="to" src="../../static/bg/to.png"></image>
				</view> 
			</view>
			<view class="list">
				<view class="li " @tap="pageSwitch('MakeUpFee')" hover-class="listHover">
					<image src="../../static/parking/pay.png" class="img"></image>
					<view class="text">待缴车费</view> 
					<image class="to" src="../../static/bg/to.png"></image>
				</view>
				<view class="li " @tap="pageSwitch('QuicklyRecharge')" hover-class="listHover">
					<image src="../../static/parking/recharge.png" class="img"></image>
					<view class="text">快速充值</view>
					<image class="to" src="../../static/bg/to.png"></image>
				</view>
			</view>
		</view>

<!-- 		<uni-list>
			<uni-list-item style="color: #000000;font-size: larger;" title="car.code" :show-arrow="true" thumb="../../static/parking/time.png">
			</uni-list-item>
		</uni-list>	 -->	
	</view>
</template>

<script>
	import CcButton from "../../components/cc-button/cc-button.vue"
	export default {
		name:"ParkingOperate",
		data() {
			return {
			}
		},
		components: {
		    CcButton
		},

		methods: {
			pageSwitch(page){
				console.log("dianwo")
				uni.navigateTo({url: "/pages/ParkingOperate/" + page})				
			}
		}
	}
</script>

<style scoped>
.top{
	height: 470upx;
	width: 100%;
	background-color: #dbf3e5;
	display:flex; justify-content:center; align-items:center;
}
.avator{
	width: 350upx;
	height: 160upx;
	display:flex; justify-content:center; align-items:center;
}
.tx{ width: 100%;height: 100%;	border-radius: 50%;}
.list-content{color: #000;background: #fff;}
.list{width:100%;background: #fff;}
.li{width:100%; height:130upx; padding:0 4%; border-bottom:1px solid rgb(243,243,243); display:flex; align-items:center;}
.icon{flex-shrink:0;width:50upx;height:50upx;}
.text{padding-left:20upx;width:100%;color:#000000;font-size: medium;}
.to{flex-shrink:0;width:40upx;height:40upx;}
.img{width: 40upx;height: 36upx;}

.listHover{
	background-color: #eaeaea;
}
</style>
