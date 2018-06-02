<template id="container-showroom">
    <v-container>
        <v-card>
            <v-card-title>
            <h1>구급실 현황</h1>
            </v-card-title>
            <v-card-text>
            <bed-table></bed-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import BedTable from './components/Table_Beds.vue'
export default{
    name : "container",
    components : {BedTable}
}
</script>

<style>

</style>
