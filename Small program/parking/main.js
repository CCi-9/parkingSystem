import Vue from 'vue'
import App from './App'



import ParkingOperate from "./pages/ParkingOperate/ParkingOperate.vue"
import PersonalCenter from "./pages/PersonalCenter/PersonalCenter.vue"
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import CcButton from "@/components/cc-button/cc-button.vue"
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"

Vue.component('person', PersonalCenter)
Vue.component('park', ParkingOperate)
Vue.component('navBar', uniNavBar)
Vue.component('cBtn', CcButton)
Vue.component('uniList', uniList)
Vue.component('uniListItem', uniListItem)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$host = "localhost:8089"


wx.login({
	success(res) {
		console.log(res)
		console.log("login")
		wx.request({
			url: 'https://api.weixin.qq.com/sns/jscode2session',
			method: 'GET',
			data: {
				appid: 'wx26c1363c228ea8f3',
				secret: '40b0ed9ac9b162191e3294525e6a3d31',
				js_code: res.code,
				grant_type: 'authorization_code'
			},
			success: function(res) {
				console.log(res.data.openid)
				console.log("request")
				Vue.prototype.$openid = res.data.openid
				wx.request({
					url: "http://localhost:8089/smallProgram/getUser",
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //用于提交@RequestParam，且接受是一个一个字段
					},
					data: {
						openid: res.data.openid
					},
					success: function(result) {
						console.log(result)
						if (result.data.data != null) {
							App.globalData.userMsg = result.data.data
							console.log("main.js")
							console.log(App.globalData.userMsg)
							/*
							App.globalData.userMsg.id = result.data.data.id
							App.globalData.userMsg.username = result.data.data.username
							App.globalData.userMsg.phone = result.data.data.phone
							App.globalData.userMsg.sex = result.data.data.sex
							App.globalData.userMsg.balance = result.data.data.balance*/
							App.globalData.userRegiste = true
						}
					}
				})
			},
			fail: function(res) {

			},
		})
	}
})


const app = new Vue({
	...App
})
app.$mount()
