<template>
    <div class="container" v-if="empty">
        <hr>
        <b-form inline>
            <b-input class="col-11" placeholder="Filter galleries" @input="setFilterTermChange" />
            <b-button>Filter</b-button>
        </b-form>
        <hr>
        <div class="card" v-for="(gallery, key) in currentlyVisibleGalleries" :key="key">
            <img class="card-img-top" :src="gallery.images[0].imgURL" alt="Card image">
            <div class="card-body">
                <router-link :to="{ name: 'gallery-view', params:{id: gallery.id} }">
                    <h4 class="card-title">{{ gallery.name }}</h4>
                </router-link> 
                <router-link 
                    :to="{ name: 'authors-galleries', params:{id: gallery.user.id}}"
                    >{{ gallery.user.first_name }} {{ gallery.user.last_name }}
                </router-link>
                <p class="card-text">{{ gallery.description }}</p>
                <p class="card-text">{{ gallery.created_at | formatDate }}</p>
            </div>
        </div>
        <div v-if="currentlyVisibleGalleries != 0">
            <galleries-paginator :pages="pages" v-if="pages > 1" @selected-page="onSelectedPage" :selected-page="selectedPage" />
        </div>
    </div>
    <div v-else>
        <p>There are no Galleries</p>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex"
import GalleriesPaginator from '../components/GalleriesPaginator.vue'
import { DateMixin } from '../mixins'

export default {
    mixins: [ DateMixin ],

    components:{
        GalleriesPaginator
    },
    data() {
        return {
            empty: false,
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
        currentlyVisibleGalleries() {
            let bottomLimit = (this.selectedPage - 1) * 10
            let topLimit = bottomLimit + 10
                return this.filteredGalleries.filter((gallery, index) => {
                return index >= bottomLimit && index < topLimit;
            })
        },    
    },
    created() {
        this.fetchGalleries().then(()=>{
            this.empty = true
            })
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
