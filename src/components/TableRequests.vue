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
                item-key="request_id"
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
                <td>{{ props.item.request_id }}</td>
                <td class="text-xs-right">{{ props.item.title }}</td>
                <td class="text-xs-right">{{ props.item.time }}</td>
                <td class="text-xs-right">{{ props.item.user_id }}</td>
                <td class="text-xs-right">{{ props.item.query }}</td>
                <td class="text-xs-right">{{ props.item.num_results }}</td>
                </tr>
                </template>
                </v-data-table>
            </v-card-text>
            <p style="color:grey;text-align:right;margin-right:5px">요청을 클릭해 상세 조회 및 삭제할 수 있습니다.  </p>
        </v-card>
</template>

<script>
import CONF from "../Config.js";
import eventBus from "../EventBus.js";

export default {data : ()=>({
      pagination: {
        sortBy: 'request_id'
      },
      headers: [
        {
          text: '요청 번호',
          align: 'left',
          value: 'request_id'
        },
        { text: '제목', value: 'title' },
        { text: '내용', value: 'time' },
        { text: '사용자 ID', value: 'user_id' },
        { text: '검색 단어', value: 'query' },
        { text: '결과 갯수', value: 'num_results' },
      ],
      requests: [
        {
          value: false,
          request_id: '1',
          title : "홍길동전",
          time : "삼원",
          user_id : "삼성서",
          query : "쿼리",
          num_results : 1
        },{
          value: false,
          request_id: '2',
          title : "감돔전",
          time : "삼울병원",
          user_id : "삼성원",
          query : "쿼리",
          num_results : 1
        },{
          value: false,
          request_id: '3',
          title : "귀여운",
          time : "울원",
          user_id : "삼성원",
          query : "쿼리",
          num_results : 1
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
