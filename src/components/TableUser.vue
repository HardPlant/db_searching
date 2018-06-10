<template>
<div>
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
                <tr :active="props.selected">
                <td>{{ props.item.USER_ID }}</td>
                <td class="text-xs-right">{{ props.item.NAME }}</td>
                <td class="text-xs-right">{{ props.item.EMAIL }}</td>
                <td class="text-xs-right">{{ props.item.COUNTRY }}</td>
                         <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
                </tr>
                </template>
                </v-data-table>
            <p style="color:grey;text-align:right;margin-right:5px">요청을 클릭해 상세 조회 및 삭제할 수 있습니다.  </p>
            </v-card-text>
        </v-card>
        <v-dialog v-model="updateData" max-width="500px">
              <v-card>
                <v-card-title>
                  사용자 업데이트
                </v-card-title>
                <v-card-text>
                  <v-form>
              <v-text-field
              v-model="editedItem.NAME"
              :rules="[v=>!!v || '이름은 필수입니다']"
              label="이름"
              required></v-text-field>
              <v-text-field
              v-model="editedItem.EMAIL"
              :rules="[v=>!!v || '이메일은 필수입니다']"
              label="이메일"
              required></v-text-field>
              <v-text-field
              v-model="editedItem.COUNTRY"
              :rules="[v=>!!v || '국가값은 필수입니다']"
              label="국가"
              required></v-text-field>
              
              <v-divider></v-divider>
              
                  </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                    color="primary"
              :disabled="!valid"
              @click="submit"
              >
              변경하기
              </v-btn>
                  <v-btn  @click.stop="close">닫기</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
</div>
</template>

<script>
import CONF from "./Config.js";

export default {
  data : ()=>({
    updateData:false,
    valid:true,
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
      editedItem: {
          USER_ID: '',
          NAME : "",
          EMAIL : "",
          COUNTRY : "",
      },
      
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
      },
      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem);
        console.log(this.editedItem);
        this.updateData = true
      },
      deleteData: function(item){
        console.log("item");
        this.$axios.delete(`${CONF.user}/${item["USER_ID"]}`).then(response => {
          this.fetchData();
        }
        );
      },
      deleteItem (item) {
        const index = this.users.indexOf(item)
        confirm('정말 삭제하시겠습니까?') && this.deleteData(item)
      },
      submit(){
         this.$axios.put(`${CONF.user}/${this.editedItem["USER_ID"]}`,{
          name: this.editedItem["NAME"],
          email: this.editedItem["EMAIL"],
          country: this.editedItem["COUNTRY"]}).then(()=>{
            this.fetchData();
            this.close();
          });
      },
      close(){
        this.updateData=false;
      },
    }
}
</script>

<style>

</style>
