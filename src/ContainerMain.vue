<template id="container-main">
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
          <v-btn @click="clickAdmin">관리자 모드</v-btn>
      </v-flex>
      <v-flex xs6>
          <v-btn @click="clickMember">회원 모드</v-btn>
      </v-flex>
      <v-flex xs6>
          <v-btn @click="clickGuest">비회원 모드</v-btn>
      </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import {EventBus} from './components/EventBus.js'
export default{
    components : {},
    data: () => ({
    }),
    mounted(){
    },
    methods:{
        clickAdmin(){
            EventBus.$emit('admin', true)
        },
        clickGuest(){
            EventBus.$emit('guest', true)
        },
        clickMember(){
            EventBus.$emit('member', true)
        }
    }
}
</script>

<style>
</style>
