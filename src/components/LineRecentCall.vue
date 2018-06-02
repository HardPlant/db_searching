<template>
<v-card :width="width" :height="height">
    <v-card-title>
        <h2>최근 출동 횟수</h2>
    </v-card-title>
    <v-card-text>
    <line-example></line-example>
    </v-card-text>
</v-card>
</template>

<script>
import LineExample from './LineRecentCall.js'
export default {
  name: 'app',
  props: {
    width : {default : "50%"},
    height : {default : "auto"},
  },
  components: {
    LineExample
  }
}
</script>

<style>

</style>
