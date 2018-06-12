<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">All Galleries</router-link>
        <div class="navbar-nav">
            <router-link class="nav-item nav-link" to="/login" v-if="!isAuthenticated">Login</router-link>
            <router-link class="nav-item nav-link" to="/register" v-if="!isAuthenticated">Register</router-link>
            <a href="#" class="nav-item nav-link" @click="logout" v-if="isAuthenticated">Logout</a>
        </div>
        <galleries-fillter class="ml-auto" @search-term-change="setSearchTerm" />
    </nav>
</template>

<script>
import { userService } from '../services/UserService'
import GalleriesFillter from './GalleriesFillter.vue'
import { mapMutations } from 'vuex'

export default {
    components: {
        GalleriesFillter
    },
    data(){
        return {
            isAuthenticated: userService.isAuthenticated()
        }
    },
    methods: {
        logout(){
            userService.logout()
            this.isAuthenticated = false
            this.$router.push('/login')
        },
        ...mapMutations([
            'setSearchTerm'
        ])
    }
}
</script>