
<template>
    <div>
        <div class="header__row">
            <div class="header__column header__column_left">
                <h1>Рассчёт обмена валюты</h1>
            </div>
            <div class="header__column header__column_right">
                <h2>Рубли в Доллары, Евро, Юани</h2>
            </div>
        </div>
    </div>
</template>


<script>

export default {

}
</script>


<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_variables.scss';

h1,
h2 {
    color: $white;
}

.header {
    height: 120px;

    // .header__row
    &__row {
        padding: 20px 30px;

        @media (min-width: $md2) {
            padding: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    // .header__column
    &__column {
        justify-self: flex-start;

        @media (max-width: $md2) {
            margin-bottom: 20px;
        }

        // .header__column_left
        &_left {}

        // .header__column_right
        &_right {}
    }

    &__column:last-child {
        @media (max-width: $md2) {
            margin: 0px 0px 0px 0px;
        }
    }
}
</style>