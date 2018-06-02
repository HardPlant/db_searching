<template id="container-showroom">
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12>
            <bed-table></bed-table>
        </v-flex>
        <v-flex xs12>
            <patient-table></patient-table>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import BedTable from './components/Table_Beds.vue'
import PatientTable from './components/Table_Patient.vue'
export default{
    name : "container",
    components : {BedTable, PatientTable}
}
</script>

<style>

</style>
