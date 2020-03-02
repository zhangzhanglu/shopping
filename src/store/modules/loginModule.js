export default {
    namespaced:true,
    state:{
        token:null
    },
    mutations:{
        setToken(state,value){
            state.token = value
        },
        clearToken(state){
            state.token = null
        }
    }
}