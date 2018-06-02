<template>
<v-card :width="width" :height="height">
    <v-card-title>
        <h2>일당 평균 출동 수</h2>
    </v-card-title>
    <v-card-text>
    <bar-example></bar-example>
    </v-card-text>
</v-card>
</template>

<script>
import BarExample from './BarChart.js'
export default {
  name: 'app',
  props: {
    width : {default : "50%"},
    height : {default : "auto"},
  },
  components: {
    BarExample
  }
}
</script>

<style>

</style>
