<template>
    <div>
        <v-list-tile @click="showRegister=true">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>회원 가입(비회원 모드)</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="showLogin=true">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>로그인(회원 모드)</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/admin'}">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>관리자 모드</v-list-tile-title>
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
        <v-btn
        :disabled="!valid"
        @click="submit"
        >
        가입하기
        </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="showRegister=false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
    </div>
</template>

<script>
export default {
    data (){
        return {
            showRegister:false,
            showLogin:false,
            name:"",
            email:"",
            country:""
        }
    }
}
</script>

<style>

</style>
