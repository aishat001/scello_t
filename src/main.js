import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import store from './store'
import router from "./router";


const app = createApp(App);

app.use(router).use(store);
app.mount("#app");