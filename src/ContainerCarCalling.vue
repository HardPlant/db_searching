<template id="container-schedule">
    <v-container>
        <v-card>
            <v-card-title>구급차 출동 상황</v-card-title>
            <line-recent-call></line-recent-call>
        </v-card>
    </v-container>
</template>

<script>
import LineRecentCall from './components/LineRecentCall.vue'
export default{
    name: "Container",
    components: {LineRecentCall}
}
</script>

<style>

</style>
