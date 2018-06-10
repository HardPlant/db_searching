<template>
  <div>
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
                <tr :active="props.selected">
                <td>{{ props.item.DATA_ID }}</td>
                <td class="text-xs-right">{{ props.item.TITLE }}</td>
                <td class="text-xs-right">{{ props.item.TEXT }}</td>
                <td class="text-xs-right">{{ props.item.URL }}</td>
                        <td class="justify-center layout px-0">
                          
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
                </tr>
                </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <!-- 데이터 추가 -->
       <v-dialog v-model="addData" max-width="500px">
         <v-btn slot="activator" color="primary" dark class="mb-2">데이터 추가</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">데이터 추가</span>
          </v-card-title>
          <v-card-text>
            <v-form>
        <v-text-field
        v-model="addItem.TITLE"
        :rules="[v=>!!v || '제목은 필수입니다']"
        label="제목"
        required></v-text-field>
        <v-text-field
        v-model="addItem.TEXT"
        :rules="[v=>!!v || '내용은 필수입니다']"
        label="내용"
        required></v-text-field>
        <v-text-field
        v-model="addItem.URL"
        :rules="[v=>!!v || 'URL값은 필수입니다']"
        label="URL"
        required></v-text-field>
        
        <v-divider></v-divider>
            </v-form>
          </v-card-text>
          <v-card-actions>
              <v-btn
              color="primary"
        :disabled="!valid"
        @click.native="submit"
        >
        저장
        </v-btn>
            <v-btn  @click.native="close">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 데이터 업데이트 -->
      <v-dialog v-model="updateData" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">데이터 업데이트</span>
          </v-card-title>
          <v-card-text>
            <v-form>
        <v-text-field
        v-model="editedItem.TITLE"
        :rules="[v=>!!v || '제목은 필수입니다']"
        label="제목"
        required></v-text-field>
        <v-text-field
        v-model="editedItem.TEXT"
        :rules="[v=>!!v || '내용은 필수입니다']"
        label="내용"
        required></v-text-field>
        <v-text-field
        v-model="editedItem.URL"
        :rules="[v=>!!v || 'URL값은 필수입니다']"
        label="URL"
        required></v-text-field>
        
        <v-divider></v-divider>
            </v-form>
          </v-card-text>
          <v-card-actions>
              <v-btn
              color="primary"
        :disabled="!valid"
        @click.native="submitUpdate"
        >
        저장
        </v-btn>
            <v-btn  @click.native="closeUpdate">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import CONF from "./Config.js";

export default {data : ()=>({
            title:"",
            text:"",
            url:"",
            addData : false,
            updateData : false,
            valid:true,
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
        
      ],
      addItem: {
          DATA_ID: '',
          TITLE : "",
          TEXT : "",
          URL : "",
      },
      editedItem: {
          DATA_ID: '',
          TITLE : "",
          TEXT : "",
          URL : "",
      },
    }),
        computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
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
      },
      deleteData: function(item){
        this.$axios.delete(`${CONF.data}/${item["DATA_ID"]}`).then(response => {
          this.fetchData();
        }
        );
      },

      editItem (item) {
        this.editedIndex = this.datas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem);
        console.log(this.editedItem);
        this.updateData = true
      },

      deleteItem (item) {
        const index = this.datas.indexOf(item)
        confirm('정말 삭제하시겠습니까?') && this.deleteData(item)
      },
      submit(){
        console.log(this.addItem);
        this.$axios.post(`${CONF.data}`,{
          title: this.addItem["TITLE"],
          text: this.addItem["TEXT"],
          url: this.addItem["URL"]
        }).then(response => {
          this.fetchData();
      });
      this.addItem = {
          DATA_ID: '',
          TITLE : "",
          TEXT : "",
          URL : "",
      }
        this.close();
      },
      close(){
        this.addData=false;
      },
      submitUpdate(){
          console.log(this.editedItem);
          this.$axios.put(`${CONF.data}/${this.editedItem["DATA_ID"]}`,{
          title: this.editedItem["TITLE"],
          text: this.editedItem["TEXT"],
          url: this.editedItem["URL"]
        }).then(response => {
          this.fetchData();
      });
          this.closeUpdate();
      },
      closeUpdate(){
        this.updateData=false;
      }
    }
}
</script>

<style>

</style>
