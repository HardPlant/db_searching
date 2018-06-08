import Vue from 'vue'
import Vuetify from 'vuetify'
//import App from './SimpleRoute.vue'
import App from './Baseline.vue'
import VueRouter from 'vue-router'

import ContainerMain from './ContainerMain.vue'
import ContainerCarCalling from './ContainerCarCalling.vue'
import ContainerCurrentBeds from './ContainerCurrentBeds.vue'
import ContainerCurrentRequests from './ContainerCurrentRequests.vue'
import ContainerRequest from './ContainerRequest.vue'

import ContainerDataMgmt from './ContainerDataMgmt.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)


const router = new VueRouter({
    routes: [{
        path: '/',
        component: ContainerMain
    }, {
        path: '/currentcalls',
        component: ContainerCarCalling
    }, {
        path: '/currentbeds',
        component: ContainerCurrentBeds
    }, {
        path: '/currentrequests',
        component: ContainerCurrentRequests
    }, {
        path: '/request',
        component: ContainerRequest
    }, {
        path: '/datamgmt',
        component: ContainerDataMgmt
    }]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})