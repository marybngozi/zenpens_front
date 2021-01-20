import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios'
import Vuelidate from  'vuelidate';
import VueToastr from "vue-toastr";
import moment from 'moment';
import VModal from 'vue-js-modal'
import ErrorHandler from './utlis/errorHandler'
import Axiosinterceptors from './utlis/interceptors'
import "@/assets/css/tailwind.css";

Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;
Vue.prototype.$domainUrl = window.location.origin;

Vue.prototype.$apiV1 = 'https://zenpens.herokuapp.com/v1';
// Vue.prototype.$apiV1 = 'http://localhost:8008/v1';

Vue.use(Vuelidate);
Vue.use(VueToastr, {
  onCreated: ()=>{
    this.$toastr.removeByType('error');
    this.$toastr.removeByType('success');
  },
});
Vue.use(VModal);
Vue.use(ErrorHandler);
Vue.config.productionTip = false

// adds token to every axios http request
Axiosinterceptors();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
