<template>
    <div class="register">

        <h1 class="mb-32 h1">Register</h1>

        <!-- Register-->
        <div class="mb-16">
            <input v-model="registerData.username" placeholder="username" class="mb-8 block w-256">
            <input v-model="registerData.email" placeholder="email" class="mb-8 block w-256">
            <input v-model="registerData.password" placeholder="password" type="password" class="mb-8 block w-256">
            <input v-model="registerData.passwordRepeat" placeholder="password again" type="password"
                 class="mb-8 block w-256" @keyup.enter="register">
            <c-button @click="register">Register</c-button>
        </div>

        <p class="mb-16 fs-14">or</p>

        <!-- Button -->
        <c-button @click="$router.push({ path: '/login' })" class="block mb-16">Login</c-button>
  </div>
</template>

<script>
import * as httpService from '../httpService.js';
import CButton from '../components/CButton';

export default {
    name: 'register',
    components: {CButton},
    data() {
        return {
            registerData: {
                username: '',
                email: '',
                password: '',
                passwordRepeat: '',
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
        register() {
            if (!this.registerData.email || !this.registerData.password) {
                this.$store.commit('showSnackbar', 'Fill out all fields');
                return;
            }
            if (this.registerData.password !== this.registerData.passwordRepeat) {
                this.$store.commit('showSnackbar', 'Passwords don\'t match');
                return;
            }
            httpService.register(this.registerData)
        },
    },
    created() {
    },
};
</script>

