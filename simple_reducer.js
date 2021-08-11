const redux = require('redux');
const createStore = redux.createStore;

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

const initialState = { 
    numOfCake: 10,
    numOfIceCream: 10
};

const reducer = (state = initialState, action) => { // REDUCER
    switch (action.type) {
        case BUY_CAKE: {
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            }
        }
        case BUY_ICECREAM:{
            return{
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }
        }

        default: return state
    }
}

const store = createStore(reducer);
console.log('InitialState', store.getState());
store.subscribe(()=> console.log("Update State", store.getState()))
store.dispatch(buyCake())
store.dispatch(buyIceCream())
