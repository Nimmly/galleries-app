<template>
<div>
     <div class="card" v-for="(gallery, key) in galleries" :key="key">
            <img class="card-img-top" :src="gallery.images[0].imgURL" alt="Card image">
            <div class="card-body">
                <router-link :to="{ name: 'gallery-view', params:{id: gallery.id} }">
                    <h4 class="card-title">{{ gallery.name }}{{ gallery.user_id.first_name }} {{ gallery.user_id.last_name }}</h4>
                </router-link> 
                <p class="card-text">{{ gallery.description }}</p>
            </div>
    </div>
   
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { galleryService } from '../services/GalleryService'

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
                galleryService.showUserGalleries(vm.currentUser).then((response) => {
                    vm.galleries = response.data
            })
        })
    },
    created(){
    }
}
</script>

<style>

</style>
