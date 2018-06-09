<template>
    <v-card>
            <v-card-title>
                <h2>데이터 현황</h2>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="datas"
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
</template>

<script>
import CONF from "./Config.js";

export default {data : ()=>({
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
      datas: [
        {
          value: false,
          DATA_ID: '1',
          TITLE : "홍길동전",
          TEXT : "삼원",
          URL : "삼성서",
        },{
          value: false,
          DATA_ID: '2',
          TITLE : "감돔전",
          TEXT : "삼울병원",
          URL : "삼성원",
        },{
          value: false,
          DATA_ID: '3',
          TITLE : "귀여운",
          TEXT : "울원",
          URL : "삼성원",
        },
        
      ]
    }),
  mounted: function() {
    console.log("[INFO] : Data URL is: ");
    console.log(CONF)
    console.log(CONF.data)
    this.fetchData();

  },
  methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.datas.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      fetchData: function() {
      console.log(`[INFO] : fetching data at ${CONF.data}`);
      this.$axios.get(CONF.data).then(response => {
        this.datas = response.data;
        console.log("Fetch Result:");
        console.log(response);
      });
    }
    }
}
</script>

<style>

</style>
