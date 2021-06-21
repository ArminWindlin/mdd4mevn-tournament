const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { User } = require('./model/User');
const { routes } = require('./routes');
const app = express();
const port = 3000 ;

// Setup database connection
const dbString = process.env.NODE_ENV === 'production' ?
    process.env.DB_STRING + '/tournament-db?retryWrites=true&w=majority' : 
    'mongodb://localhost/tournament-db';
mongoose.connect(dbString,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Authentication middleware
app.use(async (req, res, next) => {
    const userToken = req.get('Authorization');
    if (userToken) {
        const userDoc = await User.findOne({token: userToken});
        if (userDoc) {
            req.user = userDoc;
            req.userId = userDoc._id;
            req.loggedIn = true;
        } else req.loggedIn = false;
    } else req.loggedIn = false;
    next();
});

// Bind routes
routes(app);

// Error handling
app.use((err, req, res, next) => {
    res.status(400).send('ERROR: ' + err.message);
    console.log('ERROR:' + err.message);
});

app.listen(process.env.PORT || port, () => {
    console.log(`App listening on port ${port}`);
});
