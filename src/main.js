import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import VueAxios from "vue-axios";
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
axios.defaults.baseURL = "http://localhost:8000/api";
app.use(VueApexCharts);
app.mount('#app')
