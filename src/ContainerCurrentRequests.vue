<template id="container-showroom">
    <v-container>
        <recent-request width="100%" height="auto">
        </recent-request>
    </v-container>
</template>

<script>
import RecentRequest from "./components/CardBarChart.vue"
export default{
    name: "Container",
    components : {RecentRequest}
}
</script>

<style>

</style>
