<template id="container-schedule">
    <v-container>
        <v-card>
            <v-card-title>
                <h1>구급차 출동 상황</h1>
            </v-card-title>
            <v-card-text>
                <line-recent-call></line-recent-call>
            </v-card-text>
        </v-card>
        <table-cars></table-cars>
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
