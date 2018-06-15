<template>
<div>
     <h1>asdasjfhasjfhiashfisa</h1>
    <div v-for="(gallery, key) in galleries" :key="key">
        <img class="card-img-top" :src="gallery.images[0].imgURL" alt="Card image">
        <p>{{gallery.name}}</p>
    </div>
   
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { userService } from '../services/UserService'

export default {
    
    data(){
        return {
            galleries:[],
        }
    },
    computed:{
        ...mapGetters({
            currentUser: "getAuthUserId"
        })
    },
    beforeRouteEnter( to, from, next ) {
            next((vm) => {
                console.log(vm.currentUser)
                userService.showAuthor(vm.currentUser).then((response) => {
                    vm.galleries = response.data
                    console.log(response.data)
            })
        })
    },
    created(){
    }
}
</script>

<style>

</style>
