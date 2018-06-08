<template id="container">
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12>
            <table-requests></table-requests>
            <table-click></table-click>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import TableRequests from './components/TableRequests.vue'
import TableClick from './components/TableClick.vue'
export default{
    name : "container",
    components : {TableRequests, TableClick},
    data(){
        return {
            addData : false,
            valid:true,
        }
    },
    methods:{
        submit : ()=>{
            console.log("OK!");
            this.addData=false;
        },
    }
}
</script>

<style>

</style>
