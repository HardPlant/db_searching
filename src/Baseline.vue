<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      fixed
      app
    >
      <v-list dense>
        <v-list-tile :to="{path:'/'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>대시보드</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/currentbeds'}">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>구급실 현황</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/currentcalls'}">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>구급차 출동 상황</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/currentrequests'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>응급구조 요청 현황</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="black" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>응급구조정보공유체계 현황판</v-toolbar-title>
    </v-toolbar>
    <v-content>
        <v-container fluid>
            <v-fade-transition mode="out-in">
                <router-view/>
            </v-fade-transition>
        </v-container>
    </v-content>
    <v-footer color="black" app>
      <span class="white--text">&copy; Information Security Hackerton 2018</span>
    </v-footer>
  </v-app>
</template>

<script>

  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    },
    components : {
    }
  }
</script>