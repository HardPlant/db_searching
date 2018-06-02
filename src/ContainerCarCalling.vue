<template id="container-schedule">
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12>
    <line-recent-call></line-recent-call>
        </v-flex>
        <v-flex xs12>
        <table-cars></table-cars>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import LineRecentCall from './components/LineRecentCall.vue'
import TableCars from './components/Table_Cars.vue'
export default{
    name: "Container",
    components: {LineRecentCall, TableCars}
}
</script>

<style>

</style>
