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
                item-key="user_id"
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
                <td>{{ props.item.user_id }}</td>
                <td class="text-xs-right">{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.email }}</td>
                <td class="text-xs-right">{{ props.item.country }}</td>
                </tr>
                </template>
                </v-data-table>
            <p style="color:grey;text-align:right;margin-right:5px">요청을 클릭해 상세 조회 및 삭제할 수 있습니다.  </p>
            </v-card-text>
        </v-card>
</template>

<script>
import CONF from "../Config.js";
import eventBus from "../EventBus.js";

export default {
  data : ()=>({
      pagination: {
        sortBy: 'user_id'
      },
      headers: [
        {
          text: '사용자 번호',
          align: 'left',
          value: 'user_id'
        },
        { text: '이름', value: 'name' },
        { text: '이메일', value: 'email' },
        { text: '국가', value: 'country' },
      ],
      users: [
        {
          value: false,
          user_id: '1',
          name : "홍길동전",
          email : "삼원",
          country : "한국"
        },{
          value: false,
          user_id: '1',
          name : "홍길동전",
          email : "삼원",
          country : "한국"
        },{
          value: false,
          user_id: '1',
          name : "홍길동전",
          email : "삼원",
          country : "한국"
        },{
          value: false,
          user_id: '1',
          name : "홍길동전",
          email : "삼원",
          country : "한국"
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
