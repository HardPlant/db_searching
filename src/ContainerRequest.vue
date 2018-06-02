<template>
    <v-card>
        <v-card-title>
            <h2>구조 요청</h2>
        </v-card-title>
        <v-card-text>
            <request-form></request-form>
        </v-card-text>
    </v-card>
</template>

<script>
import RequestForm from './components/RequestForm.vue'
export default {
    name:"Container",
    components:{RequestForm}
}
</script>

<style>

</style>
