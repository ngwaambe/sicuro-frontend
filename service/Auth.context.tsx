import React, {useContext, createContext, Reducer, useReducer, useEffect} from "react"
import {AppView, Customer, State, User} from "../state";


type Action = (s: State) => State;
// create the context
export const UserContext = createContext({})

// set up initial state which is used in the below `AuthProvider` function
const initialUser = {
  loggedIn: false,
  username:"",
  userId: 0
}


export const updateUser = (user: User) => (state:State) =>({
  ...state,
  user
})

export const updateCustomer = (customer:Customer) => (state:State) =>({
  ...state,
  customer
})


export const clearState = () =>(state:State) =>({})

export const setView = (view: AppView) => (state:State) =>({
  ...state,
  view
})

/**
 * The reducer. If you want to learn more about reducers:
 * https://reactjs.org/docs/hooks-reference.html#usereducer
 */
export const reducer: Reducer<State, Action> = (state: State, action: Action) => action(state);
//export const reducer: React.Reducer<State, Action> = (state, action) => action(state);

// useContext hook - export here to keep code for global auth state
// together in this file, allowing user info to be accessed and updated
// in any functional component using the hook
export const useDispatch: any = () => useContext(UserContext)

// create and export the AuthProvider - this is imported to the _app.js file
// and wrapped around the whole app, providing context to the whole app, and
// is called each time this specific context is accessed (updated or retrieved)
export const AuthProvider = ({ children , loggedIn}) => {
  //console.log("user:"+JSON.stringify(loggedIn)+",  username:"+JSON.stringify(username));
  let localState = null;
  /*if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('state')) {
    localState = JSON.parse(sessionStorage.getItem('state') || '');
  }*/
  const [state, dispatch] = useReducer(reducer, {user: {loggedIn:loggedIn}});
  /**/
  useEffect(() => {
      //console.log(state)
      //sessionStorage.setItem('state', JSON.stringify(state));
      if (!loggedIn) {
        dispatch(clearState())
      }
  }, [loggedIn]);
  /**/

  return (<UserContext.Provider  value={[state, dispatch]}>{children}</UserContext.Provider>)
}

