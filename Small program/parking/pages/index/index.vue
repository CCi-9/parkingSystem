<template>
	<view class="baseView" id="baseView">
		<park v-if="curPage=='page1'"></park>
		<person v-if="curPage=='page2'"></person>
		<adTabbar :tabHeight='tabHeight'>
			<adTabbarItem text="停车" dataCur="page1" class="maxWidth" @click="navClick" :textColor="curPage=='page1'? '#36ab60':'#9B9B9B'"
			 :icon="'../../static/andy-ADTabbar/home' + [curPage=='page1'?'-hover':''] + '.png'"></adTabbarItem>
			<view class="middleItem" @tap="scan">
				<view class="buttonView">[ ]</view>
				<text>扫码缴费</text>
			</view>
			<adTabbarItem text="我的" dataCur="page2" class="maxWidth" @click="navClick" :textColor="curPage=='page2'? '#36ab60':'#9B9B9B'"
			 :icon="'../../static/andy-ADTabbar/my' + [curPage=='page2'?'-hover':''] + '.png'"></adTabbarItem>
		</adTabbar>
	</view>
</template>

<script>
	import AppConfig from '@/common/appConfig.js';
	import adTabbar from '@/components/andy-ADTabbar/andy-ADTabbar.vue';
	import adTabbarItem from '@/components/andy-ADTabbar/andy-ADTabbarItem.vue';



	export default {
		components: {
			adTabbar,
			adTabbarItem
		},
		data() {
			return {
				curPage: 'page1',
				tabHeight: AppConfig.TabbarHeight,
			}
		},
		onHide() {
			console.log("index加载了")

		},

		methods: {
			// 导航栏切换
			navClick: function(e) {
				this.curPage = e.currentTarget.dataset.cur
			},
			// 中间按钮点击
			scan() {
				wx.scanCode({
					success(res) {
						console.log(res)
					}

				})
			},
			//获取用户初始信息
		}
	}
</script>

<style>
	.middleItem {
		min-width: calc(100vw / 5);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 22upx;
	}

	.buttonView {
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		margin-top: -60upx;
		background-color: #36ab60;
		margin-bottom: 10upx;

		color: #ececec;
		line-height: 100upx;
		text-align: center;
		font-size: 50upx;
	}
</style>
