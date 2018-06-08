<template>
    <div>
                <v-list-tile :to="{path:'/search'}">
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>검색 신청</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile color="red" @click="dialog=true">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>회원 탈퇴</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            회원탈퇴
          </v-card-title>
          <v-card-text>
            <h1>정말로 탈퇴하시겠습니까?<br> 되돌릴 수 없는 행동입니다.</h1>
            <h3>탈퇴하려면 아래에 회원탈퇴라고 입력하십시오.</h3>
            <v-form>
        <v-text-field
        v-model="name"
        :rules="[v=>!!v || '올바르지 않은 값입니다.']"
        label="회원탈퇴"
        required></v-text-field>
        
        <v-divider></v-divider>
        <v-btn
        :disabled="!valid"
        @click="submit"
        color="red"
        >
        탈퇴하기
        </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog=false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
export default {
    data (){
        return {
            dialog:false,
            valid:true
        }
    }
}
</script>

<style>

</style>
