;<template>
    <div>
        <navigation-bar></navigation-bar>
        <div class="view-container">
            <router-view/>
        </div>
        <snackbar v-if="snackbarText">{{ snackbarText }}</snackbar>
    </div>
</template>

<script>
import * as httpService from './httpService.js';
import NavigationBar from './components/NavigationBar';
import Snackbar from './components/Snackbar';

export default {
    name: 'App',
    components: {NavigationBar, Snackbar},
    data() {
        return {
        };
    },
    computed: {
        snackbarText() {
            return this.$store.state.snackbarText;
        },
    },
    methods: {
        checkAuth() {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                this.$store.commit('saveUserToken', userToken);
                httpService.getCurrentUser();
            }
        },
    },
    created() {
        httpService.getServerStatus((status) => {
            console.log(status)
        });
        this.checkAuth();
    },

}

</script>

<style scoped lang="scss">
.view-container {
    width: 96vw;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4vw;
    box-sizing: border-box;
}
</style>
