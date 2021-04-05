//import { useReducer } from 'react';

import {
    UPDATE_CATEGORIES,
    UPDATE_PRODUCTS,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART

} from './actions';

const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: " ",
    

}


/* Imports possible actions above.  When the function below executes, we pass the value
of the action.type argument into a switch statement and compare it to our possble actions.
Because we're only testing the one action for now, we only need to check it against the
UPDATE_PRODUCTS action. If its that action type, we return a new object with a cope of the state
argument usding the spread ... operator and the se the products key to a value of a new array 
with the action.prducrts value spread across it.  If its not that action type, we make no change
to state and return it as it */
const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        //if action type value is the value of UPDATE_PRODUCTS, return a new state
        // object with an updated products array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
        //if action type value is the value of UPDATE_CATEGORIES, return new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        //
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        //             
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };

        //
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        
        //
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        
        //
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
                })
            };

        //
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        //
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
                
        //if its none of these actions, do not update at all and keep things the same
        default:
            return state;
    }
};

/*This will be used to help initialize our global state object and then provide us with
the functionality for updating that state by automatically running it through our custom
reducer() function.  Like a more in depth way of using the useState Hook.  The useReducer Hook
is meant specifically for managing a greater level of state. */
// export function useProductReducer(initialState) {
//     return useReducer(reducer, initialState);
// }

export default reducer;