<template>
<div class="container">
    <div class="row text-center text-lg-left">
        <div class="col-lg-3 col-md-4 col-xs-6" v-for="(image, key) in gallery.images" :key="key" >
          <a href="#" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" :src="image.imgURL" alt="">
          </a>
        </div>
    </div>
    <div>
        <form @submit.prevent="addComment">
            <div class="form-group row">
                <label for="text" class="col-4 col-form-label">Leave your comment</label> 
                <div class="col-8">
                <textarea v-model="newComment.text" id="text" name="text" cols="40" rows="5" class="form-control"></textarea>
                </div>
            </div> 
            <div class="form-group row">
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

export default {
    data() {
        return {
            gallery: [],
            slide: 0,
            sliding: null,
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
    methods: {
        addComment(newComment, gallery_id) {
            userService.addComment(this.newComment, this.$route.params.id)
        }
    },
       
}


</script>

<style>

</style>
