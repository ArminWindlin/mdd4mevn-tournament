const tournament = require('./controller/tournamentC');
const user = require('./controller/userC');

exports.routes = (app) => {

    app.route('/tournament')
    .get(tournament.getTournaments);

    app.route('/tournament')
    .post(tournament.postTournament);

    app.route('/tournament/:id')
    .get(tournament.getTournament);

    app.route('/tournament/:id')
    .delete(tournament.deleteTournament);

    app.route('/tournament/:id')
    .put(tournament.putTournament);

    app.route('/add-participant/:id')
    .put(tournament.addParticipant);

    app.route('/user')
    .get(user.getUsers);

    app.route('/user')
    .post(user.postUser);

    app.route('/user/:id')
    .get(user.getUser);

    app.route('/user/:id')
    .delete(user.deleteUser);

    app.route('/user/:id')
    .put(user.putUser);

    app.route('/login')
    .put(user.login);

    app.route('/register')
    .post(user.register);

    app.route('/current-user')
    .get(user.getCurrentUser);

    // Health check
    app.route('/')
    .get((req, res) => res.send('Success'));

};
