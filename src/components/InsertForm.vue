<template>
    <div>

        <div class="result__form">
            <div class="result__row">
                <h2 class="result__roubles-title title-text">Рубли для обмена:</h2>
                <my-input class="result__roubles-summ" type="text" placeholder="Введите количество рублей"
                    v-model="usersRoubles" />
            </div>

            <div class="result__row">
                <h2 class="result__result-title title-text">Можно обменять на: </h2>
                <div class="result__final-result">
                    <h2>{{ someResult }} {{ nameCurrency }}</h2>
                </div>
            </div>

        </div>

    </div>
</template>


<script>

export default {
    data() {
        return {
            usersRoubles: '',
            someResult: 0,
            placeholder: 'Введите количество рублей',
            dataError: "Поле является обязательным",
        }
    },

    props: {
        nameCurrency: String,
        costOfCurrency: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    watch: {
        usersRoubles(newPrice) {
            this.someResult = (Number(newPrice.replace(/ /g, '')) / this.costOfCurrency).toFixed(2).replace(/[^\d.,]/g, '').split('').reverse().join('').replace(/(.{3})/g, '$1 ').replace(/[,]/g, '.').split('').reverse().join('');
        },
        costOfCurrency() {
            this.someResult = (Number(this.usersRoubles.replace(/ /g, '')) / this.costOfCurrency).toFixed(2).replace(/[^\d.,]/g, '').split('').reverse().join('').replace(/(.{3})/g, '$1 ').replace(/[,]/g, '.').split('').reverse().join('');
        }
    }
}
</script>


<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_variables.scss';

.result__form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid $accent;
    margin: 0 auto;
    width: 400px;
    height: 370px;
    padding: 40px 45px;

    @media (max-width: $md2) {
        width: 350px;
        padding: 30px 35px;
        height: 350px;
    }
}

.result__roubles-summ {
    margin-bottom: 20px;

    @media (max-width: $md2) {
        margin-bottom: 15px;
    }
}

.result__result-title,
.result__roubles-title {}

.result__final-result {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    background-color: $blue-light;
    color: $accent;
    min-height: 52px;
    transition: all 0.3s ease 0s;
}
</style>