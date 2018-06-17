<template>
    <div class="container mt-4">
        <form class="form-signup" @submit.prevent="register">
            <h2 class="form-signup-heading">Register</h2>
            <input v-model="first_name" type="text" class="form-control" name="first-name" placeholder="First Name"  />
            <input v-model="last_name" type="text" class="form-control" name="last-name" placeholder="Last Name"  />
            <input v-model="email" type="text" class="form-control" name="email" placeholder="Email Address" />
            <input v-model="password" type="password" class="form-control" name="password" placeholder="Password" />
            <input v-model="password_confirmation" type="password" class="form-control" name="password_confirmation" placeholder="Confirm Password" />
            <label for="checkbox" class="control-label col-xs-4">Accepted terms and conditions</label> 
        <div class="col-xs-8">
            <label class="checkbox-inline">
            <input type="checkbox" name="checkbox" checked="checked" value="accept" required>Accept</label>
        </div>

        <div v-for="(error, key) in errors" :key="key" v-if="error" class="alert alert-danger">
            <ul v-for="(oneError, key) in error" :key="key">
                <li>{{ oneError }}</li>
            </ul>
        </div>

            <button class="btn btn-lg btn-danger btn-block" type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import { userService } from '../services/UserService'
import { mapMutations } from 'vuex'

export default {
    data(){
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: ''
        }
    },
    methods: {
        ...mapMutations ([
            'setIsAuth', 
            'setAuthUserId'
            ]),
        register() {
            userService.register(
                this.first_name,
                this.last_name,
                this.email,
                this.password,
                this.password_confirmation
            ).then((response) => {
                userService.login(this.email, this.password)
                    this.$router.push('/')
                    this.setIsAuth(true)
                    this.setAuthUserId(response.data.user.id)   
            }).catch(error => {
                this.errors = error.response.data;
            })
        }
    }

}
</script>

<style>

</style>
