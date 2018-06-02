<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
        v-model="requester"
        disabled></v-text-field>
        <v-text-field
        v-model="lang"
        :rules="[v=>!!v || '위도값은 필수입니다']"
        label="위도"
        required></v-text-field>
        <v-text-field
        v-model="long"
        :rules="[v=>!!v || '경도값은 필수입니다']"
        label="경도"
        required></v-text-field>
        <v-text-field
        v-model="major"
        label="부상"
        ></v-text-field>
        <v-divider></v-divider>
        <v-btn
        :disabled="!valid"
        @click="submit"
        >
        submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
</template>

<script>
import axios from "axios"
import CONF from './Config.js'
export default {
    data: ()=>({
        valid: true,
        requester :'1',
        lang : 0,
        long : 0,
        major : ''
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post(CONF.request, {
            requester: this.requester,
            x: this.lang,
            y: this.long,
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
}
</script>

<style>

</style>
