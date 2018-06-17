<template>
    <div class="jumbotron">
        <form @submit.prevent="storeGallery">
        <div class="form-group">
            <label for="name" class="col-4 col-form-label">Name:</label>
            <input class="form-control" v-model="name" placeholder="Name for gallery">
        </div>
        <div class="form-group">
            <label for="description" class="col-4 col-form-label">Description:</label>
            <input class="form-control" v-model="description" placeholder="Description for the gallery">
        </div>
        <div class="form-group">
            <section class="Form_section">
                <div class="containe" v-for="(row, key) in imgURL" :key="key">
                    <div class="form-inline">
                        <label for="imgURL">URL: </label>
                        <input v-model="row.url" type="text" :name="key" class="form-control col-8" placeholder="URL" > 
                        <button name="submit" type="button" class="btn btn-primary" :class="{disabled: key === 0}" @click="moveUp(key)">^</button>
                        <button name="submit" type="button" class="btn btn-primary" :class="{disabled: key === imgURL.length - 1}" @click="moveDown(key)">v</button>
                        <button class="btn btn-danger form-group-item"  @click="deleteRow(row, key)" :disabled="imgURL.length < 2">Delete url</button>
                    </div>
                </div>
                <br>
                <button class="btn btn-success" @click="addRow">Add next image</button>
            </section>
        </div>
        <button class="btn btn-primary btn-block" type="submit">Save gallery</button>
        </form>
    </div>
</template>

<script>
import { galleryService } from '../services/GalleryService'
export default {
    data() {
        return {
            // rows: [{ url: ''}],
            // gallery:{
            //     name:'',
            //     description: '',
            // },
            name: '',
            description: '',
            imgURL: []
        }
    },
    methods: {
        addRow(elem) {
            elem.preventDefault()
            this.imgURL.push({ url: '' })
        },
        deleteRow(key) {
            this.imgURL.splice(key, 1)
        },
        // getGallery(){
        //     let gallery = {}
        //     gallery.name = this.gallery.name
        //     gallery.description = this.gallery.description
        //     gallery.imgURL = this.rows.map((item) => {
        //         return { 
        //             imgURL: item
        //         }
            
        //     })
        //     return gallery
        // },
        // storeGallery() {
        //     galleryService.addGallery(this.getGallery())
        //     //console.log(this.getGallery())
        // },
        storeGallery(){
            galleryService.addGallery(this.name, this.imgURL, this.description)

        },
        moveUp(key) {
            if (key > 0) {
                let newUrls = this.imgURL.slice(0)
                let temp = newUrls[key]
                newUrls[key] = newUrls[key - 1]
                newUrls[key - 1] = temp
                this.imgURL = newUrls
            }
        },
        moveDown(key) {
        if (key < this.imgURL.length - 1) {
            let newUrls = this.imgURL.slice(0)
            let temp = newUrls[key]
            newUrls[key] = newUrls[key + 1]
            newUrls[key + 1] = temp
            this.imgURL = newUrls
            }
        }
    }
}
</script>