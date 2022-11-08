import Vue from "vue";

import { BootstrapVue } from "bootstrap-vue";
import { IconsPlugin } from "bootstrap-vue";
//import plugins
//import { BVToastPlugin } from "bootstrap-vue";
// Then import Bootstrap an BootstrapVue SCSS files (order is important)
import "./bootstrap.scss";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
/*
Vue.use(BVToastPlugin);
const vm = new Vue();
console.log("log Vue :  ", vm, "\n $bvToast : ", vm.$bvToast);
*/
