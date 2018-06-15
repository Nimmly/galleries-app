<template>
<div class="container">
    <div>
        <h1 class="text-center">{{ gallery.name }}</h1>
        <h4 class="text-center"><i>by:</i> {{ gallery.user.first_name }} {{ gallery.user.last_name }}</h4>
        <hr>
        <h3 class="text-center">Description:</h3>
        <div class="jumbotron">
            <p class="text-lg-left">{{ gallery.description }}</p>
        </div>

    </div>
    <div class="row text-center text-lg-left">
        <div class="col-lg-3 col-md-4 col-xs-6" v-for="(image, key) in gallery.images" :key="key" >
            <div class="thumbnail">
                <a href="#" class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" :src="image.imgURL" alt="">
                </a>
            </div>
        </div>
    </div>
    <div>
        <button class="btn btn-danger" @click="deleteThisGallery(gallery.id)">Delete this gallery</button>
    </div>
    <hr>
    <div>
        <form @submit.prevent="addComment">
            <div class="form-group ">
                <label for="text" class="col-4 col-form-label">Comments:</label> 
                <div class="col-8">
                <textarea v-model="newComment.text" id="text" name="text" cols="40" rows="5" class="form-control" placeholder="Leave your comment"></textarea>
                </div>
            </div> 
            <div class="form-group ">
                <div class="offset-4 col-8">
                    <button type="submit" class="btn btn-primary">Post Comment</button>
                </div>
            </div>
        </form>
        
    </div>
</div>
</template>

<script>
import { userService } from '../services/UserService'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            gallery: [],
            newComment: {
                text: ''
            }
        }
    },
    beforeRouteEnter( to, from, next ) {
        next(vm => {
            userService.show(vm.$route.params.id)
            .then(response => {
                vm.gallery = response.data
            })
        })
    },
    computed:{
        ...mapGetters({
        currentUser: ["getAuthUserId"]
        })
    },
    methods: {
        addComment(newComment, gallery_id, user_id) {
            userService.addComment(this.newComment, this.$route.params.id, this.currentUser)
        },
        deleteThisGallery(id) {
            userService.deleteGallery(id).then(() => {
            this.$router.push('/');
            })
        }
    },
    created(){
        console.log('test', this.currentUser)
    }
       
}


</script>

<style>

</style>
