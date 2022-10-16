<template>

    <input
        type="text"
        class="input"
        :value="modelValue"
        @input="updateInput"
    >

</template>


<script>
export default {
    name: 'my-input',

    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            let updatedValue = event.target.value.replace(/[^\d.,]/g, '').split('').reverse().join('').replace(/(.{3})/g, '$1 ').replace(/[,]/g, '.').split('').reverse().join('').trim()
            this.$emit('update:modelValue', updatedValue)
        },
    },
}
</script>

<style scoped lang="scss">
.input {
    width: 100%;
    border: 1px solid $accent;
    padding: 9.5px 15px;
    font-size: 2rem;
    color: $accent;
    outline: none;
    border: 1px solid $fiolet-light;
}
</style>
