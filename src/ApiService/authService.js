import HttpClient from './HttpClient'
import backendconstat from './backendConstant'

const {register, login, logout, checkUserName}=backendconstat

//export API call for users route

export default {

    
    registerUser(payload){       
        return HttpClient.postUrl(register, {data: payload, requireAuth: false})
    },
    
    loginUser(payload){
        return HttpClient.postUrl(login, {data: payload, requireAuth: false})
    },

    logoutUser(){
        return HttpClient.postUrl(logout)
    },


    checkUserName(username){
        return HttpClient.getUrl(checkUserName, {query: {username: username}, requireAuth: false})
    }
}