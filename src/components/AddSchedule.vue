<template>
    <v-stepper>
        <v-stepper-content step="1">
            <!-- 스케쥴 이름을 정한다 (Default가능) -->
        </v-stepper-content>
        <v-stepper-content step="2">
            <!-- 시작 날짜, 끝 날짜를 정하고 추가 버튼을 누른다 -->
            <v-layout>
                <v-flex xs6></v-flex>
                    <v-date-picker></v-date-picker>
                    <v-date-picker></v-date-picker>
                <v-flex xs6 offset-x5>
                    <v-btn></v-btn>
                </v-flex>
            </v-layout>
        </v-stepper-content>
    </v-stepper>
</template>

<script>
export default {

}
</script>

<style>

</style>
