<template>
    <div class="container">
        <hr>
        <b-form inline>
            <b-input class="col-11" placeholder="Filter galleries" @input="setFilterTermChange" />
            <b-button>Filter</b-button>
        </b-form>
        <hr>
        <div class="card" v-for="(gallery, key) in currentlyVisibleMovies" :key="key">
            <img class="card-img-top" :src="gallery.images[0].imgURL" alt="Card image">
            <div class="card-body">
                <router-link :to="{ name: 'gallery-view', params:{id: gallery.id} }">
                    <h4 class="card-title">{{ gallery.name }}{{ gallery.user_id.first_name }} {{ gallery.user_id.last_name }}</h4>
                </router-link> 
                <p class="card-text">{{ gallery.description }}</p>
            </div>
        </div>
        <div v-if="currentlyVisibleMovies != 0">
            <galleries-paginator :pages="pages" v-if="pages > 1" @selected-page="onSelectedPage" :selected-page="selectedPage" />
        </div>
    </div> 
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex"
import GalleriesPaginator from '../components/GalleriesPaginator.vue'

export default {
    components:{
        GalleriesPaginator
    },
    data() {
        return {
            selectedPage: 1
        };
    },
    methods: {
        ...mapActions([
            "fetchGalleries"
            ]),
        ...mapMutations([
            'setFilterTerm'
        ]),
        setFilterTermChange(term) {
            this.setFilterTerm(term)
        },
        onSelectedPage(page) {
            this.selectedPage = page
        },
    },
    computed: {
        ...mapGetters({ 
            galleries: "getGalleries", 
            currentTerm: "getFilterTerm",
            currentUser: "getAuthUserId"
        }),
        filteredGalleries() {
            return this.galleries.filter(gallery => {
                return gallery.name.indexOf(this.currentTerm) > -1
            })
        },
        pages() {
            return Math.ceil(this.filteredGalleries.length / 10)
        },
        currentlyVisibleMovies() {
            let bottomLimit = (this.selectedPage - 1) * 10
            let topLimit = bottomLimit + 10
                return this.filteredGalleries.filter((movie, index) => {
                return index >= bottomLimit && index < topLimit;
            })
        },    
    },
    created() {
        this.fetchGalleries();
    }
}
</script>

<style>
.card{
    display: inline-block;
    width: 18rem;
    border: none;
    text-align: center;
}

</style>
