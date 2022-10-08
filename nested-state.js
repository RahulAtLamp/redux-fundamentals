const redux = require("redux");
const produce = require("immer").produce;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.legacy_createStore;
const binder = redux.bindActionCreators;

const InitialState = {
    name: "Rahul Rajan",
    address: {
        street: 1,
        city: "Surat",
        state: "Gujarat",
        country: "India"
    }
};

const UPDATED_STREET = "UPDATED_STREET";
const UPDATED_CITY = "UPDATED_CITY";
const UPDATED_STATE = "UPDATED_STATE";

const changeStreet = (street) => {
    return {
        type: UPDATED_STREET,
        payload: street
    }
};

const changeCity = (city) => {
    return {
        type: UPDATED_CITY,
        payload: city
    }
};

const changeState = (state) => {
    return {
        type: UPDATED_STATE,
        payload: state
    }
};

const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case UPDATED_STREET:
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        case UPDATED_CITY:
            return produce(state, (draft) => {
                draft.address.city = action.payload
            })
        case UPDATED_STATE:
            return produce(state, (draft) => {
                draft.address.state = action.payload
            })
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(logger));

console.log("Initial State : ", store.getState());

const unsubscribe = store.subscribe(() => console.log("Updated State : ", store.getState()));

const actions = binder({ changeStreet, changeCity, changeState }, store.dispatch);

actions.changeStreet(2);
actions.changeCity("Thrissur");
actions.changeState("Kerala");

unsubscribe();