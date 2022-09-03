<template>
    <div>
        <div class="changeCurrencyArea">
            <div class="changeCurrencyArea__wrap">
                <div class="changeCurrencyArea__title">
                    <h3>Введите сумму для обмена:</h3>
                </div>

                <div class="changeCurrencyArea__row">
                    <div class="changeCurrencyArea__column changeCurrencyArea__column_left">
                        <my-input class="result__roubles-summ" type="text" placeholder="Ввести здесь ..."
                            v-model="usersRoubles" />
                    </div>
                    <div class="changeCurrencyArea__column changeCurrencyArea__column_right">
                        <my-select v-model="selectedFrom" :options="arrNamesCurrency"
                            :baseCurrencyForSelect="baseCurrency" />
                    </div>
                </div>

                <div class="changeCurrencyArea__row ">
                    <div class="changeCurrencyArea__column changeCurrencyArea__column_left">
                        <h3>Обменять на:</h3>
                    </div>
                    <div class="changeCurrencyArea__column changeCurrencyArea__column_right">
                        <my-select v-model="selectedTo" :options="arrNamesCurrency"
                            :baseCurrencyForSelect="baseCurrency" />
                    </div>
                </div>

                <div class="changeCurrencyArea__row ">
                    <div class="changeCurrencyArea__column changeCurrencyArea__column_left">
                        <h3>Результат обмена:</h3>
                    </div>
                    <div class="changeCurrencyArea__column changeCurrencyArea__column_right">
                        <div class="changeCurrencyArea__result-area">
                            {{ result }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>


<script>

export default {
    name: 'pick-cash',
    data() {
        return {
            selectedFrom: '',
            selectedTo: '',
            usersRoubles: '',
            result: '',
        }
    },
    props: {
        cashList: {
            type: Array,
            required: true,
        },
        arrNamesCurrency: {
            type: Array,
            required: true,
        },
        baseCurrency: {
            type: String,
            default: "Рубль",
        }
    },
    methods: {
        createNewResult() {
            let selectObjFrom = this.cashList.find(item => {
                if (this.selectedFrom) return item.name === this.selectedFrom;
                else return item.name === this.baseCurrency;
            });
            let selectObjTo = this.cashList.find(item => {
                if (this.selectedTo) return item.name === this.selectedTo;
                else return item.name === this.baseCurrency;
            });
            this.result = (selectObjFrom.cost * Number(this.usersRoubles.replace(/ /g, '')) / selectObjTo.cost).toFixed(2).replace(/[^\d.,]/g, '').split('').reverse().join('').replace(/(.{3})/g, '$1 ').replace(/[,]/g, '.').split('').reverse().join('') + ' ' + selectObjTo.shortName;
        }
    },
    watch: {
        usersRoubles() { this.createNewResult() },
        selectedTo() { this.createNewResult() },
        selectedFrom() { this.createNewResult() },
    },
}
</script>


<style scoped lang="scss">
.changeCurrencyArea {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 700px;
    border: 2px solid $blue-light;
    padding: 50px;
    border-radius: 10px;
    position: relative;
    z-index: 1;

    *:last-child {
        margin: 0px 0px 0px 0px;
    }

    @media (max-width: $md3) {
        padding: 20px;
        max-width: 100%;
    }

    // .changeCurrencyArea__wrap
    &__wrap {
        width: 100%;
    }

    // changeCurrencyArea__title
    &__title {
        margin-bottom: 30px;

        @media (max-width: $md3) {
            margin-bottom: 10px;
        }
    }

    // .changeCurrencyArea__row
    &__row {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 35px;

        @media (max-width: $md3) {
            display: block;
        }
    }

    // .changeCurrencyArea__column
    &__column {

        // .changeCurrencyArea__column_left
        &_left {
            flex: 0 1 40%;
            margin-right: 50px;
            text-align: right;

            @media (max-width: $md3) {
                margin-right: 0px;
                text-align: left;
                margin-bottom: 10px;
            }
        }

        // .changeCurrencyArea__column_right
        &_right {
            flex: 0 1 60%;
        }
    }

    // .changeCurrencyArea__result-area
    &__result-area {
        background-color: $blue-light;
        width: 100%;
        min-height: 46px;
        border: 1px solid $accent;
        color: $white;
        line-height: 1;
        font-size: 2rem;
        padding: 12px 20px;
    }
}

.result {

    // .result__roubles-summ
    &__roubles-summ {}
}
</style>