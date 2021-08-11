const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const createLogger = reduxLogger.createLogger;
const logger = createLogger({});
const BUY_ICECREAM = 'BUY_ICECREAM'
const BUY_CAKE = 'BUY_CAKE';

function buyCake() { // ACTION
    return {
        type: BUY_CAKE,
        info: "First redux action"
    }
}

function buyIceCream (){
    return {
        type: BUY_ICECREAM,
        info: 'It will initiate action to purchase icecream'
    }
}

const initialStateCake = { numOfCake: 10 }
const initialStateIceCream = { numOfIceCream: 10 }

const cakeReducer = (state = initialStateCake, action) => {
    switch (action.type){
        case BUY_CAKE: {
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            }
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialStateIceCream, action) =>{
    switch(action.type){
        case BUY_ICECREAM:{
            return{
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));

store.dispatch(buyCake())
store.dispatch(buyIceCream())
