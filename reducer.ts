import { useContext, createContext, Reducer } from 'react';
import {
  Notification,
  State,
  User,
} from './state';

export const Notify = (notification: Notification) => (state: State) =>
  ({...state, notification});

export const CloseNotification = (state: State) =>
  ({...state, notification: undefined});

export const UpdateUser = (props: User) => (state: State) =>
  ({...state, user: {...state.user, ...props}});


/**
 * An action is a function which takes the global state and returns a new one.
 * It's important to stay immutable here (copy modifed objects).
 *
 * ```
 * const MyAction = (state) => {...state}
 * ```
 *
 * If you want to pass more parameters, use curring:
 *
 * ```
 * const MyAction = (x) => (state) => {...state}
 *
 * // And partially apply in the component
 * dispatch(MyAction(123))
 * ```
 */
type Action = (s: State) => State;

/**
 * Global reducer context. Used to share the dispatch function over all
 * nested components to avoid passing it explicitly via params.
 *
 * ```
 * <ReducerContext.Provider value={dispatch}>
 *   <MyComponent> // Available in here
 * </ReducerContext.Provider>
 * ```
 */
export const ReducerContext = createContext<any>(null);

/**
 * To make changes in global state, simply import the dispatcher in your
 * component and execute the dispatch with an action which handles your use
 * case.
 *
 * ```
 * const dispatch = useDispatch()
 * <button onClick={() => dispatch(MyAction)}>
 * ```
 */
export const useDispatch = () => useContext(ReducerContext);

/**
 * The reducer. If you want to learn more about reducers:
 * https://reactjs.org/docs/hooks-reference.html#usereducer
 */
export const reducer: Reducer<State, Action> =
  (state: State, action: Action) => action(state);
