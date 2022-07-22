<template>
    <input type="text" class="input" :value="modelValue" @input="updateInput"
        oninput="this.value = this.value.replace(/[^\d.,]/g, '').split('').reverse().join('').replace(/(.{3})/g, '$1 ').replace(/[,]/g, '.').split('').reverse().join('')">
</template>


<script>
export default {
    name: 'my-input',

    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.input {
    width: 100%;
    border: 1px solid $accent;
    padding: 9.5px 15px;
    font-size: 1.8rem;
    color: $accent;
    outline: none;
    border: 1px solid $fiolet-light;

}
</style>
