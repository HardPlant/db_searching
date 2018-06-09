<template>
    <v-card>
            <v-card-title>
                <h2>요청 현황</h2>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="requests"
                :pagination.sync="pagination"
                select-all
                item-key="REQUEST_ID"
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
                <td>{{ props.item.REQUEST_ID }}</td>
                <td class="text-xs-right">{{ props.item.TITLE }}</td>
                <td class="text-xs-right">{{ props.item.TIME }}</td>
                <td class="text-xs-right">{{ props.item.USER_ID }}</td>
                <td class="text-xs-right">{{ props.item.QUERY }}</td>
                <td class="text-xs-right">{{ props.item.NUM_RESULTS }}</td>
                </tr>
                </template>
                </v-data-table>
            </v-card-text>
            <p style="color:grey;text-align:right;margin-right:5px">요청을 클릭해 상세 조회 및 삭제할 수 있습니다.  </p>
        </v-card>
</template>

<script>
import CONF from "./Config.js";

export default {data : ()=>({
      pagination: {
        sortBy: 'REQUEST_ID'
      },
      headers: [
        {
          text: '요청 번호',
          align: 'left',
          value: 'REQUEST_ID'
        },
        { text: '제목', value: 'TITLE' },
        { text: '내용', value: 'TIME' },
        { text: '사용자 ID', value: 'USER_ID' },
        { text: '검색 단어', value: 'QUERY' },
        { text: '결과 갯수', value: 'NUM_RESULTS' },
      ],
      requests: [
        {
          value: false,
          REQUEST_ID: '1',
          TITLE : "홍길동전",
          TIME : "삼원",
          USER_ID : "삼성서",
          QUERY : "쿼리",
          NUM_RESULTS : 1
        },{
          value: false,
          REQUEST_ID: '2',
          TITLE : "감돔전",
          TIME : "삼울병원",
          USER_ID : "삼성원",
          QUERY : "쿼리",
          NUM_RESULTS : 1
        },{
          value: false,
          REQUEST_ID: '3',
          TITLE : "귀여운",
          TIME : "울원",
          USER_ID : "삼성원",
          QUERY : "쿼리",
          NUM_RESULTS : 1
        },
        
      ]
    }),  mounted: function() {
    console.log("[INFO] : ON MOUNT :");
    this.fetchData();
  },
methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.requests.slice()
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
      console.log(`[INFO] : fetching data at ${CONF.request}`);
      this.$axios.get(CONF.request).then(response => {
        this.requests = response.data;
        console.log("Fetch Result:");
        console.log(response);
      });
    }
    }
}
</script>

<style>

</style>
