import React, {useContext, createContext, Reducer, useReducer, useEffect} from "react"
import {AppView, Customer, State, User} from "../state";
import {Notification} from "../state";

type Action = (s: State) => State;
// create the context
export const UserContext = createContext({})

export const updateUser = (user: User) => (state: State) => {
  if (user !== null && user !== undefined) {
    console.log(JSON.stringify(user))
    sessionStorage.setItem("auth", JSON.stringify(user))
  }
  return ({
    ...state,
    user
  })
}

export const updateCustomer = (customer: Customer) => (state: State) => ({
  ...state,
  customer
})

export const CloseNotification = (state: State) =>
  ({...state, notification: undefined});


export const Notify = (notification: Notification) => (state: State) =>
  ({...state, notification});

export const clearState = () => (state: State) => {
  sessionStorage.removeItem("auth")
  return({})
}

export const setView = (view: AppView) => (state: State) => ({
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
export const AuthProvider = ({children, user}) => {
  const [state, dispatch] = useReducer(reducer, {user:user});
  useEffect(() => {
    const authState = sessionStorage.getItem("auth")
    if (authState !== null && authState !== undefined) {
      const storedData = JSON.parse(authState)
      if (storedData !== null) {
        dispatch(updateUser(storedData))
      }
    }

  }, [user]);
  return (<UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>)
}

