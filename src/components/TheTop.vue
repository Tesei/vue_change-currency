<template>
    <div>
        <div class="header__row">
            <div class="header__column header__column_left">
                <h1>Калькулятор обмена валюты</h1>
            </div>
            <div class="header__column header__column_right">
                <h2>Расчёт по актуальному курсу ЦБ России</h2>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    name: 'top-about'
}
</script>


<style scoped lang="scss">
h1,
h2 {
    color: $white;
}

h1 {
    font-size: 2.8rem;

    @media (max-width: $md4) {
        font-size: 2rem;
    }
}

h2 {
    font-size: 2.2rem;

    @media (max-width: $md4) {
        font-size: 1.8rem;
    }
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