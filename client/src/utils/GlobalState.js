//create context is used to instantiate a new context object.  Using it to create the 
//containter to hold out global state data and functionality so we can provide it throughout our app.

//useContext is a React Hook that allows us to use the state creatred from the createContext function
import React, { createContext, useContext } from 'react';

import { useProductReducer } from './reducers';

//when we run the createContext() function, it create a new Context object
const StoreContext = createContext();
const { Provider } = StoreContext;

//StoreProvider instantiates our initial global state with the useProductReducer() function
//Because that wraps it around the useReducer() hook from React, every time we run this
//useProductReducer() function, we receive the two items in return:
// state: is the most up-to-date version of our global state object
// dispatch: is the method we execute to update our state.  It is looking for an action
//           object passsed in  as its argument
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });
    //use this to confirm it works
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />
}

//custom react hook
//we will receive the [state, dispatch] data that StoreProvider provider manages for us
//Any component that has access to our StoreProvider component can use any data in our
//global state container or update it using the dispatch function.  
const useStoreContext = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };