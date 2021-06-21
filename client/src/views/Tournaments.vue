<template>
    <div class="tournaments">

        <h1 class="mb-32 h1">Tournaments</h1>

        <!-- List: tournamentList -->
        <div>
            <div v-for="tournament in tournaments" :key="tournament._id" class="mb-8 p-8 bg-secondary-8 rounded-5">
                <h2 class="text fs-14 mb-8 h2">{{ tournament.name }}</h2>
                <p class="text fs-14 mb-8 p">{{ tournament.location }}</p>
                <p class="text fs-14 mb-8">{{ new Date(tournament.date).toDateString() }}</p>
                <div>
                    <p class="mb-4">Participants:</p>
                    <div v-for="participant in tournament.participants" :key="participant"
                        class="ml-16">
                        {{ participant.username || participant }}
                    </div>
                </div>
                <c-button v-if="!userInParticipants(tournament)" @click="addParticipant(tournament._id)" class="my-8">Join tournament</c-button>
                <c-button v-else disabled class="my-8">You are participating</c-button>
                <c-button @click="deleteTournamentList(tournament)" class="block" bg="warning" fg="white" v-if="user && user._id === tournament.userId">Delete</c-button>
            </div>
        </div>

  </div>
</template>

<script>
import * as httpService from '../httpService.js';
import CButton from '../components/CButton';

export default {
    name: 'tournaments',
    components: {CButton},
    data() {
        return {
            tournaments: [],
        };
    },
    computed: {
        userToken() {
            return this.$store.state.userToken;
        },
        tournamentTrigger() {
            return this.$store.state.tournamentTrigger;
        },
        user() {
            return this.$store.state.user;
        },
    },
    watch: {
        tournamentTrigger() {
            this.getTournamentList();
        },
    },
    methods: {
        getTournamentList() {
            httpService.getTournaments((data) => {
                this.tournaments = data;
            });
        },
        putTournamentList(element) {
            httpService.putTournament(element)
        },
        deleteTournamentList(element) {
            httpService.deleteTournament(element._id)
        },
        addParticipant(id) {
            httpService.addParticipant(id, {
                participant: this.user._id,
            });
        },
        userInParticipants(tournament) {
            if (!this.user) return true;
            return tournament.participants.map(x => x._id).includes(this.user._id);
        },
    },
    created() {
        this.getTournamentList();
    },
};
</script>

