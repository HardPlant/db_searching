<template>
    <v-card>
            <v-card-title>
                <h2>사용자 조회</h2>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="users"
                :pagination.sync="pagination"
                select-all
                item-key="USER_ID"
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
                <td>{{ props.item.USER_ID }}</td>
                <td class="text-xs-right">{{ props.item.NAME }}</td>
                <td class="text-xs-right">{{ props.item.EMAIL }}</td>
                <td class="text-xs-right">{{ props.item.COUNTRY }}</td>
                </tr>
                </template>
                </v-data-table>
            <p style="color:grey;text-align:right;margin-right:5px">요청을 클릭해 상세 조회 및 삭제할 수 있습니다.  </p>
            </v-card-text>
        </v-card>
</template>

<script>
import CONF from "./Config.js";

export default {
  data : ()=>({
      pagination: {
        sortBy: 'USER_ID'
      },
      headers: [
        {
          text: '사용자 번호',
          align: 'left',
          value: 'USER_ID'
        },
        { text: '이름', value: 'NAME' },
        { text: '이메일', value: 'EMAIL' },
        { text: '국가', value: 'COUNTRY' },
      ],
      users: [
        {
          value: false,
          USER_ID: '1',
          NAME : "홍길동전",
          EMAIL : "삼원",
          COUNTRY : "한국"
        },{
          value: false,
          USER_ID: '1',
          NAME : "홍길동전",
          EMAIL : "삼원",
          COUNTRY : "한국"
        },{
          value: false,
          USER_ID: '1',
          NAME : "홍길동전",
          EMAIL : "삼원",
          COUNTRY : "한국"
        },{
          value: false,
          USER_ID: '1',
          NAME : "홍길동전",
          EMAIL : "삼원",
          COUNTRY : "한국"
        },
      ]
    }),  mounted: function() {
    console.log("[INFO] : ON MOUNT :");
    this.fetchData();
  },
methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.users.slice()
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
      console.log(`[INFO] : fetching data at ${CONF.user}`);
      this.$axios.get(CONF.user).then(response => {
        this.users = response.data;
        console.log("Fetch Result:");
        console.log(response);
      });
    }
    }
}
</script>

<style>

</style>
