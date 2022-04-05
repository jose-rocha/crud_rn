import React, { createContext, useReducer } from 'react';
import users from '../data/users';

const initialState = { users };
const UsersContext = createContext({});

const actions = {
  
  createUser(state, action) {
    const user = action.payload;
    user.id = Math.random();
    return {
      ...state,
      users: [...state.users, user],
    }
  },
  updateUser(state, action) {
    const updated = action.payload;
    return {
      ...state,
      users: state.users.map(usuario => usuario.id === updated.id ? updated : usuario ),
    }
  },
  deleteUser(state, action) {
    const user = action.payload;
      return {
        ...state,
        users: state.users.filter(usuario => usuario.id !== user.id) //excluindo os usuários.
      }
  }
}

export const UsersProvider = props => {
  
  function reducer(state, action) {
    // console.warn(action);
    // return state;
    // if(action.type === 'deleteUser' || action.type === 'createUser') {
      const fn = actions[action.type];
      return fn ? fn(state, action) : state;
    // }


  };


  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UsersContext.Provider>
  );
}
 

export default UsersContext;