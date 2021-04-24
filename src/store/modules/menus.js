import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList:[],
        userList: [],
        hasRoute: false
    },
    mutations: {
        setUserList(state,userList){
            state.userList = userList
        },
        setMenuList(state,menus){
            this.state.menuList = menus
        }
    },
    actions: {
    },
    modules: {
    }
}
