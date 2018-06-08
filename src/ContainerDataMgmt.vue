<template id="container">
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12>
            <table-data></table-data>
        </v-flex>
        <v-flex xs12 justify-end @click="addData=true">
            <v-btn indigo>데이터 추가</v-btn>
        </v-flex>
        <v-dialog v-model="addData" max-width="500px">
        <v-card>
          <v-card-title>
            데이터 추가
          </v-card-title>
          <v-card-text>
            <v-form>
        <v-text-field
        v-model="title"
        :rules="[v=>!!v || '제목은 필수입니다']"
        label="제목"
        required></v-text-field>
        <v-text-field
        v-model="text"
        :rules="[v=>!!v || '내용은 필수입니다']"
        label="내용"
        required></v-text-field>
        <v-text-field
        v-model="url"
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
        @click="submit"
        >
        가입하기
        </v-btn>
            <v-btn  @click.stop="addData=false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    


    </v-container>
</template>

<script>
import TableData from './components/TableData.vue'
export default{
    name : "container",
    components : {TableData},
    data(){
        return {
            addData : false,
            valid:true,
            title:"",
            text:"",
            url:""
        }
    },
    methods:{
        submit : ()=>{
            console.log("OK!");
            this.addData=false;
        },
    }
}
</script>

<style>

</style>
