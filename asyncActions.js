const redux = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const InitialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAIL = "FETCH_FAIL";

const fetchUserRequest = () => {
    return {
        type: FETCH_REQUEST,
    }
};

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_SUCCESS,
        payload: users
    }
};

const fetchUserFail = error => {
    return {
        type: FETCH_FAIL,
        payload: error
    }
};

const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state, loading: true
            }
        case FETCH_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ""
            }
        case FETCH_FAIL:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return {
                state
            }
    }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const fetchUserData = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest());
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                const users = res.data.map((user) => user.id);
                dispatch(fetchUserSuccess(users));
            })
            .catch((err) => {
                dispatch(fetchUserFail(err.message));
            })
    }
}

store.subscribe(() => {
    console.log("Initial State: ", store.getState());
})

store.dispatch(fetchUserData());
