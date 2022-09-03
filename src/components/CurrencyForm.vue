<template>
    <div>
        <form @submit.prevent>

            <h4>Форма расчёта количества валюты</h4>
            <!-- v-bind:value="post.title"  -->
            <!-- @input="post.title = $event.target.value" -->
            <!-- То ж самое, что и указание ниже -->
            <!-- v-model="post.title" -->
            <my-input v-focus v-model="post.title" type="text" placeholder="Название" />

            <!-- v-model работет на 2-х сторонее связывание с дочерним компонентом -->
            <!-- Можно указать после v-model, двоеточие и разные слова, к примеру v-model:value="post.body" 
            и пропсом в родителськом элементе создать переменную "value" за место "modelValue"-->
            <my-input v-model="post.body" type="text" placeholder="Описание" />

            <my-button class="btn_create" @click="createPost">
                Создать
            </my-button>

        </form>
    </div>
</template>


<script>

export default {
    name: ''

}
</script>


<style scoped>
</style>