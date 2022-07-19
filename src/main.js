import { createApp } from 'vue';
import App from './App.vue';

// import store from './store'
import components from '@/components/UI';

const app = createApp(App);

// app.component регистрация глобального компонента, чтобы не экспортировать его каждый раз в отдельных компонентах
components.forEach(component => {
    app.component(component.name, component);
});


app.mount('#app');