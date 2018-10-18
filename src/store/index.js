import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

let user = localStorage.getItem('user')

if(user) {
    user = JSON.parse(user)
}

const store = new Vuex.Store({
    state:{
        user: user || {}
    },
    mutations:{
        updateUser: (state,param) =>{
            state.user = param
            localStorage.setItem('user',JSON.stringify(param))
        }
    },
    getters:{
        user:(state) => state.user
    }
})

export default store