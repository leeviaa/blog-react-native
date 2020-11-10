import React, {useReducer} from 'react';

//function that will create new context provider automaticallly
export default (reducer, actions, initialState) => {
  const Context = React.createContext()

  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === {addBlogPost: (dispatch) => { return () => {} } }
    const boundActions = {};

    //calls every function with dispatch
    for (let key in actions) {
      //key === 'addBlogPost'
      boundActions[key] = actions[key](dispatch)
    }

    return <Context.Provider value={{state, ...boundActions}}>
      {children}
    </Context.Provider>
  }

  return {Context, Provider}
}