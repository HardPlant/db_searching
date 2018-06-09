<template id="container">
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12>
            <h1>검색</h1>
            <v-layout row wrap>
            <v-text-field v-model="query">
            </v-text-field>
            <v-btn @click="searchQuery">
                <v-icon>search</v-icon>검색
            </v-btn>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-card>
            <v-card-title>
            <h2>검색 결과</h2>
            </v-card-title>
            <v-divider/>
            <v-card-text>
            <v-data-table
            :headers="headers"
            :items="searchResults"
            :pagination.sync="pagination"
            select-all
            item-key="DATA_ID"
            class="elevation-1"
            >
            <template slot="headers" slot-scope="props">
            <tr>
            <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
            >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
            </th>
            </tr>
            </template>
            <template slot="items" slot-scope="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>{{ props.item.DATA_ID }}</td>
            <td class="text-xs-right">{{ props.item.TITLE }}</td>
            <td class="text-xs-right">{{ props.item.TEXT }}</td>
            <td class="text-xs-right">{{ props.item.URL }}</td>
            </tr>
            </template>
            </v-data-table>
            </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import TableRequests from './components/TableRequests.vue'
import CONF from "./components/Config.js";

export default{
    name : "container",
    components : {TableRequests},
    
    data(){
        return {
      query : "", 
      pagination: {
        sortBy: 'DATA_ID'
      },
      headers: [
        {
          text: '데이터 번호',
          align: 'left',
          value: 'DATA_ID'
        },
        { text: '제목', value: 'TITLE' },
        { text: '내용', value: 'TEXT' },
        { text: 'URL', value: 'URL' },
      ],
      searchResults: [ 
      ]
    }
    },
    methods:{
        submit(){
            console.log("OK!");
        },
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.searchResults.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      searchQuery() {
      console.log(`[INFO] : fetching data at ${CONF.search}`);
      console.log(this.query);
      this.$axios.post(CONF.search,{
        query:this.query
      }).then(response => {
        if(response.data.length == 0){
          this.searchResults = [];
        }
        this.searchResults = response.data;
        console.log("Fetch Result:");
        console.log(response);
      });
      }
    
    }
}
</script>

<style>

</style>
