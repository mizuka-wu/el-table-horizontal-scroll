import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { directive } from './lib/directive'
import Fixed from './Fixed'
import FixedAlways from './FixedAlways'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.directive('h-scroll', directive)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: [
      { path: '/fixed', component: Fixed },
      { path: '/always', component: FixedAlways }
    ]
  })
}).$mount('#app')
