<template>
    <div class="host">

        <h1 class="mb-32 h1">Host a Tournament</h1>

        <!-- Form: tournamentForm -->
        <div class="w-full p-8 mb-32 rounded-5 border-box bg-light-grey">
            <label class="fs-14 mb-4 inline-block" for="name">Name:</label>
            <input v-model="tournamentForm.name" placeholder="name" id="name" class="mb-8 block w-256" @keyup.enter="submitTournamentForm">
            <label class="fs-14 mb-4 inline-block" for="location">Location:</label>
            <input v-model="tournamentForm.location" placeholder="location" id="location" class="mb-8 block w-256" @keyup.enter="submitTournamentForm">
            <label class="fs-14 mb-4 inline-block" for="date">Date:</label>
            <input v-model="tournamentForm.date" placeholder="date" type="date" id="date" class="mb-8 block w-256">
            <c-button @click="submitTournamentForm">Submit Form</c-button>
        </div>

  </div>
</template>

<script>
import * as httpService from '../httpService.js';
import CButton from '../components/CButton';

export default {
    name: 'host',
    components: {CButton},
    data() {
        return {
            tournamentForm: {
                name: '',
                location: '',
                date: undefined,
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
        submitTournamentForm() {
            httpService.postTournament(this.tournamentForm);
            this.tournamentForm = {
                name: '',
                location: '',
                date: undefined,
            };
        },
    },
    created() {
    },
};
</script>

