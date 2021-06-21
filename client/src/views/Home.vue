<template>
    <div class="home">

        <h1 class="mb-32 h1">Welcome to Sports Tournament App</h1>

        <p class="mb-16 fs-14">Here you can join and host sports tournaments.</p>

        <p class="mb-16 fs-14" v-if="!userToken">Get started:</p>

        <!-- Button -->
        <c-button @click="$router.push({ path: '/login' })" class="block mb-16" v-if="!userToken">Login</c-button>
        <!-- Button -->
        <c-button @click="$router.push({ path: '/register' })" class="block mb-16" v-if="!userToken">Register</c-button>
        <p class="mb-16 fs-14" v-if="userToken">Checkout the tournaments or host one yourself:</p>

        <!-- Button -->
        <c-button @click="$router.push({ path: '/tournaments' })" class="block mb-16" v-if="userToken">Join a Tournament</c-button>
        <!-- Button -->
        <c-button @click="$router.push({ path: '/host' })" class="block mb-16" v-if="userToken">Host a Tournament</c-button>
        <!-- Button -->
        <c-button @click="$router.push({ path: '/settings' })" class="block mb-16" v-if="userToken">Settings</c-button>
  </div>
</template>

<script>
import CButton from '../components/CButton';

export default {
    name: 'home',
    components: {CButton},
    data() {
        return {
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
    },
    created() {
    },
};
</script>

