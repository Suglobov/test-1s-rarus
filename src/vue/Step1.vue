<template>
    <div>
        <div class="main-header">
            <div class="main-header__center">
                1/2 Какая у вас АТС?
            </div>
        </div>
        <div class="step-container">
            <div class="step-container-content">
                <div class="ats-list">
                    <a
                        href="javascript:;"
                        class="ats-list__clear"
                        @click="clearSelection"
                    >
                        У меня нет АТС
                    </a>
                    <div
                        v-for="(atsGroup, atsGroupIndex) in atsList"
                        :key="atsGroupIndex"
                    >
                        <div class="ats-list__header">
                            {{ atsGroup.name }}
                        </div>
                        <a
                            v-for="(atsName, atsNameIndex) in atsGroup.list"
                            :key="`${atsGroupIndex}-${atsNameIndex}`"
                            href="javascript:;"
                            class="ats-list__item"
                            :class="{
                                'ats-list__item_active': isThisItemActive(atsGroup.name, atsName)
                            }"
                            @click="selectAts(atsGroup.name, atsName)"
                        >
                            {{ atsName }}
                        </a>
                    </div>
                </div>
            </div>
            <div class="step-container-footer">
                <button
                    class="next-step-button"
                    :disabled="isSelectionClear"
                    @click="toNextStep"
                >
                    Перейти к следующему шагу
                    <span class="next-step-button__icon icon-arrow-right" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        atsList: {
            type: Array,
            default: () => ([]),
        },
        activeAtsGroup: {
            type: String,
            default: '',
        },
        activeAtsName: {
            type: String,
            default: '',
        },
    },
    computed: {
        isSelectionClear () {
            return this.activeAtsGroup === '' && this.activeAtsName === '';
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
        toNextStep (event) {
            this.$emit('to-next-step');
        },
    },
};
</script>
