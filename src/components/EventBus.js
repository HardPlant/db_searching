import Vue from 'vue';
export const EventBus = new Vue({
    data: () => ({
        guest: false,
        member: false,
        admin: false
    })
});