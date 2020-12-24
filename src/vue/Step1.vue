<template>
    <div>
        <div class="main-header">
            <div class="main-header__center">
                1/2 Какая у вас АТС?
            </div>
        </div>
        <div class="step-container">
            <div class="step-container__content">
                <slot name="atsList" />
            </div>
            <div class="step-container__footer">
                <button
                    class="button-step1"
                    :disabled="isActiveButtonNext === false"
                    @click="toNextStep"
                >
                    Перейти к следующему шагу
                    <span class="button-step1__icon" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isActiveButtonNext: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        toNextStep (event) {
            this.$emit('to-next-step');
        },
    },
};
</script>
