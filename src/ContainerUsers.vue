<template id="container">
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12>
            <table-user></table-user>
            <v-btn indigo @click="addUser=true">사용자 추가</v-btn>
              <v-dialog v-model="addUser" max-width="500px">
              <v-card>
                <v-card-title>
                  사용자 추가
                </v-card-title>
                <v-card-text>
                  <v-form>
              <v-text-field
              v-model="name"
              :rules="[v=>!!v || '이름은 필수입니다']"
              label="이름"
              required></v-text-field>
              <v-text-field
              v-model="email"
              :rules="[v=>!!v || '이메일은 필수입니다']"
              label="이메일"
              required></v-text-field>
              <v-text-field
              v-model="country"
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
              추가하기
              </v-btn>
                  <v-btn  @click.stop="addUser=false">닫기</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import TableUser from './components/TableUser.vue'
import CONF from "./components/Config.js";

export default{
    name : "container",
    components : {TableUser},
    data(){
        return {
            name : "",
            email : "",
            country : "",
            addUser : false,
            valid:true,
        }
    },
    methods:{
        submit(){
                  this.$axios.post(`${CONF.user}`,{
          name: this.name,
          email: this.email,
          country: this.country
        }).then(response => {
        alert(`${this.name} 사용자 추가가 완료되었습니다.`)
        this.closeRegister();
        });
        },
        closeRegister(){
        this.name = "";
        this.email = "";
        this.country = "";
        this.addUser=false;
        }
    }
}
</script>

<style>

</style>
