<template id="container-main">
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
  
      <line-recent-call></line-recent-call>
      </v-flex>
      <v-flex xs6>
      <table-cars></table-cars>
      </v-flex>
      <v-flex xs6>
      <table-beds></table-beds>
      </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default{
    components : {},
    data: () => ({

    }),

    
}
</script>

<style>
</style>
