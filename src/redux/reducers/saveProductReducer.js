import * as actionTypes from '../actions/actionTypes'
import initalState from './initalState';

export default function saveProductReducer(state=initalState.savedProduct,action){
    switch (action.type) {
        case actionTypes.UPDATE_PRODUCT_SUCCESS :
            return action.payload
            case actionTypes.CREATE_PRODUCT_SUCCESS :
            return action.payload
        default:
            return state;
    }
}