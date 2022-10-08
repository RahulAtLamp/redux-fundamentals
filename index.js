const redux = require('redux');

const createStore = redux.legacy_createStore;
const binder = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK";

const initialCakeState = {
    noOfCakes: 10,
};

const initialIcecreamState = {
    noOfIcecreams: 20,
}

const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
};

const restockCake = (qty = 1) => {
    return {
        type: CAKE_RESTOCK,
        payload: qty
    }
};

const orderIcecream = (qty = 1) => {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

const restockIcecream = (qty = 1) => {
    return {
        type: ICECREAM_RESTOCK,
        payload: qty
    }
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return { ...state, noOfCakes: state.noOfCakes - 1 };
        case CAKE_RESTOCK:
            return { ...state, noOfCakes: state.noOfCakes + action.payload };
        default:
            return state
    }
};

const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return { ...state, noOfIcecreams: state.noOfIcecreams - action.payload };
        case ICECREAM_RESTOCK:
            return { ...state, noOfIcecreams: state.noOfIcecreams + action.payload }
        default:
            return state
    }
};

const rootReducer = combineReducers({ cake: cakeReducer, icecream: icecreamReducer });
const store = createStore(rootReducer);

console.log("INITIAL STATE", store.getState());

const unsuscribe = store.subscribe(() => console.log("updated state:", store.getState()));

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(10));


const actions = binder({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch)

actions.orderCake();
actions.restockCake(4);
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(3);

unsuscribe();