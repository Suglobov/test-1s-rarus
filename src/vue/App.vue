<template>
    <div
        id="app"
        class="app"
    >
        <section class="container">
            <Step1
                v-if="step === 1"
                :is-active-button-next="isSelectionClear === false"
                @to-next-step="from1StepToNext"
            >
                <template #atsList>
                    <AtsList
                        :ats-list="atsList"
                        :active-ats-group.sync="activeAtsGroup"
                        :active-ats-name.sync="activeAtsName"
                    />
                </template>
            </Step1>
            <Step2
                v-else
                :active-ats-name="activeAtsName"
                :settings="step2Object"
                @to-prev-step="from2StepToPrev"
            >
                <template #atsList>
                    <AtsList
                        class="test"
                        :ats-list="atsList"
                        :active-ats-group.sync="activeAtsGroup"
                        :active-ats-name.sync="activeAtsName"
                    />
                </template>
            </Step2>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import AtsList from './AtsList.vue';


export default {
    components: {
        Step1,
        Step2,
        AtsList,
    },
    data () {
        return {
            atsList: [],
            activeAtsGroup: '',
            activeAtsName: '',
            step: 1,
            step2Object: {
                '1C program': '',
                'suitable program': '',
                'links to instructions': [],
                'supported features': [],
                'unsupported features': [],
            },
        };
    },
    computed: {
        isSelectionClear () {
            return this.activeAtsGroup === '' && this.activeAtsName === '';
        },
    },
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
            this.sendStep1Data();
            this.getDataToStep2();
            this.step = 2;
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
        getDataToStep2 () {
            axios('./data/demo-data.json').then((result) => {
                this.step2Object = result.data;
            });
        },
    },
};
</script>
