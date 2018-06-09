import Vue from 'vue'
import Vuetify from 'vuetify'
//import App from './SimpleRoute.vue'
import App from './Baseline.vue'
import VueRouter from 'vue-router'

import ContainerMain from './ContainerMain.vue'

import ContainerRequest from './ContainerRequest.vue'
import ContainerDataMgmt from './ContainerDataMgmt.vue'
import ContainerUsers from './ContainerUsers.vue'
import ContainerSearch from './ContainerSearch.vue'
import axios from 'axios'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.prototype.$axios = axios;

const router = new VueRouter({
    routes: [{
        path: '/',
        component: ContainerMain
    }, {
        path: '/requestmgmt',
        component: ContainerRequest
    }, {
        path: '/datamgmt',
        component: ContainerDataMgmt
    }, {
        path: '/usermgmt',
        component: ContainerUsers
    }, {
        path: '/search',
        component: ContainerSearch
    }]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})