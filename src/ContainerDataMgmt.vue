<template id="container">
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12>
            <table-data></table-data>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import TableData from './components/TableData.vue'
export default{
    name : "container",
    components : {TableData},
    data(){
        return {
        }
    },
    methods:{
    }
}
</script>

<style>

</style>
