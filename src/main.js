import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Plugin } from './lib/directive'
import Fixed from './Fixed'
import FixedAlways from './FixedAlways'
import WithCss from './WithCss'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Plugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: [
      { path: '/fixed', component: Fixed },
      { path: '/always', component: FixedAlways },
      { path: '/withCss', component: WithCss }
    ]
  })
}).$mount('#app')
