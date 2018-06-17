<template>
    <div class="container mt-4">
    <form class="form-signin"  @submit.prevent="login">
        <h2 class="form-signin-heading">Login</h2>
        <input v-model="email" type="text" class="form-control" name="email" placeholder="Email Address" required />
        <input v-model="password" type="password" class="form-control" name="password" placeholder="Password" required />
        <div v-if="errors" class="alert alert-danger">
            {{errors}}
        </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { userService } from '../services/UserService'
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            errors: ''
        }
    },
    methods: {
        ...mapMutations ([
            'setIsAuth', 
            'setAuthUserId',
        ]),
        login() {
            userService.login(this.email, this.password).then((response) => {
                this.$router.push('/')
                this.setIsAuth(true)
                this.setAuthUserId(response.data.user.id)   
            }).catch(error => {
                this.errors = error.response.data.error 
            })
            
        }
    }
}
</script>

<style>

</style>
