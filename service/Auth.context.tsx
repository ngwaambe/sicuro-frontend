import React, {useContext, createContext, Reducer, useReducer, useEffect} from "react"
import {State, User} from "../state";


type Action = (s: State) => State;
// create the context
export const UserContext = createContext({})

// set up initial state which is used in the below `AuthProvider` function
const initialUser = {
  loggedIn: false,
  username:"",
  title:"",
  firstName: "",
  lastName: ""}


export const updateUser = (user: User) => (state:State) =>({
  ...state,
  user
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
export const AuthProvider = ({ children }: any) => {
  let localState = null;
  if (typeof localStorage !== 'undefined' && localStorage.getItem('userInfo')) {
    localState = JSON.parse(localStorage.getItem('userInfo') || '');
  }
  const [state, dispatch] = useReducer(reducer, localState || {user:initialUser});
  if (typeof localStorage !== 'undefined') {
    useEffect(() => {
      //console.log(state)
      localStorage.setItem('userInfo', JSON.stringify(state));
    }, [state]);
  }

  return (<UserContext.Provider  value={[state, dispatch]}>{children}</UserContext.Provider>)
}

