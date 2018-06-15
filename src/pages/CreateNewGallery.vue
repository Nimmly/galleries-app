<template>
    <div class="jumbotron">
        <div class="form-group">
            <label for="name" class="col-4 col-form-label">Name:</label>
            <input class="form-control" v-model="gallery.name" placeholder="Name for gallery">
        </div>
        <div class="form-group">
            <label for="description" class="col-4 col-form-label">Description:</label>
            <input class="form-control" v-model="gallery.description" placeholder="Description for the gallery">
        </div>
        <div class="form-group">
            <section class="Form_section">
                <div class="containe" v-for="(row, key) in rows" :key="key">
                    <div class="form-inline">
                        <label for="imgURL">URL: </label>
                        <input v-model="rows.url" type="text" :name="key" class="form-control col-10" placeholder="URL" > 
                        <button class="btn btn-danger form-group-item"  @click="deleteRow(row, key)" :disabled="rows.length < 2">Delete url</button>
                    </div>
                </div>
                <br>
                <button class="btn btn-success" @click="addRow">Add next image</button>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rows: [{ url:''}],
            gallery:[{
                name:'',
                description: '',
                imgURL: ''
            }]
        }
    },
    methods: {
        addRow(elem) {
            elem.preventDefault()
            this.rows.push({ url: '' })
        },
        deleteRow(key) {
            this.rows.splice(key, 1)
        }
    }

}
</script>

<style>

</style>

