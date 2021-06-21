import store from './store';
import router from './router';

const apiUrl = process.env.NODE_ENV === 'production' ?
    'https://mdd4mevn-tournament.herokuapp.com' :
    'http://localhost:3000';
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': '',
};
export const setAuthToken = (userToken) => {
    defaultHeaders.Authorization = userToken;
}

export const getServerStatus = (callback) => {
    fetch(apiUrl).then(response => response.text()).then(() => {
        callback('online');
    }).catch(() => {
        callback('offline');
    });
}

export const getTournaments = (callback) => {
    fetch(apiUrl + '/tournament', {headers: defaultHeaders}).then(response => response.json()).then((data) => {
        callback(data);
    });
};

export const postTournament = (data) => {
    fetch(apiUrl + '/tournament', {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
        store.commit('tournamentChanged');
        store.commit('showSnackbar', 'Successfully added tournament');
    });
};

export const getTournament = (callback) => {
    fetch(apiUrl + '/tournament/:id', {headers: defaultHeaders}).then(response => response.json()).then((data) => {
        callback(data);
    });
};

export const deleteTournament = (id) => {
    fetch(apiUrl + '/tournament/' + id, {
        method: 'DELETE',
        headers: defaultHeaders,
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
        store.commit('tournamentChanged');
    });
};

export const putTournament = (data) => {
    fetch(apiUrl + '/tournament/' + data._id, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            store.commit('tournamentChanged');
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
    }).catch((err) => {
        store.commit('showSnackbar', err);
    });
};

export const addParticipant = (id, data) => {
    fetch(apiUrl + '/add-participant/' + id, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            store.commit('tournamentChanged');
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
    }).catch((err) => {
        store.commit('showSnackbar', err);
    });
};

export const getUsers = (callback) => {
    fetch(apiUrl + '/user', {headers: defaultHeaders}).then(response => response.json()).then((data) => {
        callback(data);
    });
};

export const postUser = (data) => {
    fetch(apiUrl + '/user', {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
        store.commit('userChanged');
        store.commit('showSnackbar', 'Successfully added user');
    });
};

export const getUser = (callback) => {
    fetch(apiUrl + '/user/:id', {headers: defaultHeaders}).then(response => response.json()).then((data) => {
        callback(data);
    });
};

export const deleteUser = (id) => {
    fetch(apiUrl + '/user/' + id, {
        method: 'DELETE',
        headers: defaultHeaders,
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
        store.commit('userChanged');
    });
};

export const putUser = (data) => {
    fetch(apiUrl + '/user/' + data._id, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            store.commit('userChanged');
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
    }).catch((err) => {
        store.commit('showSnackbar', err);
    });
};

export const login = (data) => {
    fetch(apiUrl + '/login', {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            store.commit('userChanged');
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
        store.commit('saveUserToken', data.token);
        store.commit('showSnackbar', 'Welcome Back');
        router.push({path: '/'});
        getCurrentUser();
    }).catch((err) => {
        store.commit('showSnackbar', err);
    });
};

export const register = (data) => {
    fetch(apiUrl + '/register', {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
        store.commit('userChanged');
        store.commit('saveUserToken', data.token);
        store.commit('showSnackbar', 'Welcome');
        router.push({path: '/'});
        getCurrentUser();
    });
};

export const getCurrentUser = () => {
    fetch(apiUrl + '/current-user', {headers: defaultHeaders}).then(response => {
        if (response.status !== 200) {
            response.text().then(text => {
                store.commit('showSnackbar', text);
            });
        } else {
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else return response.text();
        }
    }).then((data) => {
        if (data === 'Invalid user') store.commit('saveUserToken', '');
        else store.commit('saveUser', data);
    });
};
