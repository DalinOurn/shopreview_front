import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import VueCookies from 'vue-cookies';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            userLoggedIn: false
        }
    },
    mutations: {
        setUserLoggedIn(state, status) {
            state.userLoggedIn = status
        }
    }
})

const app = createApp(App);
app.use(VueCookies)
app.use(store)
app.use(router)
app.mount('#app')