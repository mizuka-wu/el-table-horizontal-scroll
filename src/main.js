import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fixed from './Fixed'
import { directive } from './lib/directive'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.directive('h-scroll', directive)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: [
      { path: '/fixed', component: Fixed }
    ]
  })
}).$mount('#app')
