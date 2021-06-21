<template>
    <div class="settings">

        <h1 class="mb-32 h1">Settings</h1>

        <!-- Button -->
        <c-button @click="logout" class="block mb-16">Logout</c-button>
  </div>
</template>

<script>
import CButton from '../components/CButton';

export default {
    name: 'settings',
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
        logout() {
            this.$store.commit('saveUserToken', '');
            this.$router.push({path: '/'});
        },
    },
    created() {
    },
};
</script>

