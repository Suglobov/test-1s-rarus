<template>
    <div>
        <div class="main-header main-header_with-left">
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
        <div class="step-container step-container_step2">
            <div class="step2-top-block">
                <div class="step2-top-block__text-row">
                    <span class="step2-top-block__title">Модель АТС:</span>
                    <span class="step2-active-ats">
                        <a
                            href="javascript:;"
                            class="step2-active-ats__link"
                            @click="toggleAtsList"
                        >{{ activeAtsName }}
                            <span class="step2-active-ats__icon" />
                        </a>
                        <span
                            ref="step2-ats-list"
                            class="step2-ats-list"
                        >
                            <slot name="atsList" />
                        </span>
                    </span>
                </div>
                <div class="step2-top-block__text-row">
                    <span class="step2-top-block__title">Программа 1С:</span>
                    <span class="step2-top-block__value">{{ settings['1C program'] }}</span>
                </div>
                <div class="step2-top-block__text-row">
                    <span class="step2-top-block__title">Подходящие решения:</span>
                    <span class="step2-top-block__value">{{ settings['suitable program'] }}</span>
                </div>
            </div>
            <div>
                <button
                    class="button-step2"
                    disabled
                >
                    {{ settings['suitable program'] }}
                </button>
            </div>
            <div class="functionality-container">
                <div class="supported-features">
                    <div class="supported-features__title">
                        Поддерживаемые функции:
                    </div>
                    <div
                        v-for="(item, index) in settings['supported features']"
                        :key="index"
                        class="supported-features__item"
                    >
                        <span class="supported-features__icon" />
                        <span>{{ item }}</span>
                    </div>
                </div>
                <div class="unsupported-features">
                    <div class="unsupported-features__title">
                        Неподдерживаемые функции:
                    </div>
                    <div
                        v-for="(item, index) in settings['supported features']"
                        :key="index"
                        class="unsupported-features__item"
                    >
                        <span class="unsupported-features__icon" />
                        <span>{{ item }}</span>
                    </div>
                </div>
            </div>
            <div
                v-show="settings['links to instructions'].length > 0"
                class="instructions-links"
            >
                <div class="line" />
                <div class="instructions-links__title">
                    Ссылки на инструкции:
                </div>
                <div
                    v-for="(item, index) in settings['links to instructions']"
                    :key="index"
                >
                    <a
                        :href="item.href"
                        target="_blank"
                        class="instructions-links__link"
                    >
                        <span class="instructions-links__icon" />
                        {{ item.name }}</a>
                </div>
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
        activeAtsName: {
            type: String,
            default: '',
        },
        settings: {
            type: Object,
            default: () => ({
                '1C program': '',
                'suitable program': '',
                'links to instructions': [],
                'supported features': [],
                'unsupported features': [],
            }),
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
        toggleAtsList () {
            console.log('asdf');
            this.$refs['step2-ats-list'].classList.toggle('step2-ats-list_show');
        },
    },
};
</script>
