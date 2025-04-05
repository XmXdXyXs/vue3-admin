import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "normalize.css/normalize.css";
import "./style/index.scss";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import element from "./plugins/element";
// import ElementPlus from "element-plus"
// import "element-plus/dist/index.css"

import "uno.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(element);
// app.use(ElementPlus)
app.mount("#app");
