<template>
    <div>
        <form @submit.prevent>

            <h4>Форма расчёта количества валюты</h4>
            <my-input v-focus v-model="post.title" type="text" placeholder="Название" />

            <my-input v-model="post.body" type="text" placeholder="Описание" />

            <my-button class="btn_create" @click="createPost">
                Создать
            </my-button>

        </form>
    </div>
</template>


<script>

export default {
    name: 'currency-from'

}
</script>


<style scoped>
</style>