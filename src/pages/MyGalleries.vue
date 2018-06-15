<template>
<div>
    <div v-for="(gallery, key) in galleries" :key="key">
        <img class="card-img-top" :src="gallery.images[0].imgURL" alt="Card image">
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { userService } from '../services/UserService'

export default {
    
    data(){
        return {
            galleries:[]
        }
    },
    computed:{
        ...mapGetters({
            currentUser: "getAuthUserId"
        })
    },
    beforeRouteEnter( to, from, next ) {
        
            next((vm) => {
                userService.showAuthor(this.currentUser).then((response) => {
                    vm.galleries = response.data
            })
        })
    },
}
</script>

<style>

</style>
