<template>
    <div class="ats-list">
        <div
            class="ats-list__clear"
            @click="clearSelection"
        >
            У меня нет АТС
        </div>
        <div
            v-for="(ats, atsIndex) in atsList"
            :key="atsIndex"
        >
            <div class="ats-list__header">
                {{ ats.name }}
            </div>
            <div
                v-for="(atsItem, atsItemIndex) in ats.list"
                :key="`${atsIndex}-${atsItemIndex}`"
                class="ats-list__item"
                :class="{
                    'ats-list__item_active': isThisItemActive(atsIndex, atsItemIndex)
                }"
                @click="chooseAts(atsIndex, atsItemIndex)"
            >
                {{ atsItem }}
            </div>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
