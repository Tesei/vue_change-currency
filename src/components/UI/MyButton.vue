<template>
    <button class="btn">
        <slot></slot>
    </button>

</template>


<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
    align-self: flex-end;
    padding: 10px 15px;
    background-color: white;
    color: teal;
    border: 1px solid teal;
    transition: all .3s ease;
}

.btn:hover {
    background-color: rgba(0, 128, 128, 0.525);
    color: white;
}
</style>