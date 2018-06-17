<template>
<div class="container">
    <div>
        <h1 class="text-center">{{ gallery.name }}</h1>
        <h4 class="text-center"><i>by:</i> {{ gallery.user.first_name }} {{ gallery.user.last_name }}</h4>
        <p class="text-lg-center"> {{ gallery.created_at| formatDate }}</p>
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
                    <img class="img-fluid img-thumbnail" :src="image.imgURL" alt="" @click="newTab(image.imgURL)">
                </a>
            </div>
        </div>
    </div>
    <div>
        <button class="btn btn-danger" v-if="currentUserGallery" @click="deleteThisGallery(gallery.id)">Delete this gallery</button>
    </div>
    <hr>
    <div class="container">
        <label for="text" class="col-4 col-form-label">Comments:</label> 
        <section class="comments">
            <article class="comment">
                <div class="comment-body" v-for="(comment, key) in comments" :key="key">
                    <div class="text">
                        <p>{{ comment.text }}</p>
                    </div>
                     <p class="attribution">by{{ comment.user_id }} at {{ comment.created_at | diffForHumans }}</p>
                     <button @click="removeComment(gallery.id, comment.id)">Delete comment</button>
                </div>  
            </article>
        </section>
    </div>
    <div>
        <form @submit.prevent="addComment()" v-if="isAuth">
            <div v-for="(error, key) in errors" :key="key" v-if="error" class="alert alert-danger">
                <p>{{error}}</p>
            </div>
            <div class="form-group ">
                <div class="col-8">
                <textarea v-model="newComment.text" id="text" name="text" cols="40" rows="5" class="form-control" placeholder="Leave your comment" ></textarea>
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
import { galleryService } from '../services/GalleryService'
import { mapGetters } from 'vuex'
import { DateMixin } from '../mixins'

export default {
    mixins: [ DateMixin ],

    data() {
        return {
            gallery: [],
            comments: [],
            errors: '',
            newComment: {
                text: ''
            },
            currentUserGallery: false,
            currentUserComment: false
        }
    },
    beforeRouteEnter( to, from, next ) {
        next(vm => {
            galleryService.show(vm.$route.params.id)
            .then(response => {
                vm.gallery = response.data
                vm.comments = response.data.comments
            })
        })
    },
    computed:{
        ...mapGetters({
        currentUser: "getAuthUserId",
        isAuth: 'getIsAuth'
        })
    },
    methods: {
        newTab(link){
            window.open(link, '_blank')
        },
        addComment(newComment, gallery_id, user_id) {
            galleryService.addComment(this.newComment, this.$route.params.id, this.currentUser)
            .then((response) =>{
                galleryService.show(this.$route.params.id)
                    .then((success) => {
                        this.comments = success.data.comments
                    })
                }).catch(error => {
                    this.errors = error.response.data
                })
            this.newComment = {}
        },
        removeComment(gallery_id, comment_id){
            galleryService.deleteComment(gallery_id, comment_id)
            .then((response)=>{
                 galleryService.show(this.$route.params.id)
                    .then((success) => {
                        this.comments = success.data.comments
                    })
            })
        },
        deleteThisGallery(id) {
            galleryService.deleteGallery(id).then(() => {
            this.$router.push('/');
            })
        }
    },
    updated: function() {
        this.$nextTick(function() {
            if(this.currentUser == this.gallery.user_id){
                this.currentUserGallery = true
            }
            if(this.currentUser == this.comments.user_id){
                this.currentUserComment = true
            }
        })
    }
}


</script>

<style>


p {
    margin: 0 0 1em;
}

.comment {
    overflow: hiddena;
    padding: 0 0 1em;
    border-bottom: 1px solid #ddd;
    margin: 0 0 1em;
    *zoom: 1;
}

.comment-body {
    overflow: hidden;
}

.comment .text {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    background: #fff;
}

.comment .text p:last-child {
    margin: 0;
}

.comment .attribution {
    margin: 0.5em 0 0;
    font-size: 14px;
    color: #666;
}
</style>
