<template>
    <div>
        <div class="main-header main-header-with-left">
            <a
                href="javascript:;"
                class="main-header__left"
                @click="toPrevStep"
            >
                <span class="main-header__left__icon icon-arrow-left" />
                Подходящие решения
            </a>
            <div class="main-header__center">
                2/2 Вы получите следующие функции
            </div>
        </div>
        <div class="step-container" />
    </div>
</template>

<script>
export default {
    props: {
        atsList: {
            type: Array,
            default: () => ([]),
        },
    },
    methods: {
        isThisItemActive (atsGroupName, atsName) {
            return atsGroupName === this.activeAtsGroup && atsName === this.activeAtsName;
        },
        selectAts (atsGroupName, atsName) {
            this.$emit('update:activeAtsGroup', atsGroupName);
            this.$emit('update:activeAtsName', atsName);
        },
        clearSelection () {
            this.$emit('update:activeAtsGroup', '');
            this.$emit('update:activeAtsName', '');
        },
        toPrevStep (event) {
            this.$emit('to-prev-step');
        },
    },
};
</script>
