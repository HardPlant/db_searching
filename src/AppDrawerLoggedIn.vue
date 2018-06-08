<template>
    <div>
                <v-list-tile :to="{path:'/currentbeds'}">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>검색 신청</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/currentcalls'}">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>검색 결과 클릭</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile color="red" :to="{path:'/currentrequests'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>회원 탈퇴</v-list-tile-title>
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
