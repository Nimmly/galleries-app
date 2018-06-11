<template>
    <div class="container mt-4">
    <form class="form-signup" >
        <h2 class="form-signup-heading">Register</h2>
        <input v-model="first_name" type="text" class="form-control" name="first-name" placeholder="First Name" required />
        <input v-model="last_name" type="text" class="form-control" name="last-name" placeholder="Last Name" required />
        <input v-model="email" type="text" class="form-control" name="email" placeholder="Email Address" />
        <input v-model="password" type="password" class="form-control" name="password" placeholder="Password" />
        <input v-model="password" type="password" class="form-control" name="password" placeholder="Confirm Password" />
        <label for="checkbox" class="control-label col-xs-4">Accepted terms and conditions</label> 
    <div class="col-xs-8">
        <label class="checkbox-inline">
        <input type="checkbox" name="checkbox" checked="checked" value="rabbit">Accept</label>
    </div>
        <button class="btn btn-lg btn-danger btn-block" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

}
</script>

<style>

</style>
