<template>
    <button class="btn" :class="{ active: picked }">
        <slot></slot>
    </button>

</template>


<script>

export default {
    name: 'my-button',
    props: {
        picked: {
            type: Boolean,
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 30px;
    background-color: $fiolet-light;
    transition: all 0.2s ease 0s;
    color: $white;
    font-size: 2rem;
    border: 1px solid $white;

    &:hover {
        background-color: $blue-light;
        border: 1px solid $accent;
    }
}

.active {
    background-color: $blue-light;
}
</style>