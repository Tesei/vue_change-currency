<template>
    <select class="select__item" v-model="modelValue" @change="changeOption">
        <option class="select__option-default" value="">{{ baseCurrencyForSelect }}</option>
        <option class="select__option" v-for="(option, index) in options" :key="index" :value="option" value="">
            {{ option }}
        </option>
    </select>

</template>


<script>
export default {
    name: 'my-select',
    props: {
        modelValue: {
            type: String,
        },
        options: {
            type: Array,
            default: () => []
        },
        baseCurrencyForSelect: {
            type: String,
            default: "Доллар США"
        }
    },
    methods: {
        changeOption(event) {
            this.$emit("update:modelValue", event.target.value)
        },
    },
}
</script>

<style scoped lang="scss">
.select {

    &__item {
        width: 100%;
        position: relative;
        cursor: pointer;
        padding: 12px 25px 12px 15px;
        color: $accent;
        font-style: normal;
        font-weight: 400;
        font-size: 1.8rem;
        border: 1px solid $fiolet-light;
        outline: none;

        &:focus {
            outline: none;
            box-shadow: 0px 2px 5px $fiolet-light;
        }
    }

    &__option-default,
    &__option {
        color: lighten($accent, 20%);
        display: block;
        left: 0;
        border: 1px solid #d9d9d9;
        border-top: 0;
        background-color: lighten($fiolet-light, 46%);
        font-size: 1.6rem;
        line-height: 1.3;
        cursor: pointer;
        outline: none;

        @media (min-width: 992px) {
            &:hover {
                background-color: lighten($fiolet-light, 10%);
            }
        }

        @media (max-width: $md4) {
            font-size: 1.4rem;
        }
    }
}

option:checked {
    display: none;
}
</style>