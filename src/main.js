import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase/app';
import 'firebase/firestore'
import VueFirestore from 'vue-firestore'
Vue.use(VueFirestore)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBuQT8ekEE5Jjt7rop4BosOeFMpwa5fIFA",
    authDomain: "noteweb-31f37.firebaseapp.com",
    databaseURL: "https://noteweb-31f37.firebaseio.com",
    projectId: "noteweb-31f37",
    storageBucket: "noteweb-31f37.appspot.com",
    messagingSenderId: "817261964578",
    appId: "1:817261964578:web:fb9bd165ed3d80757e897b"
});

export const db = firebaseApp.firestore()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
