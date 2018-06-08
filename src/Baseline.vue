<template>
  <v-app id="app">
    <v-toolbar color="black" dark fixed app>
      <v-icon>call_to_action</v-icon>
      <v-toolbar-title align-center>DB 검색기</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
        <v-list-tile-title class="title">
          <h4 style="text-align:center;">[ DB 검색기 ] </h4>
        </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
        <v-list-tile-sub-title>
          <h4 style="text-align:center">DB를 검색합니다</h4>
        </v-list-tile-sub-title>
        </v-list-tile>
        <v-divider></v-divider>
        <app-drawer-not-logged-in></app-drawer-not-logged-in>
        <v-divider></v-divider>
        <app-drawer-logged-in></app-drawer-logged-in>
        <v-divider></v-divider>
        <app-drawer-admin></app-drawer-admin>
      </v-list>
    </v-navigation-drawer>
    <v-content>
        <v-container fluid>
            <v-fade-transition mode="out-in">
                <router-view/>
            </v-fade-transition>
        </v-container>
        
    </v-content>
    <v-footer color="black" app>
      <span class="white--text">&copy; HardPlant</span>
    </v-footer>
  </v-app>
</template>

<script>

import AppDrawerNotLoggedIn from './AppDrawerNotLoggedIn.vue'
import AppDrawerLoggedIn from './AppDrawerLoggedIn.vue'
import AppDrawerAdmin from './AppDrawerAdmin.vue'

  export default {
    data: () => ({
      drawer: null,
      showModal:false,
      valid: true,
      requester :'1',
      lang : 0,
      long : 0,
      major : ''
    }),
    props: {
      source: String
    },
    components : {
      AppDrawerNotLoggedIn, AppDrawerLoggedIn, AppDrawerAdmin
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post(CONF.request, {
            requester: this.requester,
            x: this.lang,
            y: this.long,
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
  
</script>
<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/nanumpenscript.css);
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

.ng{font-family: 'Nanum Gothic', sans-serif;}
#title{text-align: center;}
</style>