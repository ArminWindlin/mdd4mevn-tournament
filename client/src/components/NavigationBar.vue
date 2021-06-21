<template>
    <div class="navigation-bar fixed top-0 left-0 bg-black w-full">
        <div class="inner-container flex ai-c">
            <div v-for="page in filteredPages" :key="page.name" @click="changeRoute(page.path)"
                class="min-w-64 h-32 lh-32 pr-16 fg-white clickable">
                {{ page.name }}
            </div>
        </div>
        <img src="../assets/logo.svg" alt="MDD4MEVN" class="fixed top-4 right-16 w-24" title="MDD4MEVN">
    </div>
</template>

<script>
export default {
    name: 'navigation-bar',
    data() {
        return {
            pages: [
                {
                    name: 'Home',
                    path: '/home',
                    condition: 'none',
                },
                {
                    name: 'Register',
                    path: '/register',
                    condition: 'isLoggedOut',
                },
                {
                    name: 'Login',
                    path: '/login',
                    condition: 'isLoggedOut',
                },
                {
                    name: 'Tournaments',
                    path: '/tournaments',
                    condition: 'isLoggedIn',
                },
                {
                    name: 'Host',
                    path: '/host',
                    condition: 'isLoggedIn',
                },
            ],
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.userToken;
        },
        filteredPages() {
            return this.pages.filter(p => p.condition === 'none' ||
                (p.condition === 'isLoggedIn' && this.isLoggedIn) ||
                (p.condition === 'isLoggedOut' && !this.isLoggedIn));
        },
    },
    methods: {
        changeRoute(path) {
            this.$router.push({path: path})
        }
    },
};
</script>

<style scoped lang="scss">
.inner-container {
    width: 96vw;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4vw;
    box-sizing: border-box;
}
</style>
