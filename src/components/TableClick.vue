<template>
    <v-card>
            <v-card-title>
                <h2>조회 현황</h2>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="clicks"
                :pagination.sync="pagination"
                select-all
                item-key="CLICK_ID"
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
                <td>{{ props.item.CLICK_ID }}</td>
                <td class="text-xs-right">{{ props.item.TIME }}</td>
                <td class="text-xs-right">{{ props.item.URL }}</td>
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
        sortBy: 'CLICK_ID'
      },
      headers: [
        {
          text: '요청 번호',
          align: 'left',
          value: 'CLICK_ID'
        },
        { text: '조회 시간', value: 'TIME' },
        { text: '조회된 URL', value: 'URL' },
      ],
      clicks: [
        {
          value: false,
          TIME : "삼원",
          CLICK_ID: '1',
          URL : 1
        },{
          value: false,
          CLICK_ID: '2',
          TIME : "삼울병원",
          URL : 1
        },{
          value: false,
          CLICK_ID: '3',
          TIME : "울원",
          URL : 1
        },
        
      ]
    }),
      mounted: function() {
    console.log("[INFO] : ON MOUNT :");
    console.log(CONF.click)
    this.fetchData();
  },
methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.clicks.slice()
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
      console.log(`[INFO] : fetching data at ${CONF.click}`);
      this.$axios.get(CONF.click).then(response => {
        this.clicks = response.data;
        console.log("Fetch Result:");
        console.log(response);
      });
    }
    }
}
</script>

<style>

</style>
