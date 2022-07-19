<template>
    <div>
        <div class="cash__column">
            <div class="cash__title title-text">
                <h2 class="cash__pick-currecny">Выберите валюту:</h2>
            </div>

            <my-button class="cash__btn" @click="$emit('eventPickCash', cash)" v-for="cash in cashList" :key="cash.id"
                :picked="cash.picked">{{ cash.name }}
            </my-button>
        </div>
    </div>
</template>


<script>

export default {
    props: {
        cashList: {
            type: Array,
            required: true
        },
    }

}
</script>


<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_variables.scss';

.cash__column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid $accent;
    margin: 0 auto;
    width: 400px;
    padding: 40px 45px;
    height: 370px;

    *:last-child {
        margin: 0px 0px 0px 0px;
    }

    @media (max-width: $md2) {
        width: 350px;
        padding: 30px 35px;
        height: 350px;
    }
}

.cash__title {}

.cash__btn {
    margin-bottom: 25px;

    @media (max-width: $md2) {
        margin-bottom: 20px;
    }
}
</style>