<template>
	<view style="padding-top: 20px;">
		<navBar left-icon="back" 
				background-color="#f1f1f1" 
				:shadow='false' 
				@clickLeft='goback'
				title="待缴车费"></navBar>

		<uni-list>
			<uni-list-item v-for="car in carList" v-bind:key="car" :title="car.code" :show-arrow="false" :note="car.time">
				<template v-slot:right="">
					<button class="mini-btn" type="primary" size="mini" @tap="updateOpen(car.code)">缴费{{car.fee.toFixed(2)}}元</button>
				</template>
			</uni-list-item>
		</uni-list>		

		

	</view>
</template>

<script>

	export default {
		components:{

		},
		data() {
			
			return {
				provinces:'',
				number:'',
				existProvinces:'',
				existNumber:'',		
				carList:[
					{code:'粤D A1230',time:'2009/6/15 13:55:30',fee:12.90},
					{code:'粤B 12345',time:'2012/6/19 10:45:30',fee:13.02},
					{code:'粤D A1230',time:'2009/6/15 13:25:30',fee:14.00},
					{code:'粤C A6H45',time:'2007/6/15 17:45:30',fee:15.00},
				],
				bgcolor1:"linear-gradient(-45deg, #C9E2B3 0%, rgba(12, 255, 182, 1) 100%);",
				bgcolor2:"linear-gradient(-45deg, #C9E2B3 0%, rgba(222, 255, 243, 1) 100%);",
				
			}
		},
		methods: {
			addOpen(){
			    this.$refs.addPopup.open()
			},
			
			updateOpen(carCode){
				this.$refs.updatePopup.open()
				let car = carCode.split(" ")
				this.existProvinces = car[0]
				this.existNumber = car[1]			
			},
			
			goback(){
				console.log("点了我")
				uni.navigateBack({});
			},
			addCar(){
				console.log("添加车牌")
			}
		}
	}
</script>

<style lang="scss">
.title{
	width: 100%;
	height: 50px; 
	border-bottom: 1px solid #e2e2e2;
	text-align: center;
	font-size: large;
	line-height: 50px;
}
.licence{
	
}
	.carLicence{
		width: 100%;
		padding: 60upx 100upx 100upx;
		margin-bottom: 40upx;
		.provinces{
			font-size: 60upx;
			height: 80upx;
			border-bottom: 1px solid #41d073;
			width: 130upx;
			display: inline-block;
		}
		.number{
			font-size: 60upx;
			height: 80upx;
			border-bottom: 1px solid #41d073;
			width: 280upx;
			margin-left:130upx ;
			display: inline-block;
		}
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;
			&:after{
				border: none
			}
		} 
	}
</style>
