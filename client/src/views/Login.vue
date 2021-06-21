<template>
    <div class="login">

        <h1 class="mb-32 h1">Login</h1>

        <!-- Login-->
        <div class="mb-16">
            <input v-model="loginData.email" placeholder="email" class="mb-8 block w-256">
            <input v-model="loginData.password" placeholder="password" type="password"
                 class="mb-8 block w-256" @keyup.enter="login">
            <c-button @click="login">Login</c-button>
        </div>

        <p class="mb-16 fs-14">or</p>

        <!-- Button -->
        <c-button @click="$router.push({ path: '/register' })" class="block mb-16">Register</c-button>
  </div>
</template>

<script>
import * as httpService from '../httpService.js';
import CButton from '../components/CButton';

export default {
    name: 'login',
    components: {CButton},
    data() {
        return {
            loginData: {
                email: '',
                password: '',
            },
        };
    },
    computed: {
        userToken() {
            return this.$store.state.userToken;
        },
    },
    watch: {
    },
    methods: {
        login() {
            httpService.login(this.loginData)
        },
    },
    created() {
    },
};
</script>

