<template>
    <div>
        <v-list-tile :to="{path:'/'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>메인 화면</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="showRegister=true">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>회원 가입</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="showLogin=true">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>로그인</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          <v-dialog v-model="showRegister" max-width="500px">
              <v-card>
                <v-card-title>
                  회원가입
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
              가입하기
              </v-btn>
                  <v-btn @click="closeRegister()">닫기</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="showLogin" max-width="500px">
              <v-card>
                <v-card-title>
                  로그인
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
              
              <v-divider></v-divider>
              
                  </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                    color="primary"
              :disabled="!valid"
              @click="submitLogin()"
              >
              로그인
              </v-btn>
                  <v-btn @click="closeLogin()">닫기</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
    </div>
</template>

<script>
import {EventBus} from './components/EventBus.js'
import CONF from "./components/Config.js";

export default {
  data (){
      return {
        showRegister:false,
        showLogin:false,
        valid:true,
        name:"",
        email:"",
        country:""
      }
  },
  mounted(){    
  },
  methods:{
    submit(){
      this.$axios.post(`${CONF.data}`,{
          name: this.name,
          email: this.email,
          country: this.country
        }).then(response => {
        alert(`${this.name}님, 가입이 완료되었습니다.`)
        this.closeRegister();
      });
    },
    submitLogin(){
      this.$axios.post(`${CONF.login}`,{
          name: this.name,
          email: this.email,
        }).then(response => {
          console.log(response.data);
          if(response.data){
            alert(`${response.data['name']}님 환영합니다!`)
          }
        this.closeLogin();
      });
    },
    closeRegister(){
      this.name = "";
      this.email = "";
      this.country = "";
      this.showRegister=false;
    },
    closeLogin(){
      this.name = "";
      this.email = "";
      this.country = "";
      this.showLogin=false;
    },

  }
}
</script>

<style>

</style>
