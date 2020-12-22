import Vue from 'Vue/dist/vue.esm';
import axios from 'axios';

new Vue({
    data: {
        atsList: [],
    },
    mounted () {
        axios('./data/ats.json').then((result) => {
            this.atsList = result.data['ats-list'];
        });
    },
}).$mount('#app');
