<template>
<v-container>
    <v-card>
        <v-card-title>
            <h2>구조 요청</h2>
        </v-card-title>
        <v-card-text>
            <request-form></request-form>
        </v-card-text>
    </v-card>
    <v-card>
        <v-card-text>
            <request-form></request-form>
        </v-card-text>
    </v-card>
</v-container>
</template>

<script>
import RequestForm from './components/RequestForm.vue'
import TableRequest from './components/Table_Requests.vue'
export default {
    name:"Container",
    components:{RequestForm, TableRequest}
}
</script>

<style>

</style>
