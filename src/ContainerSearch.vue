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
            item-key="data_id"
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
            <td>{{ props.item.data_id }}</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.text }}</td>
            <td class="text-xs-right">{{ props.item.url }}</td>
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
export default{
    name : "container",
    components : {TableRequests},
    
    data(){
        return {
      query : "", 
      pagination: {
        sortBy: 'data_id'
      },
      headers: [
        {
          text: '데이터 번호',
          align: 'left',
          value: 'data_id'
        },
        { text: '제목', value: 'title' },
        { text: '내용', value: 'text' },
        { text: 'URL', value: 'url' },
      ],
      searchResults: [
        {
          value: false,
          data_id: '1',
          title : "홍길동전",
          text : "삼원",
          url : "삼성서",
        },{
          value: false,
          data_id: '2',
          title : "감돔전",
          text : "삼울병원",
          url : "삼성원",
        },{
          value: false,
          data_id: '3',
          title : "귀여운",
          text : "울원",
          url : "삼성원",
        },
        
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
      searchQuery(){
          console.log(this.query);
      }
    
    }
}
</script>

<style>

</style>
