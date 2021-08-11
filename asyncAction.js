
const redux = require('redux');
const thunkMiddleWare = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddle = redux.applyMiddleware;

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';



// ACTIONS
const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUserFailed = error => {
    return {
        type: FETCH_USERS_FAILED,
        error: error
    }
}

// REDUCER

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_USERS_REQUEST:{
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_USERS_SUCCESS: {
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        }
        case FETCH_USERS_FAILED: {
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        }
    }
}

const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUserRequest())
        const url = 'https://jsonplaceholder.typicode.com/users';
        axios.get(url)
            .then(response=>{
                const users = response.data.map(user=>user.id);
                dispatch(fetchUserSuccess(users));
            })
            .catch(error=>{
                dispatch(fetchUserFailed(error.message));
            })
    }
}


const store = createStore(reducer, applyMiddle(thunkMiddleWare));
store.subscribe(() => console.log('Updated State', store.getState()));
store.dispatch(fetchUsers())
store.dispatch(fetchUsers())