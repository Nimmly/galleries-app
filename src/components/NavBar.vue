<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">All Galleries</router-link>
        <div class="navbar-nav">
            <router-link class="nav-item nav-link" to="/login" v-if="!isAuth">Login</router-link>
            <router-link class="nav-item nav-link" to="/register" v-if="!isAuth">Register</router-link>
            <router-link class="nav-item nav-link" to="/create" v-if="isAuth">Create New Gallery</router-link>
            <router-link class="nav-item nav-link" to="/my-galleries" v-if="isAuth">My Galleries</router-link>
            <a href="#" class="nav-item nav-link" @click="logout" v-if="isAuth">Logout</a>     
        </div> 
    </nav>
</template>

<script>
import { userService } from '../services/UserService'
import { mapGetters, mapMutations } from 'vuex'

export default {

    methods: {
        logout(){
            userService.logout()
            this.setIsAuth(false)
            this.$router.push('/login')
        },
        ...mapMutations([
            "setIsAuth"
        ])
        
    },
    computed: {
        ...mapGetters({
            isAuth: "getIsAuth",
            currentUser: "getAuthUserId"
        })
    },
}
</script>