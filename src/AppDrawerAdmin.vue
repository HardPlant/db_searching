<template>
    <div>
          <v-list-tile :to="{path:'/datamgmt'}">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>검색데이터 관리</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/requestmgmt'}">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>검색결과 조회 및 관리</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/usermgmt'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>사용자 관리</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </div>
</template>

<script>
export default {
    data (){
        return {
            showModal:false,
        }
    }
}
</script>

<style>

</style>
