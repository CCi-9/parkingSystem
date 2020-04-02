import Vue from 'vue'
import App from './App.vue'


import login from "./components/login";
import Index from "./components/Index";
import UserList from "./components/Customer/UserList";
import parkingRecord from "./components/record/parkingRecord";
import RechargeRecord from "./components/record/RechargeRecord";
import ParkingCar from "./components/parkingStatus/ParkingCar";
import CurrentBook from "./components/parkingStatus/CurrentBook";
import WaitQueue from "./components/parkingStatus/WaitQueue";

import VueRouter from 'vue-router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css'

import axios from 'axios'
import Qs from 'qs'

Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

Vue.config.productionTip = false

Vue.use(ViewUI)
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  { path: '/index', component: Index,
    children:[
      {path: 'user', component: UserList},
      {path: 'parkingRecord', component: parkingRecord},
      {path: 'rechargeRecord', component: RechargeRecord},
      {path: 'parkingCar', component: ParkingCar},
      {path: 'currentBook', component: CurrentBook},
      {path: 'waitQueue', component: WaitQueue},
    ]
  },
]

const router=new VueRouter({
  routes,
  mode: 'history'
});
  new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
