<template>
    <div
        id="app"
        class="app"
    >
        <section class="container">
            <Step1
                v-if="step === 1"
                :ats-list="atsList"
                :active-ats-group.sync="activeAtsGroup"
                :active-ats-name.sync="activeAtsName"
                @to-next-step="from1StepToNext"
            />
            <Step2
                v-else
                :ats-list="atsList"
                @to-prev-step="from2StepToPrev"
            />
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';


export default {
    components: {
        Step1,
        Step2,
    },
    data () {
        return {
            atsList: [],
            activeAtsGroup: '',
            activeAtsName: '',
            step: 1,
        };
    },
    computed: { },
    watch: {
        activeAtsGroup () {
            this.saveToStorage();
        },
        activeAtsName () {
            this.saveToStorage();
        },
    },
    mounted () {
        axios('./data/ats.json').then((result) => {
            this.atsList = result.data['ats-list'];
        });
        this.activeAtsGroup = localStorage.getItem('activeAtsGroup') || '';
        this.activeAtsName = localStorage.getItem('activeAtsName') || '';
    },
    methods: {
        from1StepToNext () {
            this.saveToStorage();
            this.step = 2;
            this.sendStep1Data();
        },
        from2StepToPrev () {
            this.step = 1;
        },
        saveToStorage () {
            localStorage.setItem('activeAtsGroup', this.activeAtsGroup);
            localStorage.setItem('activeAtsName', this.activeAtsName);
        },
        sendStep1Data () {
            // sendStep1Data
        },
    },
};
</script>
